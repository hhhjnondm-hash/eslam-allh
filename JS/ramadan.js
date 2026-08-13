// Beautiful Ramadan Lanterns - Fanous Enhanced
document.addEventListener("DOMContentLoaded", function () {
  createRamadanDecorations();
});

function createRamadanDecorations() {
  const container = document.createElement("div");
  container.id = "ramadan-celebration";

  // Add CSS styles
  const style = document.createElement("style");
  style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');

        .fanous-wire {
            position: fixed;
            top: 0;
            width: 1.5px;
            background: rgba(156, 114, 8, 0.5);
            z-index: 10000;
            pointer-events: none;
            animation: fanousSwing 4.5s ease-in-out infinite;
        }
        .fanous-wire-1 { left: 7%; animation-delay: 0s; }
        .fanous-wire-2 { left: 19%; animation-delay: 0.7s; }
        .fanous-wire-3 { left: 31%; animation-delay: 1.4s; }
        .fanous-wire-4 { right: 31%; animation-delay: 2.1s; }
        .fanous-wire-5 { right: 19%; animation-delay: 1s; }
        .fanous-wire-6 { right: 7%; animation-delay: 1.7s; }

        .fanous {
            position: fixed;
            z-index: 10000;
            pointer-events: none;
            animation: fanousSwing 4.5s ease-in-out infinite;
        }
        .fanous-1 { left: 5.5%; animation-delay: 0s; }
        .fanous-2 { left: 17.5%; animation-delay: 0.7s; }
        .fanous-3 { left: 29.5%; animation-delay: 1.4s; }
        .fanous-4 { right: 29.5%; animation-delay: 2.1s; }
        .fanous-5 { right: 17.5%; animation-delay: 1s; }
        .fanous-6 { right: 5.5%; animation-delay: 1.7s; }

        @keyframes fanousSwing {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(15px); }
        }

        .fanous-body { width: 48px; position: relative; filter: drop-shadow(0 8px 20px rgba(255, 183, 0, 0.5)); }

        .fanous-cap {
            width: 16px;
            height: 8px;
            background: linear-gradient(180deg, #E6C200 0%, #C9A227 50%, #9B7B1A 100%);
            margin: 0 auto;
            border-radius: 4px 4px 0 0;
            position: relative;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .fanous-cap::after {
            content: '';
            position: absolute;
            bottom: -3px;
            left: 50%;
            transform: translateX(-50%);
            width: 10px;
            height: 3px;
            background: linear-gradient(180deg, #FFE066 0%, #E6C200 100%);
            border-radius: 2px;
        }

        .fanous-dome {
            width: 44px;
            height: 50px;
            background: linear-gradient(180deg, #C9A227 0%, #9B7B1A 100%);
            border-radius: 50% 50% 12px 12px;
            margin: 0 auto;
            position: relative;
            overflow: hidden;
            box-shadow: inset 0 -10px 20px rgba(0,0,0,0.3), inset 0 5px 15px rgba(255,255,255,0.1);
        }

        .fanous-glow {
            position: absolute;
            top: 6px;
            left: 50%;
            transform: translateX(-50%);
            width: 36px;
            height: 38px;
            background: linear-gradient(180deg, #FFF8E1 0%, #FFE082 30%, #FFD54F 60%, #FFB300 100%);
            border-radius: 8px;
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 183, 0, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.5);
            animation: glowPulse 0.2s ease-in-out infinite alternate;
        }
        @keyframes glowPulse { 0% { opacity: 0.92; } 100% { opacity: 1; } }

        .fanous-windows {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 30px;
            height: 34px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 2;
        }

        .fanous-window {
            width: 6px;
            height: 28px;
            background: linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.9) 100%);
            border-radius: 3px;
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.9), 0 0 20px rgba(255, 183, 0, 0.6), inset 0 0 8px rgba(255, 255, 255, 0.8);
        }

        .fanous-ring {
            width: 32px;
            height: 7px;
            background: linear-gradient(180deg, #E6C200 0%, #C9A227 50%, #9B7B1A 100%);
            margin: 0 auto;
            position: relative;
            border-radius: 2px;
            box-shadow: 0 0 15px rgba(255, 183, 0, 0.4);
        }
        .fanous-ring::before, .fanous-ring::after {
            content: '★';
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 5px;
            color: #5C4A1A;
        }
        .fanous-ring::before { left: 3px; }
        .fanous-ring::after { right: 3px; }

        .fanous-base {
            width: 44px;
            height: 38px;
            background: linear-gradient(180deg, #C9A227 0%, #9B7B1A 100%);
            border-radius: 0 0 50% 50%;
            margin: 0 auto;
            position: relative;
            box-shadow: inset 0 -8px 15px rgba(0,0,0,0.2), 0 5px 15px rgba(255, 183, 0, 0.3);
        }
        .fanous-base::before {
            content: '';
            position: absolute;
            top: 4px;
            left: 50%;
            transform: translateX(-50%);
            width: 32px;
            height: 26px;
            background: radial-gradient(ellipse at center, rgba(255, 248, 225, 0.95) 0%, rgba(255, 224, 130, 0.8) 40%, rgba(255, 183, 0, 0.4) 70%, transparent 100%);
            border-radius: 50%;
            animation: baseGlow 0.25s ease-in-out infinite alternate;
        }
        @keyframes baseGlow { 0% { opacity: 0.9; transform: translateX(-50%) scale(0.96); } 100% { opacity: 1; transform: translateX(-50%) scale(1); } }

        .crescent {
            position: fixed;
            top: 120px;
            right: 35px;
            font-size: 52px;
            color: #FFD700;
            z-index: 10001;
            pointer-events: none;
            animation: moonGlow 3s ease-in-out infinite;
            text-shadow: 0 0 35px rgba(255, 215, 0, 0.9), 0 0 70px rgba(255, 180, 0, 0.6), 0 0 100px rgba(255, 150, 0, 0.4);
        }

        .crescent-2 {
            position: fixed;
            top: 100px;
            left: 25px;
            font-size: 40px;
            color: #FFE082;
            z-index: 10001;
            pointer-events: none;
            animation: moonFloat 4s ease-in-out infinite;
            text-shadow: 0 0 20px rgba(255, 224, 130, 0.8), 0 0 40px rgba(255, 215, 0, 0.5);
        }

        .crescent-3 {
            position: fixed;
            top: 150px;
            left: 50px;
            font-size: 30px;
            color: #FFD54F;
            z-index: 10001;
            pointer-events: none;
            animation: moonFloat2 5s ease-in-out infinite;
            text-shadow: 0 0 18px rgba(255, 213, 79, 0.7), 0 0 35px rgba(255, 183, 0, 0.5);
        }

        .crescent-4 {
            position: fixed;
            top: 180px;
            right: 55px;
            font-size: 24px;
            color: #FFB300;
            z-index: 10001;
            pointer-events: none;
            animation: moonPulse 4.5s ease-in-out infinite;
            text-shadow: 0 0 15px rgba(255, 179, 0, 0.7), 0 0 30px rgba(255, 150, 0, 0.5);
        }

        .crescent-5 {
            position: fixed;
            top: 200px;
            left: 80px;
            font-size: 18px;
            color: #FFE082;
            z-index: 10001;
            pointer-events: none;
            animation: moonFloat 3.5s ease-in-out infinite;
            text-shadow: 0 0 12px rgba(255, 224, 130, 0.6), 0 0 25px rgba(255, 215, 0, 0.4);
        }

        .crescent-6 {
            position: fixed;
            top: 170px;
            right: 100px;
            font-size: 16px;
            color: #FFD54F;
            z-index: 10001;
            pointer-events: none;
            animation: moonPulse2 5.5s ease-in-out infinite;
            text-shadow: 0 0 10px rgba(255, 213, 79, 0.5), 0 0 20px rgba(255, 183, 0, 0.3);
        }

        @keyframes moonGlow { 0%, 100% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.1) rotate(3deg); } }
        @keyframes moonFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes moonFloat2 { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-5px) rotate(-2deg); } }
        @keyframes moonPulse { 0%, 100% { opacity: 0.9; transform: scale(1); } 50% { opacity: 1; transform: scale(1.12); } }
        @keyframes moonPulse2 { 0%, 100% { opacity: 0.85; transform: scale(1); } 50% { opacity: 1; transform: scale(1.1); } }

        .ramadan-star {
            position: fixed;
            font-size: 16px;
            color: #FFD700;
            z-index: 9999;
            pointer-events: none;
            animation: starTwinkle 2s ease-in-out infinite;
            text-shadow: 0 0 12px rgba(255, 215, 0, 0.9), 0 0 25px rgba(255, 180, 0, 0.6);
        }
        .star-1 { top: 15%; left: 10%; animation-delay: 0s; }
        .star-2 { top: 22%; left: 32%; animation-delay: 0.4s; font-size: 12px; }
        .star-3 { top: 12%; left: 52%; animation-delay: 0.8s; font-size: 18px; }
        .star-4 { top: 20%; right: 32%; animation-delay: 1.2s; font-size: 14px; }
        .star-5 { top: 25%; right: 10%; animation-delay: 1.6s; font-size: 13px; }

        @keyframes starTwinkle { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.75); } }

        .ramadan-greeting {
            position: fixed;
            bottom: 25px;
            left: 50%;
            transform: translateX(-50%);
            font-family: 'Amiri', serif;
            font-size: 1.7rem;
            color: #B8860B;
            z-index: 10000;
            pointer-events: none;
            text-shadow: 0 0 20px rgba(184, 134, 11, 0.5), 1px 1px 3px rgba(0,0,0,0.2);
            animation: greetBounce 3s ease-in-out infinite;
            white-space: nowrap;
        }
        @keyframes greetBounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-6px); } }

        .ramadan-dots {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9998;
            overflow: hidden;
        }

        .ramadan-dot {
            position: absolute;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            animation: dotBlink 2s ease-in-out infinite;
        }
        .ramadan-dot:nth-child(odd) { background: #FFD700; box-shadow: 0 0 6px #FFD700; }
        .ramadan-dot:nth-child(even) { background: #FFB300; box-shadow: 0 0 6px #FFB300; }
        @keyframes dotBlink { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }

/* Tablet */
        @media (min-width: 769px) and (max-width: 1024px) {
            .fanous-wire { height: 65px !important; display: block !important; }
            .fanous { top: 90px !important; transform: scale(0.5); }
            .fanous-body { transform: scale(0.85); }
            .fanous-2, .fanous-3, .fanous-4, .fanous-5, .fanous-6 { display: none !important; }
            .fanous-wire-2, .fanous-wire-3, .fanous-wire-4, .fanous-wire-5, .fanous-wire-6 { display: none !important; }
            .crescent { font-size: 40px; top: 85px; right: 20px; }
            .crescent-2 { font-size: 30px; top: 65px; left: 15px; }
            .crescent-3, .crescent-4, .crescent-5, .crescent-6 { display: none !important; }
            .ramadan-greeting { font-size: 1.3rem; bottom: 15px; }
            .ramadan-star { font-size: 12px; }
        }

        /* Mobile */
        @media (max-width: 768px) {
            .fanous-wire { height: 55px !important; display: block !important; }
            .fanous { top: 90px !important; transform: scale(0.5); }
            .fanous-body { transform: scale(0.85); }
            .fanous-2, .fanous-3, .fanous-4, .fanous-5, .fanous-6 { display: none !important; }
            .fanous-wire-2, .fanous-wire-3, .fanous-wire-4, .fanous-wire-5, .fanous-wire-6 { display: none !important; }
            .crescent { font-size: 32px; top: 70px; right: 15px; }
            .crescent-2 { font-size: 22px; top: 50px; left: 10px; }
            .crescent-3, .crescent-4, .crescent-5, .crescent-6 { display: none !important; }
            .ramadan-greeting { font-size: 0.95rem; bottom: 10px; }
            .ramadan-star { display: none !important; }
        }
    `;
  document.head.appendChild(style);

  // Create Hanging Wires
  for (let i = 1; i <= 6; i++) {
    const wire = document.createElement("div");
    wire.className = `fanous-wire fanous-wire-${i}`;
    container.appendChild(wire);
  }

  // Create Crescent Moons (6 moons)
  const moons = [
    "crescent",
    "crescent-2",
    "crescent-3",
    "crescent-4",
    "crescent-5",
    "crescent-6",
  ];
  moons.forEach((m) => {
    const moon = document.createElement("div");
    moon.className = m;
    moon.innerHTML = "☾";
    container.appendChild(moon);
  });

  // Create Lanterns
  for (let i = 1; i <= 6; i++) {
    const fanous = document.createElement("div");
    fanous.className = `fanous fanous-${i}`;
    fanous.innerHTML = `
            <div class="fanous-body">
                <div class="fanous-cap"></div>
                <div class="fanous-dome">
                    <div class="fanous-glow"></div>
                    <div class="fanous-windows">
                        <div class="fanous-window"></div>
                        <div class="fanous-window"></div>
                        <div class="fanous-window"></div>
                </div>
                <div class="fanous-ring"></div>
                <div class="fanous-base"></div>
        `;
    container.appendChild(fanous);
  }

  // Create Stars
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("div");
    star.className = `ramadan-star star-${i}`;
    star.innerHTML = "★";
    container.appendChild(star);
  }

  // Create Dots
  const dotsContainer = document.createElement("div");
  dotsContainer.className = "ramadan-dots";
  for (let i = 0; i < 25; i++) {
    const dot = document.createElement("div");
    dot.className = "ramadan-dot";
    dot.style.top = Math.random() * 20 + "%";
    dot.style.left = Math.random() * 100 + "%";
    dot.style.animationDelay = Math.random() * 2 + "s";
    dotsContainer.appendChild(dot);
  }
  container.appendChild(dotsContainer);

  // Create Greeting
  const greeting = document.createElement("div");
  greeting.className = "ramadan-greeting";
  //   greeting.innerHTML = "رمضان كريم 🌙";
  container.appendChild(greeting);

  // Add to body
  document.body.appendChild(container);
}
