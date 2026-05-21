/**
 * BeforeAfter — слайдер «до/после» с перетаскиванием
 */

export class BeforeAfter {
  constructor(container, beforePane, handle) {
    this.container = container;
    this.beforePane = beforePane;
    this.handle = handle;
    this.isDragging = false;
    this.position = 50; // процент

    this.init();
  }

  init() {
    this.bindEvents();
    this.updatePosition();
  }

  bindEvents() {
    // Мышь
    this.container.addEventListener('mousedown', (e) => this.startDrag(e));
    window.addEventListener('mousemove', (e) => this.onDrag(e));
    window.addEventListener('mouseup', () => this.stopDrag());

    // Сенсор
    this.container.addEventListener('touchstart', (e) => this.startDrag(e));
    window.addEventListener('touchmove', (e) => this.onDrag(e));
    window.addEventListener('touchend', () => this.stopDrag());
  }

  startDrag(e) {
    this.isDragging = true;
    this.container.style.cursor = 'ew-resize';

    // Сразу обновляем позицию
    this.updateFromEvent(e);
  }

  onDrag(e) {
    if (!this.isDragging) return;
    this.updateFromEvent(e);
  }

  stopDrag() {
    this.isDragging = false;
    this.container.style.cursor = 'ew-resize';
  }

  updateFromEvent(e) {
    const rect = this.container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let percent = ((clientX - rect.left) / rect.width) * 100;

    // Ограничиваем диапазон
    percent = Math.max(5, Math.min(95, percent));
    this.position = percent;
    this.updatePosition();
  }

  updatePosition() {
    this.beforePane.style.clipPath = `inset(0 ${100 - this.position}% 0 0)`;
    this.handle.style.left = this.position + '%';
  }
}