// --- Infinite 3D Particle Background ---
const canvas3D = document.getElementById('bgCanvas');
const ctx3D = canvas3D.getContext('2d');
canvas3D.width = window.innerWidth;
canvas3D.height = window.innerHeight;

class Particle3D {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas3D.width;
        this.y = Math.random() * canvas3D.height;
        this.z = Math.random() * 1000;
        this.vz = Math.random() * 2 + 1;
    }

    update() {
        this.z -= this.vz;
        if (this.z <= 0) this.reset();
    }

    draw() {
        const scale = 1000 / (1000 + this.z);
        const x2d = (this.x - canvas3D.width / 2) * scale + canvas3D.width / 2;
        const y2d = (this.y - canvas3D.height / 2) * scale + canvas3D.height / 2;
        const size = scale * 3;

        const gradient = ctx3D.createRadialGradient(x2d, y2d, 0, x2d, y2d, size * 2);
        gradient.addColorStop(0, `rgba(102, 126, 234, ${0.8 * scale})`);
        gradient.addColorStop(0.5, `rgba(118, 75, 162, ${0.4 * scale})`);
        gradient.addColorStop(1, 'rgba(102, 126, 234, 0)');

        ctx3D.fillStyle = gradient;
        ctx3D.beginPath();
        ctx3D.arc(x2d, y2d, size * 2, 0, Math.PI * 2);
        ctx3D.fill();
    }
}

const particles3D = Array.from({ length: 100 }, () => new Particle3D());

function animate3D() {
    ctx3D.clearRect(0, 0, canvas3D.width, canvas3D.height); // fully clear for smoothness
    particles3D.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate3D);
}
animate3D();


// --- Lorenz Attractor for Chaos Visualization ---
const chaosCanvas = document.createElement('canvas');
document.body.appendChild(chaosCanvas);
chaosCanvas.style.position = 'absolute';
chaosCanvas.style.top = '0';
chaosCanvas.style.left = '0';
chaosCanvas.style.pointerEvents = 'none';
chaosCanvas.width = window.innerWidth;
chaosCanvas.height = window.innerHeight;
const chaosCtx = chaosCanvas.getContext('2d');

class LorenzAttractor {
    constructor(offsetX = 0.1, hue = 240) {
        this.x = offsetX; this.y = 0; this.z = 0;
        this.a = 10; this.b = 28; this.c = 8/3; this.dt = 0.005;
        this.points = []; this.maxPoints = 2000;
        this.hue = hue;
    }

    update() {
        const dx = this.a * (this.y - this.x) * this.dt;
        const dy = (this.x * (this.b - this.z) - this.y) * this.dt;
        const dz = (this.x * this.y - this.c * this.z) * this.dt;
        this.x += dx; this.y += dy; this.z += dz;

        this.points.push({x: this.x, y: this.y, z: this.z});
        if(this.points.length > this.maxPoints) this.points.shift();
    }

    draw() {
        const scale = 8;
        const centerX = chaosCanvas.width/2;
        const centerY = chaosCanvas.height/2;

        chaosCtx.beginPath();
        this.points.forEach((pt,i) => {
            const screenX = centerX + pt.x*scale;
            const screenY = centerY + pt.y*scale;
            if(i===0) chaosCtx.moveTo(screenX, screenY);
            else chaosCtx.lineTo(screenX, screenY);
        });
        chaosCtx.strokeStyle = `hsla(${this.hue}, 70%, 60%, 0.5)`;
        chaosCtx.lineWidth = 1;
        chaosCtx.stroke();
    }
}

const attractors = [new LorenzAttractor(0.1,240), new LorenzAttractor(-0.1,260)];

function animateChaos() {
    // No fading for infinite persistence
    attractors.forEach(a => { a.update(); a.draw(); });
    requestAnimationFrame(animateChaos);
}
animateChaos();

const eqContainer = document.createElement('div');
eqContainer.style.position = 'absolute';
eqContainer.style.top = '0';
eqContainer.style.left = '0';
eqContainer.style.width = '100%';
eqContainer.style.height = '100%';
eqContainer.style.pointerEvents = 'none';
document.body.appendChild(eqContainer);

function createEquation() {
    const eq = document.createElement('div');
    eq.className = 'floating-equation';
    eq.textContent = equations[Math.floor(Math.random()*equations.length)];
    eq.style.left = Math.random()*80 + 10 + '%';
    eq.style.animationDelay = Math.random()*5 + 's';
    eq.style.animationDuration = Math.random()*10 + 15 + 's';
    eqContainer.appendChild(eq);
}
for(let i=0;i<15;i++) createEquation();
setInterval(createEquation, 3000);


// --- Resize Handler ---
window.addEventListener('resize', () => {
    canvas3D.width = window.innerWidth;
    canvas3D.height = window.innerHeight;
    chaosCanvas.width = window.innerWidth;
    chaosCanvas.height = window.innerHeight;
});
