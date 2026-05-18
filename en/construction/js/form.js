export function initForm() {
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
}