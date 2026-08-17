// ==========================================================================
// Initialization & Global Setup
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }

  initSmoothScroll();
  initScrollAnimations();
  initCountdownTimer();
  initChecklistHandler();
  initRSVPForm();
  initCalendarExport();
});

// ==========================================================================
// 1. Lenis Smooth Scroll Integration
// ==========================================================================
let lenis;

function initSmoothScroll() {
  if (typeof Lenis === 'undefined') return;

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

// ==========================================================================
// 2. Playful GSAP ScrollTrigger Animations
// ==========================================================================
function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);
}

// ==========================================================================
// 3. Live Countdown Timer
// ==========================================================================
function initCountdownTimer() {
  const eventDate = new Date('2026-10-03T12:00:00').getTime();

  const cdDays = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMins = document.getElementById('cdMins');
  const cdSecs = document.getElementById('cdSecs');

  if (!cdDays || !cdHours || !cdMins || !cdSecs) return;

  function updateTimer() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
      cdDays.innerText = '00';
      cdHours.innerText = '00';
      cdMins.innerText = '00';
      cdSecs.innerText = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    cdDays.innerText = String(days).padStart(2, '0');
    cdHours.innerText = String(hours).padStart(2, '0');
    cdMins.innerText = String(minutes).padStart(2, '0');
    cdSecs.innerText = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}
