/**
 * SecurityVisual — визуализация шифрования данных
 * Потоки частиц, движущихся по спирали к центру (замку)
 * Символизирует защищённую передачу данных
 */

export class SecurityVisual {
  constructor(container) {
    this.container = container;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 50;
    this.animationId = null;
    this.time = 0;
    this.centerX = 0;
    this.centerY = 0;

    this.init();
  }

  init() {
    this.container.appendChild(this.canvas);
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(this.newParticle(true));
    }
  }

  newParticle(randomPhase = false) {
    // Частицы движутся по спирали от краёв к центру
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.max(this.width, this.height) * 1.1;
    const startX = this.centerX + Math.cos(angle) * radius;
    const startY = this.centerY + Math.sin(angle) * radius;

    return {
      x: startX,
      y: startY,
      angle: angle,
      radius: radius,
      // Скорость движения к центру
      speed: Math.random() * 0.4 + 0.2,
      // Отклонение от идеальной спирали
      wobble: Math.random() * 0.03 + 0.01,
      wobbleOffset: randomPhase ? Math.random() * Math.PI * 2 : 0,
      // Размер частицы
      size: Math.random() * 2 + 1,
      // Прозрачность
      alpha: Math.random() * 0.5 + 0.5,
      // Цвет: чередуем cyan и mint
      color: Math.random() > 0.5 ? '77, 208, 200' : '124, 232, 213',
    };
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    this.time += 0.016;

    this.ctx.clearRect(0, 0, this.width, this.height);

    this.drawCore();
    this.updateParticles();
    this.drawParticles();
    this.drawRings();
  }

  drawCore() {
    // Центральный элемент — «замок» шифрования
    const cx = this.centerX;
    const cy = this.centerY;
    const pulse = 1 + Math.sin(this.time * 2) * 0.08;

    // Внешнее свечение
    const glowGradient = this.ctx.createRadialGradient(cx, cy, 0, cx, cy, 60 * pulse);
    glowGradient.addColorStop(0, 'rgba(77, 208, 200, 0.3)');
    glowGradient.addColorStop(0.5, 'rgba(77, 208, 200, 0.08)');
    glowGradient.addColorStop(1, 'rgba(77, 208, 200, 0)');

    this.ctx.beginPath();
    this.ctx.arc(cx, cy, 60 * pulse, 0, Math.PI * 2);
    this.ctx.fillStyle = glowGradient;
    this.ctx.fill();

    // Основной круг
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, 22, 0, Math.PI * 2);
    this.ctx.strokeStyle = 'rgba(77, 208, 200, 0.7)';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    // Внутренний круг
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, 14, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(77, 208, 200, 0.15)';
    this.ctx.fill();

    // Иконка замка (стилизованная)
    this.drawLockIcon(cx, cy, pulse);
  }

  drawLockIcon(cx, cy, pulse) {
    // Дужка замка
    this.ctx.beginPath();
    this.ctx.arc(cx, cy - 3, 7, Math.PI, 0);
    this.ctx.strokeStyle = 'rgba(77, 208, 200, 0.9)';
    this.ctx.lineWidth = 2.5;
    this.ctx.lineCap = 'round';
    this.ctx.stroke();

    // Тело замка
    this.ctx.beginPath();
    this.ctx.roundRect(cx - 7, cy + 1, 14, 11, 3);
    this.ctx.fillStyle = 'rgba(77, 208, 200, 0.9)';
    this.ctx.fill();

    // Замочная скважина
    this.ctx.beginPath();
    this.ctx.arc(cx, cy + 6, 2.5, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(10, 14, 20, 0.9)';
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy + 6);
    this.ctx.lineTo(cx, cy + 10);
    this.ctx.lineWidth = 1.2;
    this.ctx.strokeStyle = 'rgba(10, 14, 20, 0.9)';
    this.ctx.stroke();
  }

  updateParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Движение к центру
      p.radius -= p.speed;

      // Небольшое колебание угла
      p.angle += Math.sin(this.time * 3 + p.wobbleOffset) * p.wobble;

      // Вычисляем позицию
      p.x = this.centerX + Math.cos(p.angle) * p.radius;
      p.y = this.centerY + Math.sin(p.angle) * p.radius;

      // Если частица достигла центра — создаём новую
      if (p.radius < 25) {
        this.particles[i] = this.newParticle();
      }
    }
  }

  drawParticles() {
    for (const p of this.particles) {
      const distToCenter = Math.sqrt(
        (p.x - this.centerX) ** 2 + (p.y - this.centerY) ** 2
      );

      // Частицы ярче ближе к центру
      const brightnessBoost = 1 + Math.max(0, 1 - distToCenter / 100) * 0.6;

      // Свечение частицы
      const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
      gradient.addColorStop(0, `rgba(${p.color}, ${p.alpha * brightnessBoost})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();

      // Ядро
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color}, ${p.alpha * brightnessBoost})`;
      this.ctx.fill();
    }
  }

  drawRings() {
    // Концентрические кольца вокруг центра
    const cx = this.centerX;
    const cy = this.centerY;
    const ringCount = 3;

    for (let i = 0; i < ringCount; i++) {
      const baseRadius = 40 + i * 30;
      const offset = Math.sin(this.time * 1.5 + i) * 5;
      const radius = baseRadius + offset;
      const alpha = 0.12 - i * 0.03;

      this.ctx.beginPath();
      this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(77, 208, 200, ${alpha})`;
      this.ctx.lineWidth = 1;
      this.ctx.setLineDash([4, 8]);
      this.ctx.lineDashOffset = this.time * 20 * (i + 1);
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    }
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}