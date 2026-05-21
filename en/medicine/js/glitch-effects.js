// Глитч-эффекты для карточек и текста

/**
 * GlitchEffects — глитч-эффект для карточек тарифов
 * При наведении: случайные RGB-сдвиги, мерцание текста
 */

export class GlitchEffects {
  constructor(elements) {
    this.elements = elements;
    this.init();
  }

  init() {
    this.elements.forEach(card => {
      // Создаём дубликаты слоёв для глитча
      const inner = card.querySelector('.tariff-card__inner');
      if (!inner) return;

      // Клонируем inner дважды для RGB-сдвига
      const clone1 = inner.cloneNode(true);
      const clone2 = inner.cloneNode(true);

      clone1.classList.add('glitch-layer', 'glitch-layer--red');
      clone2.classList.add('glitch-layer', 'glitch-layer--blue');

      // Прячем клоны изначально
      clone1.style.opacity = '0';
      clone2.style.opacity = '0';

      card.appendChild(clone1);
      card.appendChild(clone2);

      // События наведения
      card.addEventListener('mouseenter', () => this.startGlitch(card, clone1, clone2));
      card.addEventListener('mouseleave', () => this.stopGlitch(card, clone1, clone2));
    });
  }

    startGlitch(card, clone1, clone2) {
    const inner = card.querySelector('.tariff-card__inner:not(.glitch-layer)');
    if (inner) inner.style.opacity = '0';

    clone1.style.opacity = '1';
    clone2.style.opacity = '1';

    // Добавляем класс для мерцания box-shadow
    card.classList.add('tariff-card--glitching');

    card._glitchInterval = setInterval(() => {
        this.applyShift(clone1, clone2);
    }, 80);

    this.applyShift(clone1, clone2);
    }

    stopGlitch(card, clone1, clone2) {
    if (card._glitchInterval) {
        clearInterval(card._glitchInterval);
        card._glitchInterval = null;
    }

    // Убираем класс мерцания
    card.classList.remove('tariff-card--glitching');

    const inner = card.querySelector('.tariff-card__inner:not(.glitch-layer)');
    if (inner) inner.style.opacity = '1';

    clone1.style.opacity = '0';
    clone2.style.opacity = '0';

    clone1.style.transform = 'translate(0, 0)';
    clone2.style.transform = 'translate(0, 0)';
    clone1.style.clipPath = 'inset(0 0 0 0)';
    clone2.style.clipPath = 'inset(0 0 0 0)';
    }

  applyShift(clone1, clone2) {
    // Случайное смещение по X и Y
    const shiftX1 = (Math.random() - 0.5) * 6;
    const shiftY1 = (Math.random() - 0.5) * 4;
    const shiftX2 = (Math.random() - 0.5) * 6;
    const shiftY2 = (Math.random() - 0.5) * 4;

    // Случайные полосы (clipPath)
    const slices = this.generateSlices();

    clone1.style.transform = `translate(${shiftX1}px, ${shiftY1}px)`;
    clone1.style.clipPath = slices.red;

    clone2.style.transform = `translate(${shiftX2}px, ${shiftY2}px)`;
    clone2.style.clipPath = slices.blue;
  }

  generateSlices() {
    // Генерируем 3-5 горизонтальных полос
    const count = Math.floor(Math.random() * 3) + 3;
    const slices = [];
    let currentY = 0;

    for (let i = 0; i < count; i++) {
      const height = Math.random() * 15 + 5;
      slices.push({
        top: currentY,
        bottom: currentY + height,
      });
      currentY += height + Math.random() * 10;
    }

    // Формируем clip-path строки
    const redSlices = slices.map(s => `${s.top}% ${s.bottom}%`).join(', ');
    const blueSlices = slices.map(s => `${s.top}% ${s.bottom}%`).join(', ');

    // Для красного слоя — смещённые полосы
    const redClip = slices.length > 0
      ? `inset(${slices[0].top}% 0 ${100 - slices[slices.length - 1].bottom}% 0)`
      : 'inset(0 0 0 0)';

    const blueClip = slices.length > 0
      ? `inset(${slices[0].top}% 0 ${100 - slices[slices.length - 1].bottom}% 0)`
      : 'inset(0 0 0 0)';

    return { red: redClip, blue: blueClip };
  }
}