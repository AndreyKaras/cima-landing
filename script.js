const modal = document.getElementById('modal');
const openBtns = document.querySelectorAll('.js-open-modal');
const closeBtn = document.querySelector('.modal__close');
const overlay = document.querySelector('.modal__overlay');

function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

/* MODAL */
function openModal() {
  const scrollbarWidth = getScrollbarWidth();

  document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
  document.body.classList.add('modal-open');
  modal.classList.add('is-open');
}

function closeModal() {
  document.body.classList.remove('modal-open');
  modal.classList.remove('is-open');
}

openBtns.forEach(btn => btn.addEventListener('click', openModal));
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* NAV ACTIVE */
const links = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (window.pageYOffset >= top && window.pageYOffset < bottom) {
      current = section.id;
    }
  });

  links.forEach(link => {
    link.classList.remove('active');

    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

/* EMAILJS */
document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("kznunU3tJkXsbyvxr");

  const form = document.getElementById("contact-form");
  const button = form.querySelector("button[type='submit']");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    button.disabled = true;
    button.textContent = "Enviando...";

    try {
      // 1. ПИСЬМО ТЕБЕ
      await emailjs.sendForm(
        "service_zd1da7s",
        "template_kjv7cy2",
        form
      );

      // 2. АВТООТВЕТ КЛИЕНТУ
      await emailjs.sendForm(
        "service_zd1da7s",
        "template_h5b1bjp",
        form
      );

      alert("¡Mensaje enviado! Te contactaremos pronto ✔");

      form.reset();
      closeModal();

    } catch (error) {
      console.log(error);
      alert("Error al enviar ❌");

    } finally {
      button.disabled = false;
      button.textContent = "Enviar consulta";
  з  }
  });
});




// header scroll 
const header = document.querySelector('.header');
const heroTitle = document.querySelector('.hero h1');

window.addEventListener('scroll', () => {
  const top = heroTitle.getBoundingClientRect().top;

  header.classList.toggle('scrolled', top < 80);
});