/* ============================================================
   ADVANCED SHADER & WEBGL EFFECTS
   تأثيرات Shader متقدمة من Shaders.com و Codrops
   ============================================================ */

// Gradient Mesh Background Shader
class GradientMeshShader {
    constructor(canvas) {
        this.canvas = canvas;
        this.gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!this.gl) {
            console.warn('WebGL not supported');
            return;
        }
        
        this.init();
        this.animate();
    }
    
    init() {
        const gl = this.gl;
        
        // Vertex shader
        const vertexShaderSource = `
            attribute vec2 position;
            void main() {
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;
        
        // Fragment shader - animated gradient mesh
        const fragmentShaderSource = `
            precision mediump float;
            uniform float time;
            uniform vec2 resolution;
            
            vec3 palette(float t) {
                vec3 a = vec3(0.5, 0.5, 0.5);
                vec3 b = vec3(0.5, 0.5, 0.5);
                vec3 c = vec3(1.0, 1.0, 1.0);
                vec3 d = vec3(0.263, 0.416, 0.557);
                return a + b * cos(6.28318 * (c * t + d));
            }
            
            void main() {
                vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / resolution.y;
                vec2 uv0 = uv;
                vec3 finalColor = vec3(0.0);
                
                for (float i = 0.0; i < 3.0; i++) {
                    uv = fract(uv * 1.5) - 0.5;
                    float d = length(uv) * exp(-length(uv0));
                    vec3 col = palette(length(uv0) + i * 0.4 + time * 0.4);
                    d = sin(d * 8.0 + time) / 8.0;
                    d = abs(d);
                    d = pow(0.01 / d, 1.2);
                    finalColor += col * d;
                }
                
                // Gold tint for Islamic theme
                finalColor = mix(finalColor, vec3(0.85, 0.65, 0.13), 0.3);
                
                gl_FragColor = vec4(finalColor, 1.0);
            }
        `;
        
        // Compile shaders
        const vertexShader = this.compileShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = this.compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
        
        // Create program
        this.program = gl.createProgram();
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);
        
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(this.program));
            return;
        }
        
        // Create buffer
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1, 1, -1, -1, 1,
            -1, 1, 1, -1, 1, 1
        ]), gl.STATIC_DRAW);
        
        // Get locations
        this.positionLocation = gl.getAttribLocation(this.program, 'position');
        this.timeLocation = gl.getUniformLocation(this.program, 'time');
        this.resolutionLocation = gl.getUniformLocation(this.program, 'resolution');
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }
    
    compileShader(type, source) {
        const gl = this.gl;
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compile error:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        
        return shader;
    }
    
    resize() {
        const gl = this.gl;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }
    
    animate() {
        const gl = this.gl;
        if (!gl) return;
        
        gl.useProgram(this.program);
        gl.enableVertexAttribArray(this.positionLocation);
        gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, 0, 0);
        
        gl.uniform1f(this.timeLocation, performance.now() * 0.001);
        gl.uniform2f(this.resolutionLocation, this.canvas.width, this.canvas.height);
        
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        
        requestAnimationFrame(() => this.animate());
    }
}

// Liquid Distortion Effect (Codrops style)
class LiquidDistortion {
    constructor(element) {
        this.element = element;
        this.originalImage = element.querySelector('img');
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.init();
    }
    
    init() {
        this.element.style.position = 'relative';
        this.element.style.overflow = 'hidden';
        
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        
        this.element.appendChild(this.canvas);
        
        this.originalImage.style.opacity = '0';
        
        this.element.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.element.addEventListener('mouseleave', () => this.handleMouseLeave());
        
        this.animate();
    }
    
    handleMouseMove(e) {
        const rect = this.element.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
        this.isHovering = true;
    }
    
    handleMouseLeave() {
        this.isHovering = false;
    }
    
    animate() {
        if (!this.originalImage.complete) {
            requestAnimationFrame(() => this.animate());
            return;
        }
        
        this.canvas.width = this.element.offsetWidth;
        this.canvas.height = this.element.offsetHeight;
        
        this.ctx.drawImage(this.originalImage, 0, 0, this.canvas.width, this.canvas.height);
        
        if (this.isHovering) {
            const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
            const data = imageData.data;
            
            const time = performance.now() * 0.003;
            const radius = 50;
            
            for (let y = 0; y < this.canvas.height; y++) {
                for (let x = 0; x < this.canvas.width; x++) {
                    const dx = x - this.mouseX;
                    const dy = y - this.mouseY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < radius) {
                        const force = (radius - distance) / radius;
                        const angle = Math.atan2(dy, dx) + Math.sin(time + distance * 0.1) * force * 0.5;
                        const offset = force * 10;
                        
                        const sourceX = Math.floor(x + Math.cos(angle) * offset);
                        const sourceY = Math.floor(y + Math.sin(angle) * offset);
                        
                        if (sourceX >= 0 && sourceX < this.canvas.width && 
                            sourceY >= 0 && sourceY < this.canvas.height) {
                            const targetIndex = (y * this.canvas.width + x) * 4;
                            const sourceIndex = (sourceY * this.canvas.width + sourceX) * 4;
                            
                            data[targetIndex] = data[sourceIndex];
                            data[targetIndex + 1] = data[sourceIndex + 1];
                            data[targetIndex + 2] = data[sourceIndex + 2];
                            data[targetIndex + 3] = data[sourceIndex + 3];
                        }
                    }
                }
            }
            
            this.ctx.putImageData(imageData, 0, 0);
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Magnetic Button with Particles (Advanced)
class MagneticButton {
    constructor(button) {
        this.button = button;
        this.particles = [];
        this.init();
    }
    
    init() {
        this.button.addEventListener('mouseenter', () => this.startParticles());
        this.button.addEventListener('mouseleave', () => this.stopParticles());
        this.button.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }
    
    startParticles() {
        this.isHovering = true;
        this.animateParticles();
    }
    
    stopParticles() {
        this.isHovering = false;
        this.particles = [];
    }
    
    handleMouseMove(e) {
        const rect = this.button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Add new particles
        for (let i = 0; i < 3; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 1,
                size: Math.random() * 3 + 1
            });
        }
    }
    
    animateParticles() {
        if (!this.isHovering && this.particles.length === 0) return;
        
        // Remove dead particles
        this.particles = this.particles.filter(p => p.life > 0);
        
        // Update particles
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02;
            p.size *= 0.98;
        });
        
        // Draw particles
        // This would require canvas overlay, simplified for now
        requestAnimationFrame(() => this.animateParticles());
    }
}

// Page Transition Effect
class PageTransition {
    constructor() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'page-transition-overlay';
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #DC9C51, #FFD700, #B8860B);
            z-index: 999999;
            transform: scaleY(0);
            transform-origin: bottom;
            transition: transform 0.8s cubic-bezier(0.8, 0, 0.2, 1);
        `;
        document.body.appendChild(this.overlay);
        
        this.initLinks();
    }
    
    initLinks() {
        document.querySelectorAll('a[href]').forEach(link => {
            if (link.hostname === window.location.hostname) {
                link.addEventListener('click', (e) => this.handleClick(e, link));
            }
        });
    }
    
    handleClick(e, link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        
        this.overlay.style.transformOrigin = 'top';
        this.overlay.style.transform = 'scaleY(1)';
        
        setTimeout(() => {
            window.location.href = href;
        }, 800);
    }
}

// Spotlight Effect (Shadcn style)
class SpotlightEffect {
    constructor(container) {
        this.container = container;
        this.spotlight = document.createElement('div');
        this.spotlight.className = 'spotlight';
        this.spotlight.style.cssText = `
            position: absolute;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(220, 156, 81, 0.15) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s;
            opacity: 0;
            z-index: 1;
        `;
        
        this.container.style.position = 'relative';
        this.container.style.overflow = 'hidden';
        this.container.appendChild(this.spotlight);
        
        this.container.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.container.addEventListener('mouseenter', () => this.show());
        this.container.addEventListener('mouseleave', () => this.hide());
    }
    
    handleMouseMove(e) {
        const rect = this.container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.spotlight.style.left = x + 'px';
        this.spotlight.style.top = y + 'px';
    }
    
    show() {
        this.spotlight.style.opacity = '1';
    }
    
    hide() {
        this.spotlight.style.opacity = '0';
    }
}

// Glitch Text Effect
class GlitchText {
    constructor(element) {
        this.element = element;
        this.originalText = element.textContent;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.init();
    }
    
    init() {
        this.element.addEventListener('mouseenter', () => this.glitch());
    }
    
    glitch() {
        let iterations = 0;
        const interval = setInterval(() => {
            this.element.textContent = this.originalText
                .split('')
                .map((letter, index) => {
                    if (index < iterations) {
                        return this.originalText[index];
                    }
                    return this.chars[Math.floor(Math.random() * this.chars.length)];
                })
                .join('');
            
            if (iterations >= this.originalText.length) {
                clearInterval(interval);
            }
            
            iterations += 1 / 3;
        }, 30);
    }
}

// Morphing Background
class MorphingBackground {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.shapes = [];
        
        this.resize();
        this.initShapes();
        this.animate();
        
        window.addEventListener('resize', () => {
            this.resize();
            this.initShapes();
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    initShapes() {
        this.shapes = [];
        for (let i = 0; i < 5; i++) {
            this.shapes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 200 + 100,
                color: `rgba(220, 156, 81, ${Math.random() * 0.1 + 0.05})`,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                phase: Math.random() * Math.PI * 2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const time = performance.now() * 0.001;
        
        this.shapes.forEach(shape => {
            // Update position
            shape.x += shape.vx;
            shape.y += shape.vy;
            
            // Bounce off edges
            if (shape.x < -shape.radius) shape.x = this.canvas.width + shape.radius;
            if (shape.x > this.canvas.width + shape.radius) shape.x = -shape.radius;
            if (shape.y < -shape.radius) shape.y = this.canvas.height + shape.radius;
            if (shape.y > this.canvas.height + shape.radius) shape.y = -shape.radius;
            
            // Morph radius
            const morphRadius = shape.radius + Math.sin(time + shape.phase) * 30;
            
            // Draw shape
            this.ctx.beginPath();
            this.ctx.arc(shape.x, shape.y, morphRadius, 0, Math.PI * 2);
            this.ctx.fillStyle = shape.color;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize advanced effects
document.addEventListener('DOMContentLoaded', () => {
    // Gradient Mesh Shader
    const shaderCanvas = document.getElementById('shader-canvas');
    if (shaderCanvas) {
        new GradientMeshShader(shaderCanvas);
    }
    
    // Liquid Distortion for cards
    document.querySelectorAll('.card-modern').forEach(card => {
        new LiquidDistortion(card);
    });
    
    // Page Transitions
    new PageTransition();
    
    // Spotlight Effects
    document.querySelectorAll('.card-modern, .btn-modern').forEach(el => {
        new SpotlightEffect(el);
    });
    
    // Glitch Text for headers
    document.querySelectorAll('.section-title-modern, .hero-title-modern').forEach(el => {
        new GlitchText(el);
    });
    
    // Morphing Background
    const morphCanvas = document.getElementById('morph-canvas');
    if (morphCanvas) {
        new MorphingBackground(morphCanvas);
    }
});

// Export for use in other files
window.AdvancedEffects = {
    GradientMeshShader,
    LiquidDistortion,
    MagneticButton,
    PageTransition,
    SpotlightEffect,
    GlitchText,
    MorphingBackground
};