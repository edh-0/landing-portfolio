/**
 * Luxury Auto Spa — главный модуль инициализации
 */

import { ParallaxGlare } from './parallax-glare.js';
import { BeforeAfter } from './before-after.js';
import { Calculator } from './calculator.js';

document.addEventListener('DOMContentLoaded', () => {
  // Параллакс-блик в hero
  const heroGlare = document.getElementById('hero-glare');
  const heroImage = document.getElementById('hero-image');
  if (heroGlare && heroImage) {
    new ParallaxGlare(heroGlare, heroImage);
  }

  // Слайдер «до/после»
  const beforeAfterContainer = document.getElementById('before-after');
  const beforePane = document.getElementById('before-pane');
  const handle = document.getElementById('before-after-handle');
  if (beforeAfterContainer && beforePane && handle) {
    new BeforeAfter(beforeAfterContainer, beforePane, handle);
  }

  // Калькулятор
  const brandSelect = document.getElementById('car-brand');
  const classSelect = document.getElementById('car-class');
  const serviceSelect = document.getElementById('service-type');
  const priceEl = document.getElementById('calc-price');
  const detailsEl = document.getElementById('calc-details');
  if (brandSelect && classSelect && serviceSelect && priceEl && detailsEl) {
    new Calculator(brandSelect, classSelect, serviceSelect, priceEl, detailsEl);
  }

  // Бургер-меню
  const burgerBtn = document.getElementById('burger-btn');
  const headerNav = document.querySelector('.header__nav');

  if (burgerBtn && headerNav) {
    burgerBtn.addEventListener('click', () => {
      const isOpen = headerNav.classList.toggle('header__nav--open');
      burgerBtn.setAttribute('aria-expanded', isOpen);

      const spans = burgerBtn.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.header__nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (headerNav.classList.contains('header__nav--open')) {
          headerNav.classList.remove('header__nav--open');
          burgerBtn.setAttribute('aria-expanded', 'false');
          const spans = burgerBtn.querySelectorAll('span');
          spans[0].style.transform = '';
          spans[1].style.opacity = '';
          spans[2].style.transform = '';
        }
      });
    });
  }

  // Изменение прозрачности шапки при скролле
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.style.background = 'rgba(8, 8, 8, 0.95)';
      } else {
        header.style.background = 'rgba(8, 8, 8, 0.85)';
      }
    }, { passive: true });
  }

  // Попап
  const popup = document.getElementById('popup');
  const popupClose = document.getElementById('popup-close');
  const popupOverlay = popup?.querySelector('.popup__overlay');

  function openPopup() {
    popup?.classList.add('popup--visible');
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    popup?.classList.remove('popup--visible');
    document.body.style.overflow = '';
  }

  popupClose?.addEventListener('click', closePopup);
  popupOverlay?.addEventListener('click', closePopup);

  // Закрытие по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup?.classList.contains('popup--visible')) {
      closePopup();
    }
  });

  // Форма обратной связи
  const contactsForm = document.getElementById('contacts-form');
  contactsForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Проверяем валидность
    const inputs = contactsForm.querySelectorAll('[required]');
    let allValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        allValid = false;
        input.style.borderColor = 'rgba(255, 70, 70, 0.5)';
        input.style.transition = 'border-color 0.2s ease';

        setTimeout(() => {
          input.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        }, 1500);
      }
    });

    if (!allValid) return;

    // Имитация отправки
    const submitBtn = contactsForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      contactsForm.reset();
      openPopup();
    }, 800);
  });

  // Анимация появления секций при скролле
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.service-card, .review-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
});