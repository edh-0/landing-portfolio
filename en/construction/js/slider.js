export function initSlider() {
    const slides = document.querySelectorAll('.hero-slides img');
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
}