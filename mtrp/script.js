// Canvas Animation - Mathematical Formulas & Geometric Shapes
const canvas = document.getElementById("canvas3d");
if (canvas) {
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();

  // Mathematical Formula Particles
  class FormulaParticle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.formulas = [
        "π", "e", "φ", "∞", "√", "±", "≈", "≠", "≤", "≥",
        "∈", "∀", "∃", "⊂", "⊆", "∪", "∩", "∫", "∑", "∂"
      ];
      this.formula = this.formulas[Math.floor(Math.random() * this.formulas.length)];
      this.size = Math.random() * 18 + 12;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.015;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      const isLightMode = document.body.classList.contains("light-mode");
      ctx.fillStyle = isLightMode
        ? `rgba(245, 127, 23, ${this.opacity})`
        : `rgba(255, 235, 59, ${this.opacity})`;
      ctx.font = `${this.size}px Arial`;

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillText(this.formula, 0, 0);
      ctx.restore();
    }
  }

  // Geometric Shape Particles
  class GeometricShape {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 30 + 15;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      this.opacity = Math.random() * 0.3 + 0.1;
      this.sides = Math.floor(Math.random() * 3) + 3;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;

      if (this.x < -50 || this.x > canvas.width + 50) this.vx *= -1;
      if (this.y < -50 || this.y > canvas.height + 50) this.vy *= -1;
    }

    draw() {
      const isLightMode = document.body.classList.contains("light-mode");
      ctx.strokeStyle = isLightMode
        ? `rgba(245, 127, 23, ${this.opacity})`
        : `rgba(255, 235, 59, ${this.opacity})`;
      ctx.lineWidth = 2;

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      ctx.beginPath();
      for (let i = 0; i < this.sides; i++) {
        const angle = ((Math.PI * 2) / this.sides) * i;
        const hx = this.size * Math.cos(angle);
        const hy = this.size * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.restore();
    }
  }

  // Glowing Dots
  class GlowDot {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 1;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      const isLightMode = document.body.classList.contains("light-mode");
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.size * 3
      );
      gradient.addColorStop(
        0,
        isLightMode ? "rgba(245, 127, 23, 0.6)" : "rgba(255, 235, 59, 0.8)"
      );
      gradient.addColorStop(1, "rgba(255, 235, 59, 0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const formulas = Array.from({ length: 25 }, () => new FormulaParticle());
  const shapes = Array.from({ length: 10 }, () => new GeometricShape());
  const dots = Array.from({ length: 60 }, () => new GlowDot());

  function animate() {
    const isLightMode = document.body.classList.contains("light-mode");
    ctx.fillStyle = isLightMode
      ? "rgba(255, 253, 231, 0.1)"
      : "rgba(26, 26, 46, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    shapes.forEach((shape) => {
      shape.update();
      shape.draw();
    });

    formulas.forEach((formula) => {
      formula.update();
      formula.draw();
    });

    dots.forEach((dot) => {
      dot.update();
      dot.draw();
    });

    // Draw connecting lines
    dots.forEach((d1, i) => {
      dots.slice(i + 1).forEach((d2) => {
        const dx = d1.x - d2.x;
        const dy = d1.y - d2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.strokeStyle = isLightMode
            ? `rgba(245, 127, 23, ${0.15 * (1 - dist / 100)})`
            : `rgba(255, 235, 59, ${0.2 * (1 - dist / 100)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(d1.x, d1.y);
          ctx.lineTo(d2.x, d2.y);
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(animate);
  }

  animate();

  // Window Resize Handler
  window.addEventListener("resize", () => {
    resizeCanvas();
    formulas.forEach((f) => f.reset());
    shapes.forEach((s) => s.reset());
    dots.forEach((d) => d.reset());
  });

  // Mouse interaction with shapes
  canvas.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    shapes.forEach((shape) => {
      const dx = mouseX - shape.x;
      const dy = mouseY - shape.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 150) {
        shape.vx += dx * 0.0002;
        shape.vy += dy * 0.0002;
        shape.rotationSpeed = 0.06;
      } else {
        shape.rotationSpeed = (Math.random() - 0.5) * 0.02;
      }
    });
  });
}

// Theme Toggle
const themeToggle = document.querySelector(".theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const icon = themeToggle.querySelector(".toggle-icon");
    if (icon) {
      icon.textContent = document.body.classList.contains("light-mode") ? "🌙" : "☀️";
    }
    
    // Save preference
    localStorage.setItem(
      "mtrpTheme",
      document.body.classList.contains("light-mode") ? "light" : "dark"
    );
  });

  // Load saved theme
  const savedTheme = localStorage.getItem("mtrpTheme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    const icon = themeToggle.querySelector(".toggle-icon");
    if (icon) icon.textContent = "🌙";
  }
}

// Mobile Navigation Toggle
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close menu when clicking nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Mobile dropdown toggle
  document.querySelectorAll(".dropdown").forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle("active");
      }
    });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll reveal animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".page-section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "all 0.8s ease";
  observer.observe(section);
});

// Animate rule cards
const ruleObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0) scale(1)";
        }, index * 100);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".rule-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px) scale(0.95)";
  card.style.transition = "all 0.6s ease";
  ruleObserver.observe(card);
});

// Animate feature items
const featureObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateX(0)";
        }, index * 100);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".feature-item").forEach((item, index) => {
  item.style.opacity = "0";
  item.style.transform = "translateX(-30px)";
  item.style.transition = "all 0.6s ease";
  featureObserver.observe(item);
});

// Parallax effect for hero section
window.addEventListener(
  "scroll",
  () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const hero = document.querySelector(".hero");

    if (hero) {
      const heroHeight = hero.offsetHeight;
      if (scrollTop < heroHeight) {
        hero.style.transform = `translateY(${scrollTop * 0.4}px)`;
        hero.style.opacity = 1 - (scrollTop / heroHeight) * 0.5;
      }
    }
  },
  { passive: true }
);

// Add ripple effect to buttons
document.querySelectorAll("button, .view-btn, .tab-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      left: ${x}px;
      top: ${y}px;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;

    if (!document.getElementById("ripple-styles")) {
      const style = document.createElement("style");
      style.id = "ripple-styles";
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        button, .view-btn, .tab-btn {
          position: relative;
          overflow: hidden;
        }
      `;
      document.head.appendChild(style);
    }

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Countdown Timer (if needed)
function updateCountdown() {
  const registrationDate = new Date("2025-12-01T00:00:00");
  const now = new Date();
  const diff = registrationDate - now;

  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const countdownElement = document.querySelector(".countdown-info");
    if (countdownElement) {
      countdownElement.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-top: 20px;">
          <div style="text-align: center;">
            <div style="font-size: 2rem; font-weight: bold; color: var(--accent-primary);">${days}</div>
            <div style="font-size: 0.9rem; color: var(--text-muted);">Days</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 2rem; font-weight: bold; color: var(--accent-primary);">${hours}</div>
            <div style="font-size: 0.9rem; color: var(--text-muted);">Hours</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 2rem; font-weight: bold; color: var(--accent-primary);">${minutes}</div>
            <div style="font-size: 0.9rem; color: var(--text-muted);">Minutes</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 2rem; font-weight: bold; color: var(--accent-primary);">${seconds}</div>
            <div style="font-size: 0.9rem; color: var(--text-muted);">Seconds</div>
          </div>
        </div>
      `;
    }
  }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Animate camp card on hover
const campCard = document.querySelector(".camp-card");
if (campCard) {
  campCard.addEventListener("mouseenter", function() {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });
  
  campCard.addEventListener("mouseleave", function() {
    this.style.transform = "translateY(0) scale(1)";
  });
}

// Add floating animation to feature icons
document.querySelectorAll(".feature-icon, .rule-icon, .form-icon").forEach((icon, index) => {
  icon.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
});

// Add float animation if not exists
if (!document.getElementById("float-animation")) {
  const style = document.createElement("style");
  style.id = "float-animation";
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
  `;
  document.head.appendChild(style);
}

// Footer decoration animation
document.querySelectorAll(".decoration-symbol").forEach((symbol, index) => {
  symbol.style.animationDelay = `${index * 2}s`;
});

// Welcome message on first visit
const welcomeShown = sessionStorage.getItem("mtrpWelcomeShown");
if (!welcomeShown) {
  setTimeout(() => {
    const hero = document.querySelector(".hero");
    if (hero) {
      const message = document.createElement("div");
      message.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-orange));
        color: #1a1a1a;
        padding: 20px 40px;
        border-radius: 50px;
        font-weight: 600;
        font-size: 1.1rem;
        z-index: 2000;
        box-shadow: 0 10px 40px var(--shadow-color);
        animation: slideDown 0.5s ease, fadeOut 0.5s ease 3s forwards;
      `;
      message.textContent = "📐 Welcome to MTRP 2026! Challenge Your Mathematical Prowess!";
      
      if (!document.getElementById("welcome-animation")) {
        const style = document.createElement("style");
        style.id = "welcome-animation";
        style.textContent = `
          @keyframes slideDown {
            from { top: -100px; opacity: 0; }
            to { top: 100px; opacity: 1; }
          }
          @keyframes fadeOut {
            to { opacity: 0; top: -100px; }
          }
        `;
        document.head.appendChild(style);
      }
      
      document.body.appendChild(message);
      setTimeout(() => message.remove(), 3500);
    }
    sessionStorage.setItem("mtrpWelcomeShown", "true");
  }, 1000);
}

// Add sparkle effect to cards on hover
document.querySelectorAll(".rule-card, .camp-card, .form-placeholder").forEach((card) => {
  card.addEventListener("mouseenter", function(e) {
    const sparkle = document.createElement("div");
    sparkle.style.cssText = `
      position: absolute;
      width: 10px;
      height: 10px;
      background: var(--accent-gold);
      border-radius: 50%;
      pointer-events: none;
      animation: sparkle 1s ease-out forwards;
    `;
    sparkle.style.left = Math.random() * this.offsetWidth + "px";
    sparkle.style.top = Math.random() * this.offsetHeight + "px";
    
    if (!document.getElementById("sparkle-animation")) {
      const style = document.createElement("style");
      style.id = "sparkle-animation";
      style.textContent = `
        @keyframes sparkle {
          0% { transform: scale(0); opacity: 1; }
          50% { transform: scale(1); }
          100% { transform: scale(0); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    
    this.style.position = "relative";
    this.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  });
});

console.log("🎓 MTRP 2026 - Mathematics Talent Reward Program");
console.log("✨ Website loaded successfully!");
