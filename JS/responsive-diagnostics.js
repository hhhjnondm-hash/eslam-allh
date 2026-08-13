/**
 * RESPONSIVE LAYOUT DIAGNOSTICS
 * Development-only tool for identifying layout problems
 * 
 * This script should ONLY be included in development builds
 * It helps identify:
 * - Horizontal overflow
 * - Components wider than parent
 * - Fixed width larger than container
 * - Flex child refusing to shrink
 * - Grid column overflow
 * - Transformed element outside bounds
 */

(function() {
  'use strict';
  
  // Only run in development mode
  if (window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1' ||
      window.location.search.includes('debug=true')) {
    
    class ResponsiveDiagnostics {
      constructor() {
        this.issues = [];
        this.isEnabled = false;
        this.observers = [];
        this.init();
      }
      
      init() {
        // Check for URL parameter to enable diagnostics
        const urlParams = new URLSearchParams(window.location.search);
        this.isEnabled = urlParams.has('diagnostics') || urlParams.has('debug');
        
        if (this.isEnabled) {
          this.enableDiagnostics();
        }
        
        // Listen for keyboard shortcut to toggle diagnostics (Ctrl+Shift+D)
        document.addEventListener('keydown', (e) => {
          if (e.ctrlKey && e.shiftKey && e.key === 'D') {
            this.toggleDiagnostics();
          }
        });
      }
      
      enableDiagnostics() {
        this.isEnabled = true;
        this.setupResizeObserver();
        this.setupMutationObserver();
        this.checkForOverflow();
        this.createDiagnosticUI();
        console.log('🔍 Responsive Diagnostics Enabled');
        console.log('Press Ctrl+Shift+D to toggle diagnostics');
      }
      
      disableDiagnostics() {
        this.isEnabled = false;
        this.removeDiagnosticUI();
        this.disconnectObservers();
        console.log('🔍 Responsive Diagnostics Disabled');
      }
      
      toggleDiagnostics() {
        if (this.isEnabled) {
          this.disableDiagnostics();
        } else {
          this.enableDiagnostics();
        }
      }
      
      setupResizeObserver() {
        this.resizeObserver = new ResizeObserver((entries) => {
          if (this.isEnabled) {
            entries.forEach(entry => {
              this.checkElementOverflow(entry.target);
            });
          }
        });
        
        // Observe major containers
        const containers = document.querySelectorAll('.container, .header, .nav-list, .main-section, .card, .grid');
        containers.forEach(container => {
          this.resizeObserver.observe(container);
        });
      }
      
      setupMutationObserver() {
        this.mutationObserver = new MutationObserver((mutations) => {
          if (this.isEnabled) {
            mutations.forEach(mutation => {
              if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                  if (node.nodeType === Node.ELEMENT_NODE) {
                    this.checkElementOverflow(node);
                  }
                });
              }
            });
          }
        });
        
        this.mutationObserver.observe(document.body, {
          childList: true,
          subtree: true
        });
      }
      
      disconnectObservers() {
        if (this.resizeObserver) {
          this.resizeObserver.disconnect();
        }
        if (this.mutationObserver) {
          this.mutationObserver.disconnect();
        }
      }
      
      checkForOverflow() {
        // Check document-level overflow
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        
        if (docWidth > winWidth) {
          this.addIssue({
            type: 'document-overflow',
            severity: 'high',
            element: 'document',
            container: 'viewport',
            required: docWidth,
            available: winWidth,
            overflow: docWidth - winWidth,
            likelyCause: 'Document wider than viewport'
          });
          
          // Find the widest element
          this.findWidestElement();
        }
        
        // Check all major elements
        const elements = document.querySelectorAll('.header, .nav-list, .nav-list li, .nav-list a, .main-section, .card, .container, .prayer-widget-bar');
        elements.forEach(el => this.checkElementOverflow(el));
      }
      
      checkElementOverflow(element) {
        if (!element || !element.offsetWidth) return;
        
        const parent = element.parentElement;
        if (!parent) return;
        
        const elementWidth = element.offsetWidth;
        const parentWidth = parent.offsetWidth;
        
        if (elementWidth > parentWidth) {
          const computedStyle = window.getComputedStyle(element);
          
          this.addIssue({
            type: 'element-overflow',
            severity: 'medium',
            element: element.tagName.toLowerCase() + (element.className ? '.' + element.className.split(' ')[0] : ''),
            container: parent.tagName.toLowerCase() + (parent.className ? '.' + parent.className.split(' ')[0] : ''),
            required: elementWidth,
            available: parentWidth,
            overflow: elementWidth - parentWidth,
            likelyCause: this.identifyOverflowCause(element, computedStyle),
            cssWidth: computedStyle.width,
            cssMaxWidth: computedStyle.maxWidth,
            cssMinWidth: computedStyle.minWidth,
            cssFlexShrink: computedStyle.flexShrink,
            cssTransform: computedStyle.transform
          });
        }
        
        // Check for fixed/minimum width issues
        const computedStyle = window.getComputedStyle(element);
        const minWidth = parseFloat(computedStyle.minWidth);
        const width = parseFloat(computedStyle.width);
        
        if (minWidth > parentWidth) {
          this.addIssue({
            type: 'min-width-overflow',
            severity: 'high',
            element: element.tagName.toLowerCase() + (element.className ? '.' + element.className.split(' ')[0] : ''),
            container: parent.tagName.toLowerCase() + (parent.className ? '.' + parent.className.split(' ')[0] : ''),
            required: minWidth,
            available: parentWidth,
            overflow: minWidth - parentWidth,
            likelyCause: 'min-width larger than container',
            cssMinWidth: computedStyle.minWidth
          });
        }
        
        // Check for transformed elements outside bounds
        const transform = computedStyle.transform;
        if (transform && transform !== 'none') {
          const rect = element.getBoundingClientRect();
          const parentRect = parent.getBoundingClientRect();
          
          if (rect.right > parentRect.right || rect.left < parentRect.left) {
            this.addIssue({
              type: 'transform-overflow',
              severity: 'medium',
              element: element.tagName.toLowerCase() + (element.className ? '.' + element.className.split(' ')[0] : ''),
              container: parent.tagName.toLowerCase() + (parent.className ? '.' + parent.className.split(' ')[0] : ''),
              required: `${rect.width}px (transformed)`,
              available: parentWidth,
              overflow: Math.max(0, rect.right - parentRect.right, parentRect.left - rect.left),
              likelyCause: 'Transform positions element outside container',
              cssTransform: transform
            });
          }
        }
      }
      
      identifyOverflowCause(element, computedStyle) {
        const causes = [];
        
        if (computedStyle.width.includes('px') && !computedStyle.width.includes('%')) {
          causes.push('Fixed pixel width');
        }
        
        if (parseFloat(computedStyle.minWidth) > 0) {
          causes.push('Minimum width constraint');
        }
        
        if (computedStyle.flexShrink === '0') {
          causes.push('Flex shrink disabled');
        }
        
        if (computedStyle.whiteSpace === 'nowrap') {
          causes.push('Text not wrapping');
        }
        
        if (computedStyle.transform !== 'none') {
          causes.push('Transform applied');
        }
        
        if (computedStyle.position === 'absolute' || computedStyle.position === 'fixed') {
          causes.push('Positioned element');
        }
        
        return causes.length > 0 ? causes.join(', ') : 'Unknown';
      }
      
      findWidestElement() {
        let widest = null;
        let maxWidth = 0;
        
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
          const width = el.offsetWidth;
          if (width > maxWidth) {
            maxWidth = width;
            widest = el;
          }
        });
        
        if (widest && maxWidth > window.innerWidth) {
          this.addIssue({
            type: 'widest-element',
            severity: 'high',
            element: widest.tagName.toLowerCase() + (widest.className ? '.' + widest.className.split(' ')[0] : ''),
            container: 'viewport',
            required: maxWidth,
            available: window.innerWidth,
            overflow: maxWidth - window.innerWidth,
            likelyCause: 'Widest element causing document overflow'
          });
        }
      }
      
      addIssue(issue) {
        // Avoid duplicate issues
        const exists = this.issues.some(i => 
          i.type === issue.type && 
          i.element === issue.element && 
          i.container === issue.container
        );
        
        if (!exists) {
          this.issues.push(issue);
          this.logIssue(issue);
        }
      }
      
      logIssue(issue) {
        const severityIcon = {
          high: '🔴',
          medium: '🟡',
          low: '🟢'
        }[issue.severity] || '⚪';
        
        console.log(`${severityIcon} [${issue.type.toUpperCase()}] ${issue.element} in ${issue.container}`);
        console.log(`   Required: ${issue.required}px, Available: ${issue.available}px`);
        console.log(`   Overflow: ${issue.overflow}px`);
        console.log(`   Cause: ${issue.likelyCause}`);
      }
      
      createDiagnosticUI() {
        // Create diagnostic panel
        const panel = document.createElement('div');
        panel.id = 'responsive-diagnostics-panel';
        panel.style.cssText = `
          position: fixed;
          top: 10px;
          left: 10px;
          width: 300px;
          max-height: 80vh;
          background: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 15px;
          border-radius: 8px;
          z-index: 999999;
          font-family: monospace;
          font-size: 12px;
          overflow-y: auto;
          display: none;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        `;
        
        panel.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <strong>🔍 Responsive Diagnostics</strong>
            <button onclick="this.parentElement.parentElement.remove()" style="background: #ff4444; color: white; border: none; padding: 2px 8px; cursor: pointer;">×</button>
          </div>
          <div id="diagnostics-issues"></div>
          <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #444;">
            <small>Viewport: ${window.innerWidth}x${window.innerHeight}</small><br>
            <small>Document: ${document.documentElement.scrollWidth}x${document.documentElement.scrollHeight}</small>
          </div>
        `;
        
        document.body.appendChild(panel);
        panel.style.display = 'block';
        
        this.updateDiagnosticUI();
      }
      
      updateDiagnosticUI() {
        const panel = document.getElementById('responsive-diagnostics-panel');
        if (!panel) return;
        
        const issuesContainer = document.getElementById('diagnostics-issues');
        if (!issuesContainer) return;
        
        if (this.issues.length === 0) {
          issuesContainer.innerHTML = '<div style="color: #4ade80;">✅ No layout issues detected</div>';
          return;
        }
        
        const severityOrder = ['high', 'medium', 'low'];
        const sortedIssues = [...this.issues].sort((a, b) => 
          severityOrder.indexOf(a.severity) - severityOrder.indexOf(b.severity)
        );
        
        issuesContainer.innerHTML = sortedIssues.map(issue => {
          const severityIcon = {
            high: '🔴',
            medium: '🟡',
            low: '🟢'
          }[issue.severity] || '⚪';
          
          return `
            <div style="margin-bottom: 10px; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 4px;">
              <div>${severityIcon} <strong>${issue.type}</strong></div>
              <div style="color: #aaa; font-size: 11px;">
                ${issue.element} in ${issue.container}
              </div>
              <div style="margin-top: 4px;">
                <span style="color: #ff6b6b;">Required: ${issue.required}px</span> | 
                <span style="color: #4ade80;">Available: ${issue.available}px</span> |
                <span style="color: #ffd93d;">Overflow: ${issue.overflow}px</span>
              </div>
              <div style="margin-top: 4px; color: #ffd93d;">
                Cause: ${issue.likelyCause}
              </div>
            </div>
          `;
        }).join('');
      }
      
      removeDiagnosticUI() {
        const panel = document.getElementById('responsive-diagnostics-panel');
        if (panel) {
          panel.remove();
        }
      }
      
      getReport() {
        return {
          timestamp: new Date().toISOString(),
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight
          },
          document: {
            width: document.documentElement.scrollWidth,
            height: document.documentElement.scrollHeight
          },
          issues: this.issues,
          summary: {
            total: this.issues.length,
            high: this.issues.filter(i => i.severity === 'high').length,
            medium: this.issues.filter(i => i.severity === 'medium').length,
            low: this.issues.filter(i => i.severity === 'low').length
          }
        };
      }
      
      printReport() {
        const report = this.getReport();
        console.log('📊 Responsive Diagnostics Report');
        console.log('================================');
        console.log(JSON.stringify(report, null, 2));
      }
    }
    
    // Initialize diagnostics
    window.ResponsiveDiagnostics = new ResponsiveDiagnostics();
    
    // Expose for manual debugging
    window.checkResponsive = () => window.ResponsiveDiagnostics.checkForOverflow();
    window.getResponsiveReport = () => window.ResponsiveDiagnostics.getReport();
    window.printResponsiveReport = () => window.ResponsiveDiagnostics.printReport();
    
    console.log('🔍 Responsive Diagnostics loaded');
    console.log('Add ?diagnostics=true to URL to enable');
    console.log('Or press Ctrl+Shift+D to toggle');
  }
})();
