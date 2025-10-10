// ===============================
// MENU RESPONSIVO
// ===============================
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const menu = document.getElementById('menu');
const menuLinks = document.querySelectorAll('nav.menu ul li a');

// Abre e fecha o menu
if (menuToggle && closeMenu && menu) {
  menuToggle.addEventListener('click', () => menu.classList.add('active'));
  closeMenu.addEventListener('click', () => menu.classList.remove('active'));
}

// Fecha o menu ao clicar em um link (mobile)
menuLinks.forEach(link => {
  link.addEventListener('click', () => menu.classList.remove('active'));
});


// ===============================
// SLIDER DE ATUAÇÕES
// ===============================
let currentIndex = 0;
const slides = document.querySelectorAll('.slider-item');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function updateSliderPosition() {
  const container = document.querySelector('.slider-container');
  if (!container) return;

  const newTransformValue = -currentIndex * 100;
  container.style.transform = `translateX(${newTransformValue}%)`;

  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[currentIndex]) dots[currentIndex].classList.add('active');
}

function moveSlide(direction) {
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = totalSlides - 1;
  if (currentIndex >= totalSlides) currentIndex = 0;
  updateSliderPosition();
}

function moveSlideTo(index) {
  currentIndex = index;
  updateSliderPosition();
}

// Auto Slide (a cada 5s)
if (totalSlides > 0) {
  updateSliderPosition();
  setInterval(() => moveSlide(1), 5000);
}


// ===============================
// PERFIL DOS ADVOGADOS (ver mais / voltar)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const profileCards = document.querySelectorAll(".profile-card");

  profileCards.forEach((card) => {
    const toggleBtn = card.querySelector(".toggle-btn");
    const resume = card.querySelector(".resumo-cv");
    const details = card.querySelector(".profile-details");

    if (!toggleBtn || !resume || !details) return;

    details.style.display = "none";

    toggleBtn.addEventListener("click", () => {
      const showingDetails = details.style.display === "block";
      details.style.display = showingDetails ? "none" : "block";
      resume.style.display = showingDetails ? "block" : "none";
      toggleBtn.textContent = showingDetails ? "🔍 Ver mais" : "↩ Voltar";
    });
  });
});


// ===============================
// ÁREAS DE ATUAÇÃO (expandir / recolher)
// ===============================
function toggleArea(id) {
  const card = document.getElementById(id);
  if (!card) return;

  const detalhes = card.querySelector('.detalhes');
  const miniResumo = card.querySelector('.mini-resumo');
  const btnExpand = card.querySelector('.btn-expand');
  const btnCollapse = card.querySelector('.btn-collapse');

  if (!detalhes || !miniResumo) return;

  const isOpen = detalhes.style.display === 'block';
  detalhes.style.display = isOpen ? 'none' : 'block';
  miniResumo.style.display = isOpen ? 'block' : 'none';
  if (btnExpand && btnCollapse) {
    btnExpand.style.display = isOpen ? 'inline-block' : 'none';
    btnCollapse.style.display = isOpen ? 'none' : 'inline-block';
  }
  card.style.height = 'auto';
}


// ===============================
// ROLAGEM SUAVE (âncoras)
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    e.preventDefault();
    window.scrollTo({
      top: targetElement.offsetTop - 100,
      behavior: 'smooth'
    });
  });
});


// ===============================
// ANIMAÇÕES DE SURGIMENTO AO ROLAR (corrigido e otimizado)
// ===============================
document.addEventListener('DOMContentLoaded', function() {
  const elements = document.querySelectorAll('.surge-bottom, .surge-right, .surge-left');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible'); // reaparece ao voltar
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(element => observer.observe(element));
});


// ===============================
// CONTADORES ANIMADOS
// ===============================
const counters = document.querySelectorAll('.counter');

const updateCounter = (counter) => {
  counter.innerText = '0';
  const target = +counter.getAttribute('data-target');
  const increment = target / 200;

  const incrementCounter = () => {
    const c = +counter.innerText;
    if (c < target) {
      counter.innerText = `${Math.ceil(c + increment)}`;
      requestAnimationFrame(incrementCounter);
    } else {
      counter.innerText = target;
    }
  };
  incrementCounter();
};

const observerCounters = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      updateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

counters.forEach(counter => observerCounters.observe(counter));
