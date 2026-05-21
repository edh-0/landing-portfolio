/**
 * ParallaxGlare — параллакс-блик на фоновом изображении
 * При движении мыши: двигается световой блик + фото немного смещается
 */

export class ParallaxGlare {
  constructor(glareEl, imageEl) {
    this.glare = glareEl;
    this.image = imageEl;
    this.bounds = null;

    this.init();
  }

  init() {
    this.updateBounds();
    this.bindEvents();
  }

  updateBounds() {
    this.bounds = this.glare.parentElement.getBoundingClientRect();
  }

  bindEvents() {
    window.addEventListener('resize', () => this.updateBounds());

    document.addEventListener('mousemove', (e) => {
      this.updateBounds();

      // Позиция мыши относительно hero-секции (0..1)
      const x = (e.clientX - this.bounds.left) / this.bounds.width;
      const y = (e.clientY - this.bounds.top) / this.bounds.height;

      // Блик следует за мышью с небольшим отставанием
      const glareX = 20 + x * 60; // процент от ширины
      const glareY = 20 + y * 60;

      this.glare.style.setProperty('--glare-x', glareX + '%');
      this.glare.style.setProperty('--glare-y', glareY + '%');

      // Фото немного смещается в противоположную сторону (параллакс)
      const moveX = (x - 0.5) * -12; // px
      const moveY = (y - 0.5) * -8;
      this.image.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    });

    // Сенсорные устройства
    document.addEventListener('touchmove', (e) => {
      if (!e.touches.length) return;
      this.updateBounds();

      const x = (e.touches[0].clientX - this.bounds.left) / this.bounds.width;
      const y = (e.touches[0].clientY - this.bounds.top) / this.bounds.height;

      const glareX = 20 + x * 60;
      const glareY = 20 + y * 60;

      this.glare.style.setProperty('--glare-x', glareX + '%');
      this.glare.style.setProperty('--glare-y', glareY + '%');

      const moveX = (x - 0.5) * -12;
      const moveY = (y - 0.5) * -8;
      this.image.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    }, { passive: true });
  }
}