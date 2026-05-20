// Интерактивная карта охвата

/**
 * CoverageMap — интерактивная карта охвата
 * Упрощённая карта с городами-точками на Canvas
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
    // Координаты в процентах — адаптируются под любой размер
    const cityData = [
      { name: 'Москва', x: 13, y: 48, type: 'active', patients: '85 000+' },
      { name: 'Санкт-Петербург', x: 14, y: 35, type: 'active', patients: '42 000+' },
      { name: 'Новосибирск', x: 46, y: 62, type: 'active', patients: '18 000+' },
      { name: 'Екатеринбург', x: 32, y: 52, type: 'active', patients: '22 000+' },
      { name: 'Казань', x: 25, y: 48, type: 'active', patients: '16 000+' },
      { name: 'Нижний Новгород', x: 20, y: 44, type: 'active', patients: '14 000+' },
      { name: 'Челябинск', x: 31, y: 57, type: 'active', patients: '11 000+' },
      { name: 'Самара', x: 26, y: 56, type: 'active', patients: '10 000+' },
      { name: 'Омск', x: 42, y: 60, type: 'active', patients: '9 000+' },
      { name: 'Ростов-на-Дону', x: 16, y: 65, type: 'active', patients: '12 000+' },
      { name: 'Уфа', x: 28, y: 53, type: 'active', patients: '8 000+' },
      { name: 'Красноярск', x: 52, y: 55, type: 'active', patients: '7 000+' },
      { name: 'Воронеж', x: 14, y: 58, type: 'active', patients: '6 000+' },
      { name: 'Пермь', x: 30, y: 45, type: 'active', patients: '5 000+' },
      { name: 'Волгоград', x: 18, y: 64, type: 'active', patients: '5 000+' },
      { name: 'Краснодар', x: 12, y: 70, type: 'active', patients: '7 000+' },
      { name: 'Тюмень', x: 36, y: 48, type: 'soon', patients: null },
      { name: 'Иркутск', x: 58, y: 63, type: 'soon', patients: null },
      { name: 'Хабаровск', x: 78, y: 58, type: 'soon', patients: null },
      { name: 'Владивосток', x: 80, y: 70, type: 'soon', patients: null },
      { name: 'Калининград', x: 4, y: 38, type: 'soon', patients: null },
      { name: 'Сочи', x: 10, y: 74, type: 'soon', patients: null },
    ];

    this.cities = cityData.map(city => ({
      ...city,
      // Преобразуем проценты в пиксели
      px: (city.x / 100) * this.width,
      py: (city.y / 100) * this.height,
      radius: city.type === 'active' ? 4 : 3,
      pulse: Math.random() * Math.PI * 2,
    }));
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      // Пересчитываем координаты
      this.cities.forEach(city => {
        city.px = (city.x / 100) * this.width;
        city.py = (city.y / 100) * this.height;
      });
    });

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      this.checkHover(mx, my);
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.hoveredCity = null;
    });

    // Сенсорные устройства
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const mx = e.touches[0].clientX - rect.left;
      const my = e.touches[0].clientY - rect.top;
      this.checkHover(mx, my);
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
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 24) {
        this.hoveredCity = city;
        break;
      }
    }

    // Меняем курсор
    this.canvas.style.cursor = this.hoveredCity ? 'pointer' : 'default';
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    this.time += 0.016;

    this.ctx.clearRect(0, 0, this.width, this.height);

    this.drawGrid();
    this.drawConnections();
    this.drawCities();
    this.drawTooltip();
  }

  drawGrid() {
    // Лёгкая сетка для футуристичного вида
    this.ctx.strokeStyle = 'rgba(77, 208, 200, 0.03)';
    this.ctx.lineWidth = 0.5;

    const step = 40;
    for (let x = step; x < this.width; x += step) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }
    for (let y = step; y < this.height; y += step) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }
  }

  drawConnections() {
    // Связи между активными городами
    const activeCities = this.cities.filter(c => c.type === 'active');

    for (let i = 0; i < activeCities.length; i++) {
      for (let j = i + 1; j < activeCities.length; j++) {
        const a = activeCities[i];
        const b = activeCities[j];
        const dx = a.px - b.px;
        const dy = a.py - b.py;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Соединяем только относительно близкие
        if (dist < 180) {
          const opacity = 0.08 * (1 - dist / 180);
          this.ctx.beginPath();
          this.ctx.moveTo(a.px, a.py);
          this.ctx.lineTo(b.px, b.py);
          this.ctx.strokeStyle = `rgba(77, 208, 200, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }
  }

  drawCities() {
    for (const city of this.cities) {
      const isHovered = this.hoveredCity === city;
      const isActive = city.type === 'active';

      // Пульсация
      city.pulse += isActive ? 0.03 : 0.015;
      const pulseScale = 1 + Math.sin(city.pulse) * 0.4;

      // Внешнее свечение
      const glowRadius = isActive ? 16 : 10;
      const glowAlpha = isActive ? 0.25 : 0.12;
      const glowColor = isActive
        ? `rgba(77, 208, 200, ${glowAlpha})`
        : `rgba(45, 157, 146, ${glowAlpha})`;

      const gradient = this.ctx.createRadialGradient(
        city.px, city.py, 0,
        city.px, city.py, glowRadius * (isHovered ? 1.8 : 1)
      );
      gradient.addColorStop(0, glowColor);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      this.ctx.beginPath();
      this.ctx.arc(city.px, city.py, glowRadius * (isHovered ? 1.8 : 1), 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();

      // Точка города
      const radius = city.radius * (isHovered ? 1.8 : 1) * pulseScale;
      this.ctx.beginPath();
      this.ctx.arc(city.px, city.py, radius, 0, Math.PI * 2);

      if (isActive) {
        this.ctx.fillStyle = isHovered ? '#7ce8d5' : '#4dd0c8';
      } else {
        this.ctx.fillStyle = isHovered
          ? 'rgba(45, 157, 146, 0.8)'
          : 'rgba(45, 157, 146, 0.45)';
      }
      this.ctx.fill();

      // Кольцо вокруг ховер-города
      if (isHovered) {
        this.ctx.beginPath();
        this.ctx.arc(city.px, city.py, radius + 8, 0, Math.PI * 2);
        this.ctx.strokeStyle = 'rgba(77, 208, 200, 0.5)';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
      }
    }
  }

  drawTooltip() {
    if (!this.hoveredCity) return;

    const city = this.hoveredCity;
    const tx = city.px;
    const ty = city.py - 28;

    // Фон
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

    // Не выходим за края
    if (boxX < 10) boxX = 10;
    if (boxX + boxWidth > this.width - 10) boxX = this.width - boxWidth - 10;

    // Подложка
    this.ctx.fillStyle = 'rgba(16, 22, 30, 0.95)';
    this.ctx.strokeStyle = 'rgba(77, 208, 200, 0.5)';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 6);
    this.ctx.fill();
    this.ctx.stroke();

    // Текст
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