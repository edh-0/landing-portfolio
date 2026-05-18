document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slides img');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-arrow--prev');
    const nextBtn = document.querySelector('.slider-arrow--next');
    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        showSlide((currentSlide + 1) % totalSlides);
    }

    function prevSlide() {
        showSlide((currentSlide - 1 + totalSlides) % totalSlides);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            showSlide(parseInt(this.dataset.slide));
        });
    });

    setInterval(nextSlide, 3000);
});

// ===== ПОДСВЕТКА НОМЕРОВ STEPS =====
const stepNumbers = document.querySelectorAll('.step-number');
let stepIndex = 0;

function highlightStep() {
    stepNumbers.forEach(num => num.classList.remove('active'));
    stepNumbers[stepIndex].classList.add('active');
    stepIndex = (stepIndex + 1) % stepNumbers.length;
}

highlightStep();
setInterval(highlightStep, 1500);

// ===== ПЕРЕКЛЮЧЕНИЕ УСЛУГ =====
const serviceData = {
    plumbing: {
        title: 'Сантехника',
        items: [
            'Замена труб в ванной и туалете',
            'Замена труб в ванной',
            'Замена труб на пластиковые',
            'Монтаж трубопроводов ПВХ',
            'Замена и демонтаж радиатора отопления',
            'Перенос и установка счётчиков',
            'Монтаж и ремонт водопровода',
            'Монтаж отопления',
            'Монтаж канализации',
            'Замена и перенос полотенцесушителя',
            'Установка кранов на полотенцесушитель',
            'Установка инсталляций',
            'Установка всех видов сантехнического оборудования',
            'Замена батарей отопления'
        ]
    },
    finishing: {
        title: 'Отделочные работы',
        items: [
            'Электромонтажные и сантехнические работы',
            'Демонтажные работы',
            'Штукатурные работы',
            'Малярные работы',
            'Монтаж ГКЛ',
            'Облицовка стен и потолков',
            'Укладка плитки',
            'Укладка всех видов напольных покрытий'
        ]
    },
    building: {
        title: 'Строительство домов',
        items: [
            'Профессиональная укладка блоков ПГС',
            'Укладка кирпича',
            'Укладка пазогребневых плит',
            'Монтаж плит',
            'Монтаж перекрытий',
            'Монтаж балок и перемычек',
            'Изготовление монолитного пола',
            'Установка перегородок',
            'Установка вентиляционных каналов',
            'Кровельные работы любой сложности'
        ]
    },
    electrical: {
        title: 'Электрика',
        items: [
            'Замена розеток и выключателей',
            'Перенос розеток и выключателей',
            'Замена электропроводки',
            'Сборка электросчётчиков',
            'Установка электросчётчиков'
        ]
    }
};

const serviceTabs = document.querySelectorAll('.service-tab');
const serviceDetail = document.getElementById('service-detail');

function showService(serviceId) {
    const data = serviceData[serviceId];
    serviceDetail.innerHTML = `
        <h3>${data.title}</h3>
        <ul>
            ${data.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
}

serviceTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        serviceTabs.forEach(t => t.classList.remove('service-tab--active'));
        this.classList.add('service-tab--active');
        showService(this.dataset.service);
    });
});

showService('plumbing');

// ===== ПЕРЕКЛЮЧЕНИЕ ПРАЙС-ЛИСТА =====
const priceData = {
    finishing: {
        title: 'Отделка',
        rows: [
            ['Штукатурка по маякам', 'м²', '10'],
            ['Установка и демонтаж маяка', 'м²', '2'],
            ['Штукатурка потолка по плоскости', 'м²', '5'],
            ['Монтаж армирующей сетки', 'м²', '2'],
            ['Монтаж ГКЛ (ровный)', 'м²', '10'],
            ['Монтаж конструкций ГКЛ короб', 'м.пог', '12'],
            ['Монтаж ГКЛ со скрытой подсветкой', 'м.пог', '12'],
            ['Монтаж криволинейного потолочного откоса', 'м.пог', '12'],
            ['Финишное шлифование и зачистка потолка', 'м²', '4'],
            ['Проклейка швов серпянкой', 'м.пог', '3'],
            ['Монтаж подвесного потолка «Грильято»', 'м²', '10'],
            ['Монтаж подвесного потолка «Армстронг»', 'м²', '8'],
            ['Монтаж пластиковых панелей на потолке', 'м²', '10'],
            ['Монтаж натяжного потолка (с материалом)', 'м²', '16'],
            ['Поклейка декоративного багета (галтель)', 'м.пог', '4'],
            ['Подготовка короба ГКЛ к покраске', 'м²', '5'],
            ['Выравнивание балок одна плоскость', 'м.пог', '5']
        ]
    },
    building: {
        title: 'Строительство',
        rows: [
            ['Укладка блоков ПГС', 'м²', '15'],
            ['Укладка кирпича', 'м²', '18'],
            ['Укладка пазогребневых плит', 'м²', '12'],
            ['Монтаж плит перекрытия', 'шт', '50'],
            ['Монтаж балок и перемычек', 'м.пог', '20'],
            ['Изготовление монолитного пола', 'м²', '25'],
            ['Установка перегородок', 'м²', '14'],
            ['Установка вентиляционных каналов', 'м.пог', '18']
        ]
    },
    roofing: {
        title: 'Кровля',
        rows: [
            ['Монтаж металлочерепицы', 'м²', '14'],
            ['Монтаж мягкой кровли', 'м²', '16'],
            ['Монтаж профнастила', 'м²', '10'],
            ['Установка водосточной системы', 'м.пог', '8'],
            ['Монтаж пароизоляции', 'м²', '3'],
            ['Монтаж утеплителя', 'м²', '5'],
            ['Установка мансардных окон', 'шт', '40']
        ]
    },
    plumbing: {
        title: 'Сантехника',
        rows: [
            ['Замена труб в ванной', 'усл', '50'],
            ['Монтаж трубопроводов ПВХ', 'м.пог', '8'],
            ['Замена радиатора отопления', 'шт', '30'],
            ['Установка счётчиков', 'шт', '15'],
            ['Монтаж водопровода', 'точка', '25'],
            ['Монтаж канализации', 'точка', '30'],
            ['Установка инсталляций', 'шт', '40'],
            ['Установка сантехнического оборудования', 'шт', '20']
        ]
    },
    electrical: {
        title: 'Электрика',
        rows: [
            ['Замена розеток и выключателей', 'шт', '5'],
            ['Перенос розеток', 'шт', '8'],
            ['Замена электропроводки', 'м²', '6'],
            ['Сборка электрощитка', 'шт', '40'],
            ['Установка электросчётчика', 'шт', '25'],
            ['Прокладка кабеля', 'м.пог', '3'],
            ['Установка светильников', 'шт', '8']
        ]
    }
};

const priceTabs = document.querySelectorAll('.prices-tab');
const priceTableBody = document.querySelector('.prices-table tbody');

function showPriceTab(category) {
    const data = priceData[category];
    priceTableBody.innerHTML = data.rows.map(row => `
        <tr>
            <td>${row[0]}</td>
            <td>${row[1]}</td>
            <td>${row[2]}</td>
        </tr>
    `).join('');
}

priceTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        priceTabs.forEach(t => t.classList.remove('prices-tab--active'));
        this.classList.add('prices-tab--active');
        
        const categoryMap = {
            'Отделка': 'finishing',
            'Строительство': 'building',
            'Кровля': 'roofing',
            'Сантехника': 'plumbing',
            'Электрика': 'electrical'
        };
        
        showPriceTab(categoryMap[this.textContent]);
    });
});

// ===== ВАЛИДАЦИЯ ФОРМЫ =====
const contactForm = document.querySelector('.contact-form');
const formName = contactForm.querySelector('input[type="text"]');
const formPhone = contactForm.querySelector('input[type="tel"]');
const formTextarea = contactForm.querySelector('textarea');
const formCheckbox = contactForm.querySelector('.form-checkbox input');
const checkmark = contactForm.querySelector('.checkmark');

function showError(element) {
    element.classList.add('input--error');
}

function clearError(element) {
    element.classList.remove('input--error');
}

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    // Проверка имени
    if (formName.value.trim() === '') {
        showError(formName);
        isValid = false;
    } else {
        clearError(formName);
    }
    
    const phoneValue = formPhone.value.trim();
    const phoneRegex = /^\+?\d{7,15}$/;
    if (phoneValue === '' || !phoneRegex.test(phoneValue.replace(/[\s\-\(\)]/g, ''))) {
        showError(formPhone);
        isValid = false;
    } else {
        clearError(formPhone);
    }

    if (formTextarea.value.trim() === '') {
        showError(formTextarea);
        isValid = false;
    } else {
        clearError(formTextarea);
    }
    
    if (!formCheckbox.checked) {
        checkmark.classList.add('checkmark--error');
        isValid = false;
    } else {
        checkmark.classList.remove('checkmark--error');
    }
    
    if (isValid) {
        alert('Форма отправлена!');
        contactForm.reset();
        formCheckbox.checked = true;
    }
});

formName.addEventListener('input', function() {
    if (this.value.trim() !== '') clearError(this);
});

formPhone.addEventListener('input', function() {
    const phoneValue = this.value.trim().replace(/[\s\-\(\)]/g, '');
    const phoneRegex = /^\+?\d{7,15}$/;
    if (phoneValue !== '' && phoneRegex.test(phoneValue)) clearError(this);
});

formTextarea.addEventListener('input', function() {
    if (this.value.trim() !== '') clearError(this);
});

formCheckbox.addEventListener('change', function() {
    if (this.checked) checkmark.classList.remove('checkmark--error');
});

// ===== ЛАЙТБОКС ГАЛЕРЕИ =====
const galleryData = {
    tiles: {
        title: 'Плитка',
        images: [
            'img/gallery-tiles.jpg',
            'img/gallery-tiles-2.jpg',
            'img/gallery-tiles-3.jpg',
            'img/gallery-tiles-4.jpg'
        ]
    },
    masonry: {
        title: 'Кладка',
        images: [
            'img/gallery-masonry.jpg',
            'img/gallery-masonry-2.jpg',
            'img/gallery-masonry-3.jpg',
            'img/gallery-masonry-4.jpg'
        ]
    },
    finishing: {
        title: 'Отделка',
        images: [
            'img/gallery-finishing.jpg',
            'img/gallery-finishing-2.jpg',
            'img/gallery-finishing-3.jpg',
            'img/gallery-finishing-4.jpg'
        ]
    },
    roof: {
        title: 'Кровля',
        images: [
            'img/gallery-roof.jpg',
            'img/gallery-roof-2.jpg',
            'img/gallery-roof-3.jpg',
            'img/gallery-roof-4.jpg'
        ]
    },
    plumbing: {
        title: 'Сантехника',
        images: [
            'img/gallery-plumbing.jpg',
            'img/gallery-plumbing-2.jpg',
            'img/gallery-plumbing-3.jpg',
            'img/gallery-plumbing-4.jpg'
        ]
    },
    electrical: {
        title: 'Электрика',
        images: [
            'img/gallery-electrical.jpg',
            'img/gallery-electrical-2.jpg',
            'img/gallery-electrical-3.jpg',
            'img/gallery-electrical-4.jpg'
        ]
    }
};

const galleryCards = document.querySelectorAll('.gallery-card');
let lightbox = null;

function createLightbox() {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <h3 class="lightbox-title"></h3>
            <div class="lightbox-grid"></div>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Закрытие по клику на оверлей
    lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
    
    // Закрытие по кнопке
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    
    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('lightbox--open')) {
            closeLightbox();
        }
    });
}

function openLightbox(category) {
    if (!lightbox) createLightbox();
    
    const data = galleryData[category];
    
    lightbox.querySelector('.lightbox-title').textContent = data.title;
    
    const grid = lightbox.querySelector('.lightbox-grid');
    grid.innerHTML = data.images.map(img => `
        <div class="lightbox-item">
            <img src="${img}" alt="${data.title}">
        </div>
    `).join('');
    
    lightbox.classList.add('lightbox--open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('lightbox--open');
    document.body.style.overflow = '';
}

galleryCards.forEach(card => {
    card.addEventListener('click', function(e) {
        e.preventDefault();
        const category = this.dataset.category;
        openLightbox(category);
    });
});