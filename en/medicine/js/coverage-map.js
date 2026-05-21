/**
 * CoverageMap — абстрактная визуализация охвата
 * Концентрические волны, топографические линии, градиентная сеть
 */

export class CoverageMap {
  constructor(container) {
    this.container = container;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.cities = [];
    this.hoveredCity = null;
    this.animationId = null;
    this.time = 0;
    this.wavePhase = 0;

    this.init();
  }

  init() {
    this.container.appendChild(this.canvas);
    this.resize();
    this.createCities();
    this.bindEvents();
    this.animate();
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  createCities() {
    // Города — теперь это «узлы сети» с весами
    const cityData = [
      { name: 'London', x: 25, y: 52, type: 'active', patients: '95 000+', weight: 3 },
      { name: 'Berlin', x: 48, y: 48, type: 'active', patients: '62 000+', weight: 3 },
      { name: 'Paris', x: 30, y: 58, type: 'active', patients: '58 000+', weight: 3 },
      { name: 'Madrid', x: 18, y: 72, type: 'active', patients: '44 000+', weight: 2 },
      { name: 'Rome', x: 42, y: 68, type: 'active', patients: '38 000+', weight: 2 },
      { name: 'Amsterdam', x: 36, y: 44, type: 'active', patients: '28 000+', weight: 2 },
      { name: 'Vienna', x: 52, y: 54, type: 'active', patients: '22 000+', weight: 2 },
      { name: 'Warsaw', x: 56, y: 42, type: 'active', patients: '20 000+', weight: 2 },
      { name: 'Brussels', x: 33, y: 50, type: 'active', patients: '18 000+', weight: 1 },
      { name: 'Lisbon', x: 8, y: 78, type: 'active', patients: '16 000+', weight: 1 },
      { name: 'Prague', x: 50, y: 50, type: 'active', patients: '15 000+', weight: 1 },
      { name: 'Budapest', x: 55, y: 56, type: 'active', patients: '14 000+', weight: 1 },
      { name: 'Stockholm', x: 52, y: 28, type: 'active', patients: '13 000+', weight: 1 },
      { name: 'Dublin', x: 16, y: 44, type: 'active', patients: '12 000+', weight: 1 },
      { name: 'Athens', x: 48, y: 76, type: 'active', patients: '11 000+', weight: 1 },
      { name: 'Oslo', x: 46, y: 28, type: 'active', patients: '10 000+', weight: 1 },

      // Coming soon
      { name: 'Zurich', x: 42, y: 58, type: 'soon', patients: null, weight: 0.5 },
      { name: 'Helsinki', x: 58, y: 24, type: 'soon', patients: null, weight: 0.5 },
      { name: 'Copenhagen', x: 48, y: 36, type: 'soon', patients: null, weight: 0.5 },
      { name: 'Barcelona', x: 22, y: 74, type: 'soon', patients: null, weight: 0.5 },
      { name: 'Munich', x: 46, y: 52, type: 'soon', patients: null, weight: 0.5 },
      { name: 'Edinburgh', x: 20, y: 38, type: 'soon', patients: null, weight: 0.5 },
      { name: 'Krakow', x: 58, y: 44, type: 'soon', patients: null, weight: 0.5 },
    ];

    this.cities = cityData.map(city => ({
      ...city,
      px: (city.x / 100) * this.width,
      py: (city.y / 100) * this.height,
      radius: 4,
      pulse: Math.random() * Math.PI * 2,
    }));
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.cities.forEach(city => {
        city.px = (city.x / 100) * this.width;
        city.py = (city.y / 100) * this.height;
      });
    });

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.checkHover(e.clientX - rect.left, e.clientY - rect.top);
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.hoveredCity = null;
    });

    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      this.checkHover(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
    });

    this.canvas.addEventListener('touchend', () => {
      this.hoveredCity = null;
    });
  }

  checkHover(mx, my) {
    this.hoveredCity = null;
    for (const city of this.cities) {
      const dx = mx - city.px;
      const dy = my - city.py;
      if (Math.sqrt(dx * dx + dy * dy) < 20) {
        this.hoveredCity = city;
        break;
      }
    }
    this.canvas.style.cursor = this.hoveredCity ? 'pointer' : 'default';
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    this.time += 0.016;
    this.wavePhase += 0.008;

    this.ctx.clearRect(0, 0, this.width, this.height);

    this.drawTopography();
    this.drawGradientNetwork();
    this.drawWaves();
    this.drawCities();
    this.drawTooltip();
  }

  drawTopography() {
    // Топографические линии — расходящиеся от крупных узлов
    const majorCities = this.cities.filter(c => c.weight >= 2);

    for (const city of majorCities) {
      const ringCount = 5;
      for (let i = 1; i <= ringCount; i++) {
        const radius = i * 35 + Math.sin(this.time * 0.5 + i) * 4;
        const alpha = 0.06 - i * 0.01;

        this.ctx.beginPath();
        this.ctx.arc(city.px, city.py, radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = `rgba(77, 208, 200, ${alpha})`;
        this.ctx.lineWidth = 0.5;
        this.ctx.stroke();
      }
    }

    // Топографические линии — общие, по всему полю
    const gridStep = 50;
    const activeCities = this.cities.filter(c => c.type === 'active');

    for (let x = gridStep; x < this.width; x += gridStep) {
      for (let y = gridStep; y < this.height; y += gridStep) {
        // Вычисляем «высоту» точки как сумму влияния всех городов
        let elevation = 0;
        for (const city of activeCities) {
          const dx = x - city.px;
          const dy = y - city.py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          elevation += (city.weight * 80) / (dist + 40);
        }

        // Рисуем точку с яркостью, зависящей от «высоты»
        const alpha = Math.min(elevation * 0.015, 0.2);
        if (alpha > 0.02) {
          this.ctx.beginPath();
          this.ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          this.ctx.fillStyle = `rgba(77, 208, 200, ${alpha})`;
          this.ctx.fill();
        }
      }
    }
  }

  drawGradientNetwork() {
    // Сеть между городами с градиентной заливкой областей
    const activeCities = this.cities.filter(c => c.type === 'active');

    // Триангуляция Делоне упрощённая — соединяем ближайшие
    for (let i = 0; i < activeCities.length; i++) {
      for (let j = i + 1; j < activeCities.length; j++) {
        const a = activeCities[i];
        const b = activeCities[j];
        const dx = a.px - b.px;
        const dy = a.py - b.py;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Соединяем города на расстоянии до 200px
        if (dist < 200) {
          const midX = (a.px + b.px) / 2;
          const midY = (a.py + b.py) / 2;

          // Градиент вдоль линии
          const gradient = this.ctx.createLinearGradient(a.px, a.py, b.px, b.py);
          const alphaA = a.weight * 0.12;
          const alphaB = b.weight * 0.12;
          gradient.addColorStop(0, `rgba(77, 208, 200, ${alphaA})`);
          gradient.addColorStop(1, `rgba(77, 208, 200, ${alphaB})`);

          this.ctx.beginPath();
          this.ctx.moveTo(a.px, a.py);
          this.ctx.lineTo(b.px, b.py);
          this.ctx.strokeStyle = gradient;
          this.ctx.lineWidth = a.weight + b.weight;
          this.ctx.stroke();

          // Узлы на середине
          this.ctx.beginPath();
          this.ctx.arc(midX, midY, 2, 0, Math.PI * 2);
          this.ctx.fillStyle = `rgba(77, 208, 200, 0.3)`;
          this.ctx.fill();
        }
      }
    }
  }

  drawWaves() {
    // Концентрические волны от групп городов
    const hubs = this.cities.filter(c => c.weight >= 2);

    for (const hub of hubs) {
      const waveCount = 3;
      for (let i = 0; i < waveCount; i++) {
        const baseRadius = 60 + i * 50;
        const radius = baseRadius + ((this.wavePhase * 60 + i * 20) % 150);

        if (radius < 150) {
          const alpha = (1 - radius / 150) * 0.1;
          this.ctx.beginPath();
          this.ctx.arc(hub.px, hub.py, radius, 0, Math.PI * 2);
          this.ctx.strokeStyle = `rgba(77, 208, 200, ${alpha})`;
          this.ctx.lineWidth = 1;
          this.ctx.setLineDash([4, 12]);
          this.ctx.stroke();
          this.ctx.setLineDash([]);
        }
      }
    }
  }

  drawCities() {
    for (const city of this.cities) {
      const isHovered = this.hoveredCity === city;
      const isActive = city.type === 'active';

      city.pulse += isActive ? 0.04 : 0.02;
      const pulseScale = 1 + Math.sin(city.pulse) * 0.5;

      // Размер зависит от веса
      const baseRadius = 3 + city.weight * 2;

      // Внешнее свечение — несколько слоёв
      for (let layer = 2; layer >= 0; layer--) {
        const glowRadius = baseRadius * (layer + 1) * 3 * (isHovered ? 1.6 : 1);
        const alpha = (0.15 - layer * 0.05) * (isHovered ? 1.5 : 1);

        const gradient = this.ctx.createRadialGradient(
          city.px, city.py, 0,
          city.px, city.py, glowRadius
        );
        const color = isActive ? '77, 208, 200' : '45, 157, 146';
        gradient.addColorStop(0, `rgba(${color}, ${alpha})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        this.ctx.beginPath();
        this.ctx.arc(city.px, city.py, glowRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
      }

      // Ядро
      const radius = baseRadius * (isHovered ? 1.8 : 1) * pulseScale;
      this.ctx.beginPath();
      this.ctx.arc(city.px, city.py, radius, 0, Math.PI * 2);

      if (isActive) {
        this.ctx.fillStyle = isHovered ? '#7ce8d5' : '#4dd0c8';
      } else {
        this.ctx.fillStyle = isHovered
          ? 'rgba(45, 157, 146, 0.8)'
          : 'rgba(45, 157, 146, 0.4)';
      }
      this.ctx.fill();

      // Кольцо вокруг ховера
      if (isHovered) {
        this.ctx.beginPath();
        this.ctx.arc(city.px, city.py, radius + 10, 0, Math.PI * 2);
        this.ctx.strokeStyle = 'rgba(77, 208, 200, 0.6)';
        this.ctx.lineWidth = 1.5;
        this.ctx.stroke();
      }
    }
  }

  drawTooltip() {
    if (!this.hoveredCity) return;
    const city = this.hoveredCity;
    const tx = city.px;
    const ty = city.py - 30;
    const text = city.type === 'active'
      ? `${city.name} — ${city.patients} пациентов`
      : `${city.name} — скоро запуск`;

    this.ctx.font = '12px "Inter", sans-serif';
    const textWidth = this.ctx.measureText(text).width;
    const padding = 10;
    const boxWidth = textWidth + padding * 2;
    const boxHeight = 30;
    let boxX = tx - boxWidth / 2;
    const boxY = ty - boxHeight;
    if (boxX < 10) boxX = 10;
    if (boxX + boxWidth > this.width - 10) boxX = this.width - boxWidth - 10;

    this.ctx.fillStyle = 'rgba(16, 22, 30, 0.95)';
    this.ctx.strokeStyle = 'rgba(77, 208, 200, 0.5)';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 6);
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.fillStyle = '#e9ecef';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(text, boxX + boxWidth / 2, boxY + boxHeight / 2);
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}