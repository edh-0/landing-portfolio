// Симуляция интерфейса приложения

/**
 * AppSimulation — симуляция интерфейса приложения
 * Три шага с анимацией перехода между экранами
 */

export class AppSimulation {
  constructor(screenEl, stepsEl) {
    this.screen = screenEl;
    this.stepsContainer = stepsEl;
    this.stepButtons = stepsEl.querySelectorAll('.app-step');
    this.currentStep = 0;
    this.isAnimating = false;

    // Контент для каждого шага
    this.screens = [
      this.renderStep0,
      this.renderStep1,
      this.renderStep2,
    ];

    this.init();
  }

  init() {
    // Клики по шагам
    this.stepButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => this.goToStep(index));
    });

    // Отображаем первый шаг
    this.renderScreen(0);
  }

  goToStep(index) {
    if (index === this.currentStep || this.isAnimating) return;

    this.isAnimating = true;

    // Обновляем активный класс у кнопок
    this.stepButtons.forEach(btn => btn.classList.remove('active'));
    this.stepButtons[index].classList.add('active');

    // Анимация ухода текущего экрана
    this.screen.style.opacity = '0';
    this.screen.style.transform = 'translateY(8px)';
    this.screen.style.transition = 'opacity 200ms ease, transform 200ms ease';

    setTimeout(() => {
      this.renderScreen(index);
      this.screen.style.opacity = '1';
      this.screen.style.transform = 'translateY(0)';

      setTimeout(() => {
        this.isAnimating = false;
        this.currentStep = index;
      }, 200);
    }, 200);
  }

  renderScreen(index) {
    this.screen.innerHTML = '';
    this.screens[index].call(this);
  }

  /* ======== Шаг 1: Выберите симптом ======== */
  renderStep0() {
    this.screen.innerHTML = `
      <div class="app-screen__header">
        <span class="app-screen__time">9:41</span>
        <span class="app-screen__title">MedFuture</span>
      </div>
      <div class="app-screen__body">
        <h4 class="app-screen__question">Что вас беспокоит?</h4>
        <div class="app-screen__symptoms">
          <button class="app-symptom">
            <span class="app-symptom__icon">🤒</span>
            <span>Температура</span>
          </button>
          <button class="app-symptom">
            <span class="app-symptom__icon">🤧</span>
            <span>Насморк</span>
          </button>
          <button class="app-symptom">
            <span class="app-symptom__icon">😮‍💨</span>
            <span>Кашель</span>
          </button>
          <button class="app-symptom">
            <span class="app-symptom__icon">🤕</span>
            <span>Головная боль</span>
          </button>
          <button class="app-symptom">
            <span class="app-symptom__icon">😴</span>
            <span>Усталость</span>
          </button>
          <button class="app-symptom">
            <span class="app-symptom__icon">🤢</span>
            <span>Тошнота</span>
          </button>
        </div>
        <div class="app-screen__custom">
          <input type="text" placeholder="Или опишите своими словами..." class="app-screen__input" />
        </div>
      </div>
      <button class="app-screen__next-btn">Далее →</button>
    `;

    // Имитация выбора симптома
    const symptomBtns = this.screen.querySelectorAll('.app-symptom');
    symptomBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        symptomBtns.forEach(b => b.classList.remove('app-symptom--selected'));
        btn.classList.add('app-symptom--selected');
      });
    });

    // Кнопка «Далее» переводит на следующий шаг
    const nextBtn = this.screen.querySelector('.app-screen__next-btn');
    nextBtn.addEventListener('click', () => this.goToStep(1));
  }

  /* ======== Шаг 2: ИИ-анализ ======== */
  renderStep1() {
    this.screen.innerHTML = `
      <div class="app-screen__header">
        <span class="app-screen__time">9:41</span>
        <span class="app-screen__title">Анализ</span>
      </div>
      <div class="app-screen__body app-screen__body--center">
        <div class="app-screen__ai-ring" id="ai-ring">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(77, 208, 200, 0.15)" stroke-width="3"/>
            <circle cx="40" cy="40" r="34" fill="none" stroke="#4dd0c8" stroke-width="3"
                    stroke-dasharray="213.6" stroke-dashoffset="213.6"
                    stroke-linecap="round" id="ai-ring-circle"/>
          </svg>
          <span class="app-screen__ai-icon">🧬</span>
        </div>
        <div class="app-screen__ai-text" id="ai-text">
          <span>Анализируем симптомы...</span>
        </div>
        <div class="app-screen__ai-progress">
          <div class="app-screen__ai-bar" id="ai-bar"></div>
        </div>
      </div>
    `;

    // Анимация кольца и прогресс-бара
    const circle = this.screen.querySelector('#ai-ring-circle');
    const bar = this.screen.querySelector('#ai-bar');
    const text = this.screen.querySelector('#ai-text span');
    const circumference = 2 * Math.PI * 34;

    let progress = 0;
    const messages = [
      'Анализируем симптомы...',
      'Сверяем с базой знаний...',
      'Формируем предварительный диагноз...',
      'Подбираем врача...',
    ];

    const interval = setInterval(() => {
      progress += Math.random() * 10 + 2;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        // Завершение — автоматический переход
        text.textContent = 'Готово! Врач найден';
        setTimeout(() => this.goToStep(2), 800);
      }

      const offset = circumference - (circumference * progress) / 100;
      circle.style.strokeDashoffset = offset;
      bar.style.width = progress + '%';

      // Меняем текст на разных этапах
      const msgIndex = Math.min(
        Math.floor(progress / 25),
        messages.length - 1
      );
      text.textContent = messages[msgIndex];
    }, 400);
  }

  /* ======== Шаг 3: Связь с врачом ======== */
  renderStep2() {
    this.screen.innerHTML = `
      <div class="app-screen__header">
        <span class="app-screen__time">9:41</span>
        <span class="app-screen__title">Врач онлайн</span>
      </div>
      <div class="app-screen__body app-screen__body--center">
        <div class="app-screen__doctor">
          <div class="app-screen__doctor-avatar">
            <span>👩‍⚕️</span>
            <div class="app-screen__doctor-status"></div>
          </div>
          <h4 class="app-screen__doctor-name">Елена Петрова</h4>
          <p class="app-screen__doctor-spec">Терапевт, стаж 12 лет</p>
          <div class="app-screen__doctor-rating">★ 4.9</div>
        </div>
        <div class="app-screen__call-info">
          <span>Ожидание менее 1 минуты</span>
        </div>
      </div>
      <div class="app-screen__actions">
        <button class="app-screen__call-btn app-screen__call-btn--video">
          <span>📹</span> Видеозвонок
        </button>
        <button class="app-screen__call-btn app-screen__call-btn--chat">
          <span>💬</span> Чат
        </button>
      </div>
    `;

    // Пульсация статуса врача
    const status = this.screen.querySelector('.app-screen__doctor-status');
    if (status) {
      status.style.animation = 'pulse-status 2s infinite';
    }
  }
}