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
