/**
 * Calculator — калькулятор стоимости детейлинга
 */

export class Calculator {
  constructor(brandSelect, classSelect, serviceSelect, priceEl, detailsEl) {
    this.brandSelect = brandSelect;
    this.classSelect = classSelect;
    this.serviceSelect = serviceSelect;
    this.priceEl = priceEl;
    this.detailsEl = detailsEl;

    // Базовая стоимость услуг
    this.prices = {
      wash: 35,
      polish: 120,
      ceramic: 250,
      interior: 90,
      full: 450,
    };

    // Мультипликаторы по классу
    this.classMultipliers = {
      sedan: 1,
      suv: 1.3,
      coupe: 1.1,
      sport: 1.5,
      premium: 1.4,
    };

    // Мультипликаторы по марке
    this.brandMultipliers = {
      bmw: 1,
      mercedes: 1.05,
      audi: 0.95,
      porsche: 1.3,
      lexus: 1.1,
      tesla: 1.15,
      other: 0.9,
    };

    // Названия для отображения
    this.serviceNames = {
      wash: 'Premium Wash',
      polish: 'Paint Polishing',
      ceramic: 'Ceramic Coating',
      interior: 'Interior Detailing',
      full: 'Full Detailing',
    };

    this.classNames = {
      sedan: 'Sedan',
      suv: 'SUV',
      coupe: 'Coupe',
      sport: 'Sports car',
      premium: 'Executive',
    };

    this.brandNames = {
      bmw: 'BMW',
      mercedes: 'Mercedes-Benz',
      audi: 'Audi',
      porsche: 'Porsche',
      lexus: 'Lexus',
      tesla: 'Tesla',
      other: 'Другая',
    };

    this.init();
  }

  init() {
    this.brandSelect.addEventListener('change', () => this.calculate());
    this.classSelect.addEventListener('change', () => this.calculate());
    this.serviceSelect.addEventListener('change', () => this.calculate());
  }

  calculate() {
    const brand = this.brandSelect.value;
    const carClass = this.classSelect.value;
    const service = this.serviceSelect.value;

    if (!brand || !carClass || !service) {
      this.priceEl.textContent = '— ₽';
      this.detailsEl.innerHTML = '<span class="calculator__result-detail">Выберите параметры для расчёта</span>';
      return;
    }

    const basePrice = this.prices[service] || 0;
    const brandMult = this.brandMultipliers[brand] || 1;
    const classMult = this.classMultipliers[carClass] || 1;

    const total = Math.round(basePrice * brandMult * classMult);

    // Анимируем цену
    this.animatePrice(total);

    // Детали
    const detailLines = [
      `<span class="calculator__result-detail"><span>Услуга</span><span>${this.serviceNames[service]}</span></span>`,
      `<span class="calculator__result-detail"><span>Марка</span><span>${this.brandNames[brand]}</span></span>`,
      `<span class="calculator__result-detail"><span>Класс</span><span>${this.classNames[carClass]}</span></span>`,
      `<span class="calculator__result-detail"><span>Коэффициент</span><span>×${(brandMult * classMult).toFixed(2)}</span></span>`,
    ];

    this.detailsEl.innerHTML = detailLines.join('');
  }

  animatePrice(target) {
    const currentText = this.priceEl.textContent.replace(/[^\d]/g, '');
    const current = parseInt(currentText) || 0;
    const diff = target - current;
    const duration = 400;
    const start = performance.now();

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(current + diff * eased);

      this.priceEl.textContent = this.formatPrice(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  formatPrice(value) {
    return value.toLocaleString('en-US') + ' $';
  }
}