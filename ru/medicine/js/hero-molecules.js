// Canvas/WebGL анимация молекул в hero

/**
 * HeroMolecules — анимация молекул на Canvas
 * Плавное движение точек с линиями связи между ближайшими
 */

export class HeroMolecules {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null };
    this.particleCount = 60;
    this.connectionDist = 140;
    this.animationId = null;

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    this.canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    this.canvas.parentElement.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    // Сенсорные устройства
    this.canvas.parentElement.addEventListener('touchmove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.touches[0].clientX - rect.left;
      this.mouse.y = e.touches[0].clientY - rect.top;
    }, { passive: true });

    this.canvas.parentElement.addEventListener('touchend', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.updateParticles();
    this.drawConnections();
    this.drawParticles();
  }

  updateParticles() {
    for (const p of this.particles) {
      // Движение
      p.x += p.vx;
      p.y += p.vy;

      // Зацикливание по краям
      if (p.x < -20) p.x = this.width + 20;
      if (p.x > this.width + 20) p.x = -20;
      if (p.y < -20) p.y = this.height + 20;
      if (p.y > this.height + 20) p.y = -20;

      // Пульсация радиуса
      p.pulse += p.pulseSpeed;
    }
  }

  drawParticles() {
    for (const p of this.particles) {
      const pulseRadius = p.radius + Math.sin(p.pulse) * 0.8;

      // Свечение
      const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulseRadius * 4);
      gradient.addColorStop(0, 'rgba(77, 208, 200, 0.7)');
      gradient.addColorStop(0.4, 'rgba(77, 208, 200, 0.2)');
      gradient.addColorStop(1, 'rgba(77, 208, 200, 0)');

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, pulseRadius * 4, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();

      // Ядро
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, pulseRadius, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(77, 208, 200, 0.9)';
      this.ctx.fill();
    }
  }

  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.connectionDist) {
          const opacity = 1 - dist / this.connectionDist;
          this.ctx.beginPath();
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.strokeStyle = `rgba(77, 208, 200, ${opacity * 0.15})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }

    // Связи с курсором
    if (this.mouse.x !== null && this.mouse.y !== null) {
      for (const p of this.particles) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.connectionDist) {
          const opacity = 1 - dist / this.connectionDist;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = `rgba(77, 208, 200, ${opacity * 0.3})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}