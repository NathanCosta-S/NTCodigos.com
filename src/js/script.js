// src/js/index.js

let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showNextSlide() {
  slideIndex++;

  if (slideIndex >= totalSlides) {
    slideIndex = 0;
  }

  const slideWidth = slides[0].clientWidth;
  const slidesContainer = document.getElementById('slides');
  slidesContainer.style.transform = `translateX(-${slideWidth * slideIndex}px)`;
}

// Trocar a cada 3 segundos (3000ms)
setInterval(showNextSlide, 3000);



document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");

    function checkSections() {
        const triggerBottom = window.innerHeight * 1; // Pode ajustar 0.85 para mais cedo ou mais tarde aparecer

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < triggerBottom) {
                section.classList.add("visible");
            } else {
                section.classList.remove("visible");
            }
        });
    }

    window.addEventListener("scroll", checkSections);
    checkSections(); // Executa logo que carregar
});

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('nav.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuToggle.classList.toggle('active');
});


document.addEventListener('DOMContentLoaded', function () {
    var whatsappLink = document.getElementById('whatsapp');

    whatsappLink.addEventListener('click', function (event) {
        const larguraJanela = window.innerWidth;

        if (larguraJanela < 768) {
            window.open('https://wa.me/5514996450887', '_blank');
        } else {
            window.open('https://web.whatsapp.com/send?phone=5514996450887', '_blank');
        }
    });
});