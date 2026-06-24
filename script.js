emailjs.init("kznunU3tJkXsbyvxr");

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
  const form = document.getElementById("contact-form");

  function getUTM() {
    const params = new URLSearchParams(window.location.search);

    return {
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
      utm_term: params.get("utm_term") || ""
    };
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const button = form.querySelector("button[type='submit']");
    button.disabled = true;
    button.textContent = "Enviando...";

    const utm = getUTM();

    try {
      // 1. EMAILJS (основной email)
      await emailjs.sendForm(
        "service_zd1da7s",
        "template_kjv7cy2",
        form
      );

      // 2. HUBSPOT CRM (lead)
      const res = await fetch(
        "https://api.hsforms.com/submissions/v3/integration/submit/148772856/cbc66e40-7568-42bf-9602-73cce366df0b",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fields: [
              { name: "firstname", value: form.name.value },
              { name: "email", value: form.email.value },
              { name: "message", value: form.message.value },
              { name: "company", value: form.category.value },

              // UTM
              { name: "utm_source", value: utm.utm_source },
              { name: "utm_medium", value: utm.utm_medium },
              { name: "utm_campaign", value: utm.utm_campaign },
              { name: "utm_content", value: utm.utm_content },
              { name: "utm_term", value: utm.utm_term }
            ]
          })
        }
      );

      // проверка HubSpot ответа
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error("HubSpot error: " + errorText);
      }

      alert("¡Mensaje enviado ✔");
      form.reset();
      closeModal();

    } catch (error) {
      console.log("ERROR:", error);
      alert("Error al enviar ❌ Revisa consola (F12)");

    } finally {
      button.disabled = false;
      button.textContent = "Enviar consulta";
    }
  });
});
// header scroll 
const header = document.querySelector('.header');
const heroTitle = document.querySelector('.hero h1');

if (heroTitle) {
  window.addEventListener('scroll', () => {
    const top = heroTitle.getBoundingClientRect().top;
    header.classList.toggle('scrolled', top < 80);
  });
}