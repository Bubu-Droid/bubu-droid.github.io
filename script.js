// Celebration
function startCelebration() {
    const container = document.getElementById('celebrationContainer');
    
    for (let i = 0; i < 5; i++) setTimeout(() => createEnergyWave(container), i * 200);
    setTimeout(() => createParticleBurst(container), 300);
    for (let i = 0; i < 20; i++) setTimeout(() => createLightRay(container), i * 80);
    for (let i = 0; i < 15; i++) setTimeout(() => createGlowOrb(container), i * 150);
}

function createEnergyWave(container) {
            const wave = document.createElement('div');
            wave.className = 'energy-wave';
            const colors = ['rgba(102, 126, 234, 0.6)', 'rgba(118, 75, 162, 0.6)', 'rgba(240, 147, 251, 0.6)'];
            wave.style.borderColor = colors[Math.floor(Math.random() * colors.length)];
            container.appendChild(wave);
            setTimeout(() => wave.remove(), 1500);
        }

        function createParticleBurst(container) {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];

            for (let i = 0; i < 60; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle-burst';
                particle.style.color = colors[Math.floor(Math.random() * colors.length)];
                particle.style.left = centerX + 'px';
                particle.style.top = centerY + 'px';
                
                const angle = (Math.PI * 2 * i) / 60;
                const velocity = Math.random() * 200 + 150;
                const tx = Math.cos(angle) * velocity;
                const ty = Math.sin(angle) * velocity;
                
                particle.style.setProperty('--tx', tx + 'px');
                particle.style.setProperty('--ty', ty + 'px');
                particle.style.animation = 'particleExpand 1.5s ease-out forwards';
                
                container.appendChild(particle);
                setTimeout(() => particle.remove(), 1500);
            }
        }

        function createLightRay(container) {
            const ray = document.createElement('div');
            ray.className = 'light-ray';
            ray.style.left = Math.random() * 100 + '%';
            ray.style.top = '50%';
            ray.style.transform = `rotate(${Math.random() * 360}deg)`;
            const colors = [
                'linear-gradient(to bottom, rgba(102, 126, 234, 0.8), transparent)',
                'linear-gradient(to bottom, rgba(240, 147, 251, 0.8), transparent)',
                'linear-gradient(to bottom, rgba(79, 172, 254, 0.8), transparent)'
            ];
            ray.style.background = colors[Math.floor(Math.random() * colors.length)];
            container.appendChild(ray);
            setTimeout(() => ray.remove(), 2000);
        }

        function createGlowOrb(container) {
            const orb = document.createElement('div');
            orb.className = 'glow-orb';
            const startX = window.innerWidth / 2;
            const startY = window.innerHeight / 2;
            orb.style.left = startX + 'px';
            orb.style.top = startY + 'px';
            
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 300 + 200;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            orb.style.setProperty('--tx', tx + 'px');
            orb.style.setProperty('--ty', ty + 'px');
            
            container.appendChild(orb);
            setTimeout(() => orb.remove(), 3000);
        }
// Lorenz Attractor (Chaos Theory Visualization)
        const chaosCanvas = document.getElementById('chaosCanvas');
        const chaosCtx = chaosCanvas.getContext('2d');
        chaosCanvas.width = window.innerWidth;
        chaosCanvas.height = window.innerHeight;

        class LorenzAttractor {
            constructor(offsetX = 0.1, hue = 240) {
                this.x = offsetX;
                this.y = 0;
                this.z = 0;
                this.a = 10;
                this.b = 28;
                this.c = 8.0 / 3.0;
                this.dt = 0.005;
                this.points = [];
                this.maxPoints = 2000;
                this.hue = hue;
            }

            update() {
                const dx = this.a * (this.y - this.x) * this.dt;
                const dy = (this.x * (this.b - this.z) - this.y) * this.dt;
                const dz = (this.x * this.y - this.c * this.z) * this.dt;

                this.x += dx;
                this.y += dy;
                this.z += dz;

                this.points.push({ x: this.x, y: this.y, z: this.z });
                if (this.points.length > this.maxPoints) {
                    this.points.shift();
                }
            }

            draw() {
                const scale = 8;
                const centerX = chaosCanvas.width / 2;
                const centerY = chaosCanvas.height / 2;

                chaosCtx.beginPath();
                this.points.forEach((point, i) => {
                    const screenX = centerX + point.x * scale;
                    const screenY = centerY + point.y * scale;
                    
                    if (i === 0) {
                        chaosCtx.moveTo(screenX, screenY);
                    } else {
                        chaosCtx.lineTo(screenX, screenY);
                    }
                });

                chaosCtx.strokeStyle = `hsla(${this.hue}, 70%, 60%, 0.5)`;
                chaosCtx.lineWidth = 1;
                chaosCtx.stroke();
            }
        }

        const attractor1 = new LorenzAttractor(0.1, 240);
        const attractor2 = new LorenzAttractor(-0.1, 260);
        const attractors = [attractor1, attractor2];

        function animateChaos() {
            chaosCtx.fillStyle = 'rgba(0, 0, 0, 0.02)';
            chaosCtx.fillRect(0, 0, chaosCanvas.width, chaosCanvas.height);

            attractors.forEach(attractor => {
                attractor.update();
                attractor.draw();
            });

            requestAnimationFrame(animateChaos);
        }

        animateChaos();

// 3D Particle Background
        const canvas = document.getElementById('canvas3d');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Particle3D {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.z = Math.random() * 1000;
                this.vz = Math.random() * 2 + 1;
            }

            update() {
                this.z -= this.vz;
                if (this.z <= 0) {
                    this.reset();
                    this.z = 1000;
                }
            }

            draw() {
                const scale = 1000 / (1000 + this.z);
                const x2d = (this.x - canvas.width / 2) * scale + canvas.width / 2;
                const y2d = (this.y - canvas.height / 2) * scale + canvas.height / 2;
                const size = scale * 3;

                const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size * 2);
                gradient.addColorStop(0, `rgba(102, 126, 234, ${0.8 * scale})`);
                gradient.addColorStop(0.5, `rgba(118, 75, 162, ${0.4 * scale})`);
                gradient.addColorStop(1, 'rgba(102, 126, 234, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x2d, y2d, size * 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const particles3D = Array.from({ length: 100 }, () => new Particle3D());

        function animate3D() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles3D.forEach(p => {
                p.update();
                p.draw();
            });

            requestAnimationFrame(animate3D);
        }

        animate3D();


// Custom Cursor (Optional)
const cursor = document.getElementById('customCursor');
const cursorTrail = document.getElementById('cursorTrail');
if(cursor && cursorTrail) {
    let cursorX=0,cursorY=0,trailX=0,trailY=0;
    document.addEventListener('mousemove',(e)=>{cursorX=e.clientX;cursorY=e.clientY;});
    function updateCursor(){
        cursor.style.left=cursorX+'px';cursor.style.top=cursorY+'px';
        trailX+=(cursorX-trailX)*0.2;trailY+=(cursorY-trailY)*0.2;
        cursorTrail.style.left=trailX+'px';cursorTrail.style.top=trailY+'px';
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
}

// Resize handler
window.addEventListener('resize',()=>{
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    chaosCanvas.width=window.innerWidth;
    chaosCanvas.height=window.innerHeight;
});
