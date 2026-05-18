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

// ===== STEPS NUMBER HIGHLIGHT =====
const stepNumbers = document.querySelectorAll('.step-number');
let stepIndex = 0;

function highlightStep() {
    stepNumbers.forEach(num => num.classList.remove('active'));
    stepNumbers[stepIndex].classList.add('active');
    stepIndex = (stepIndex + 1) % stepNumbers.length;
}

highlightStep();
setInterval(highlightStep, 1500);

// ===== SERVICES SWITCHING =====
const serviceData = {
    plumbing: {
        title: 'Plumbing',
        items: [
            'Replacement of pipes in bathroom and toilet',
            'Replacement of pipes in bathroom',
            'Replacement of pipes with plastic ones',
            'PVC pipe installation',
            'Radiator replacement and dismantling',
            'Meter relocation and installation',
            'Water supply installation and repair',
            'Heating installation',
            'Sewerage installation',
            'Towel rail replacement and relocation',
            'Installation of taps on towel rail',
            'Installation of concealed cisterns',
            'Installation of all types of sanitary equipment',
            'Replacement of heating batteries'
        ]
    },
    finishing: {
        title: 'Finishing Works',
        items: [
            'Electrical and plumbing work',
            'Dismantling work',
            'Plastering work',
            'Painting work',
            'Drywall installation',
            'Wall and ceiling cladding',
            'Tile laying',
            'Installation of all types of flooring'
        ]
    },
    building: {
        title: 'House Construction',
        items: [
            'Professional laying of PGS blocks',
            'Bricklaying',
            'Laying of tongue-and-groove slabs',
            'Slab installation',
            'Floor slab installation',
            'Installation of beams and lintels',
            'Monolithic floor construction',
            'Partition installation',
            'Installation of ventilation ducts',
            'Roofing work of any complexity'
        ]
    },
    electrical: {
        title: 'Electrical',
        items: [
            'Replacement of sockets and switches',
            'Relocation of sockets and switches',
            'Rewiring',
            'Electrical meter assembly',
            'Electrical meter installation'
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

// ===== PRICE LIST SWITCHING =====
const priceData = {
    finishing: {
        title: 'Finishing',
        rows: [
            ['Beacon plastering', 'm²', '10'],
            ['Beacon installation and removal', 'm²', '2'],
            ['Ceiling plastering (flat)', 'm²', '5'],
            ['Reinforcing mesh installation', 'm²', '2'],
            ['Drywall installation (flat)', 'm²', '10'],
            ['Drywall box construction', 'lin.m', '12'],
            ['Drywall with concealed lighting', 'lin.m', '12'],
            ['Curved ceiling slope installation', 'lin.m', '12'],
            ['Final ceiling sanding and cleaning', 'm²', '4'],
            ['Joint taping (serpyanka)', 'lin.m', '3'],
            ['Suspended ceiling "Grilyato"', 'm²', '10'],
            ['Suspended ceiling "Armstrong"', 'm²', '8'],
            ['Plastic ceiling panels', 'm²', '10'],
            ['Stretch ceiling (material included)', 'm²', '16'],
            ['Decorative cornice (galtel) installation', 'lin.m', '4'],
            ['Drywall box prep for painting', 'm²', '5'],
            ['Beam leveling (single plane)', 'lin.m', '5']
        ]
    },
    building: {
        title: 'Construction',
        rows: [
            ['PGS block laying', 'm²', '15'],
            ['Bricklaying', 'm²', '18'],
            ['Tongue-and-groove slab laying', 'm²', '12'],
            ['Floor slab installation', 'pcs', '50'],
            ['Beam and lintel installation', 'lin.m', '20'],
            ['Monolithic floor construction', 'm²', '25'],
            ['Partition installation', 'm²', '14'],
            ['Ventilation duct installation', 'lin.m', '18']
        ]
    },
    roofing: {
        title: 'Roofing',
        rows: [
            ['Metal tile installation', 'm²', '14'],
            ['Soft roofing installation', 'm²', '16'],
            ['Profiled sheet installation', 'm²', '10'],
            ['Gutter system installation', 'lin.m', '8'],
            ['Vapor barrier installation', 'm²', '3'],
            ['Insulation installation', 'm²', '5'],
            ['Skylight installation', 'pcs', '40']
        ]
    },
    plumbing: {
        title: 'Plumbing',
        rows: [
            ['Bathroom pipe replacement', 'job', '50'],
            ['PVC pipe installation', 'lin.m', '8'],
            ['Radiator replacement', 'pcs', '30'],
            ['Meter installation', 'pcs', '15'],
            ['Water supply installation', 'point', '25'],
            ['Sewerage installation', 'point', '30'],
            ['Concealed cistern installation', 'pcs', '40'],
            ['Sanitary equipment installation', 'pcs', '20']
        ]
    },
    electrical: {
        title: 'Electrical',
        rows: [
            ['Socket and switch replacement', 'pcs', '5'],
            ['Socket relocation', 'pcs', '8'],
            ['Rewiring', 'm²', '6'],
            ['Electrical panel assembly', 'pcs', '40'],
            ['Electric meter installation', 'pcs', '25'],
            ['Cable laying', 'lin.m', '3'],
            ['Light fixture installation', 'pcs', '8']
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

        // Match English tab names to category keys
        const categoryMap = {
            'Finishing': 'finishing',
            'Construction': 'building',
            'Roofing': 'roofing',
            'Plumbing': 'plumbing',
            'Electrical': 'electrical'
        };

        showPriceTab(categoryMap[this.textContent.trim()]);
    });
});

// ===== FORM VALIDATION =====
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

    // Name validation
    if (formName.value.trim() === '') {
        showError(formName);
        isValid = false;
    } else {
        clearError(formName);
    }

    // Phone validation
    const phoneValue = formPhone.value.trim();
    const phoneRegex = /^\+?\d{7,15}$/;
    if (phoneValue === '' || !phoneRegex.test(phoneValue.replace(/[\s\-\(\)]/g, ''))) {
        showError(formPhone);
        isValid = false;
    } else {
        clearError(formPhone);
    }

    // Message validation
    if (formTextarea.value.trim() === '') {
        showError(formTextarea);
        isValid = false;
    } else {
        clearError(formTextarea);
    }

    // Checkbox validation
    if (!formCheckbox.checked) {
        checkmark.classList.add('checkmark--error');
        isValid = false;
    } else {
        checkmark.classList.remove('checkmark--error');
    }

    if (isValid) {
        alert('Form submitted!');
        contactForm.reset();
        formCheckbox.checked = true;
    }
});

// Clear errors on input
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

// ===== GALLERY LIGHTBOX =====
const galleryData = {
    tiles: {
        title: 'Tiles',
        images: [
            'img/gallery-tiles.jpg',
            'img/gallery-tiles-2.jpg',
            'img/gallery-tiles-3.jpg',
            'img/gallery-tiles-4.jpg'
        ]
    },
    masonry: {
        title: 'Masonry',
        images: [
            'img/gallery-masonry.jpg',
            'img/gallery-masonry-2.jpg',
            'img/gallery-masonry-3.jpg',
            'img/gallery-masonry-4.jpg'
        ]
    },
    finishing: {
        title: 'Finishing',
        images: [
            'img/gallery-finishing.jpg',
            'img/gallery-finishing-2.jpg',
            'img/gallery-finishing-3.jpg',
            'img/gallery-finishing-4.jpg'
        ]
    },
    roof: {
        title: 'Roof',
        images: [
            'img/gallery-roof.jpg',
            'img/gallery-roof-2.jpg',
            'img/gallery-roof-3.jpg',
            'img/gallery-roof-4.jpg'
        ]
    },
    plumbing: {
        title: 'Plumbing',
        images: [
            'img/gallery-plumbing.jpg',
            'img/gallery-plumbing-2.jpg',
            'img/gallery-plumbing-3.jpg',
            'img/gallery-plumbing-4.jpg'
        ]
    },
    electrical: {
        title: 'Electrical',
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

    // Close on overlay click
    lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);

    // Close on button click
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

    // Close on Escape
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

// ===== BURGER MENU =====
const burger = document.querySelector('.burger');
const headerRight = document.querySelector('.header-right');
const navLinks = document.querySelectorAll('.nav a');

burger.addEventListener('click', function() {
    this.classList.toggle('burger--open');
    headerRight.classList.toggle('header-right--open');
    document.body.style.overflow = headerRight.classList.contains('header-right--open') ? 'hidden' : '';
});

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        burger.classList.remove('burger--open');
        headerRight.classList.remove('header-right--open');
        document.body.style.overflow = '';
    });
});