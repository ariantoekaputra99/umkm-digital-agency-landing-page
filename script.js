const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.mobile-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelectorAll('a[href^="https://wa.me/"]').forEach((link) => {
  link.addEventListener('click', () => {
    if (typeof gtag !== 'function') return;

    const location = link.closest('header')
      ? 'header'
      : link.closest('footer')
        ? 'footer'
        : link.closest('section')?.id || 'hero';

    gtag('event', 'whatsapp_click', {
      link_text: link.textContent.replace(/\s+/g, ' ').trim(),
      link_location: location,
    });
  });
});
