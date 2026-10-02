const backTop = document.querySelector('.back-top');
const updateBackTop = () => backTop?.classList.toggle('visible', window.scrollY > 420);
window.addEventListener('scroll', updateBackTop, { passive: true });
updateBackTop();
backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const projectCards = [...document.querySelectorAll('.project-card')];
const slideCount = document.querySelector('#slide-count');
let currentProjectIndex = Math.max(0, projectCards.findIndex((card) => card.classList.contains('is-current')));
let slideCleanupTimer;

const setProjectFace = (card, flipped) => {
  const front = card.querySelector('[data-face="front"]');
  const back = card.querySelector('[data-face="back"]');
  if (!front || !back) return;
  front.inert = flipped;
  front.setAttribute('aria-hidden', String(flipped));
  back.inert = !flipped;
  back.setAttribute('aria-hidden', String(!flipped));
};

projectCards.forEach((card, index) => {
  card.inert = index !== currentProjectIndex;
  card.setAttribute('aria-hidden', String(index !== currentProjectIndex));
  setProjectFace(card, false);
});

const showProject = (nextIndex, direction = 1) => {
  if (projectCards.length < 2 || nextIndex === currentProjectIndex) return;
  const outgoing = projectCards[currentProjectIndex];
  const incoming = projectCards[nextIndex];
  clearTimeout(slideCleanupTimer);

  outgoing.classList.remove('is-current', 'is-flipped');
  outgoing.classList.add('is-exiting');
  outgoing.style.setProperty('--outgoing-x', direction > 0 ? '36px' : '-36px');
  outgoing.inert = true;
  outgoing.setAttribute('aria-hidden', 'true');
  setProjectFace(outgoing, false);

  incoming.classList.remove('is-exiting', 'is-flipped');
  incoming.classList.add('is-entering');
  incoming.style.setProperty('--incoming-x', direction > 0 ? '-36px' : '36px');
  incoming.inert = false;
  incoming.setAttribute('aria-hidden', 'false');
  setProjectFace(incoming, false);
  void incoming.offsetWidth;
  requestAnimationFrame(() => {
    incoming.classList.remove('is-entering');
    incoming.classList.add('is-current');
  });

  currentProjectIndex = nextIndex;
  if (slideCount) slideCount.textContent = `${String(nextIndex + 1).padStart(2, '0')} / ${String(projectCards.length).padStart(2, '0')}`;
  slideCleanupTimer = window.setTimeout(() => {
    outgoing.classList.remove('is-exiting');
    outgoing.style.removeProperty('--outgoing-x');
    incoming.style.removeProperty('--incoming-x');
  }, 500);
};

document.querySelector('[data-slide="next"]')?.addEventListener('click', () => {
  showProject((currentProjectIndex + 1) % projectCards.length, 1);
});
document.querySelector('[data-slide="previous"]')?.addEventListener('click', () => {
  showProject((currentProjectIndex - 1 + projectCards.length) % projectCards.length, -1);
});

const projectCarousel = document.querySelector('.project-carousel');
let carouselTimer;
let carouselHovered = false;
let carouselFocused = false;

const scheduleProjectAdvance = () => {
  window.clearTimeout(carouselTimer);
  if (projectCards.length < 2 || document.hidden || carouselHovered || carouselFocused || projectCards[currentProjectIndex].classList.contains('is-flipped')) return;
  carouselTimer = window.setTimeout(() => {
    showProject((currentProjectIndex + 1) % projectCards.length, 1);
    scheduleProjectAdvance();
  }, 8000);
};

projectCarousel?.addEventListener('pointerenter', () => {
  carouselHovered = true;
  window.clearTimeout(carouselTimer);
});
projectCarousel?.addEventListener('pointerleave', () => {
  carouselHovered = false;
  scheduleProjectAdvance();
});
projectCarousel?.addEventListener('focusin', () => {
  carouselFocused = true;
  window.clearTimeout(carouselTimer);
});
projectCarousel?.addEventListener('focusout', (event) => {
  if (projectCarousel.contains(event.relatedTarget)) return;
  carouselFocused = false;
  scheduleProjectAdvance();
});
document.addEventListener('visibilitychange', scheduleProjectAdvance);
scheduleProjectAdvance();

projectCards.forEach((card) => {
  card.querySelectorAll('[data-flip]').forEach((button) => {
    button.addEventListener('click', () => {
      const flipped = card.classList.toggle('is-flipped');
      setProjectFace(card, flipped);

      const nextButton = card.querySelector(flipped ? '.project-back [data-flip]' : '.project-front [data-flip]');
      nextButton?.focus({ preventScroll: true });
    });
  });
});

