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