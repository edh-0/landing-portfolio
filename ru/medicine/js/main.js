/**
 * MedFuture — главный модуль инициализации
 */

import { HeroMolecules } from './hero-molecules.js';
import { AppSimulation } from './app-simulation.js';
import { CoverageMap } from './coverage-map.js';
import { GlitchEffects } from './glitch-effects.js';
import { SecurityVisual } from './security-visual.js';

document.addEventListener('DOMContentLoaded', () => {
  // Молекулы на фоне hero
  const heroCanvas = document.getElementById('hero-canvas');
  if (heroCanvas) {
    new HeroMolecules(heroCanvas);
  }

  // Симуляция интерфейса приложения
  const appScreen = document.getElementById('app-screen');
  const appSteps = document.getElementById('app-steps');
  if (appScreen && appSteps) {
    new AppSimulation(appScreen, appSteps);
  }

  // Интерактивная карта охвата
  const coverageMap = document.getElementById('coverage-map');
  if (coverageMap) {
    new CoverageMap(coverageMap);
  }

  // Глитч-эффекты на карточках тарифов
  const glitchCards = document.querySelectorAll('[data-glitch]');
  if (glitchCards.length) {
    new GlitchEffects(glitchCards);
  }

  // Бургер-меню
  const burgerBtn = document.getElementById('burger-btn');
  const headerNav = document.querySelector('.header__nav');

  if (burgerBtn && headerNav) {
    burgerBtn.addEventListener('click', () => {
      const isOpen = headerNav.classList.toggle('header__nav--open');
      burgerBtn.setAttribute('aria-expanded', isOpen);

      // Анимация бургера в крестик
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

    // Закрытие меню при клике на ссылку (мобильные)
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
        header.style.background = 'rgba(10, 14, 20, 0.95)';
      } else {
        header.style.background = 'rgba(10, 14, 20, 0.85)';
      }
    }, { passive: true });
  }

  const securityContainer = document.getElementById('security-canvas-container');
    if (securityContainer) {
        new SecurityVisual(securityContainer);
    }

});