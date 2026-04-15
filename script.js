const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

/* ─── SCROLL REVEAL (cards, feature items, etc.) ─── */
const revealTargets = document.querySelectorAll(
  '.course-card, .testi-card, .faculty-card, .feature-item'
);

revealTargets.forEach(el => {
  el.classList.add('reveal');
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on position among siblings
        const siblings = Array.from(entry.target.parentElement.children);
        const index    = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 60}ms`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // animate only once
      }
    });
  },
  { threshold: 0.12 }
);

revealTargets.forEach(el => revealObserver.observe(el));

/* ─── ANIMATED RESULT BARS ─── */
const barFills    = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.getAttribute('data-width');
        entry.target.style.width = targetWidth + '%';
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

barFills.forEach(bar => barObserver.observe(bar));

/* ─── FORM SUBMISSION ─── */
const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', () => {
  const name    = document.getElementById('name').value.trim();
  const phone   = document.getElementById('phone').value.trim();
  phone.addEventListener('input', function (e) {
    // Replaces any character that is NOT a digit (0-9) with an empty string
    this.value = this.value.replace(/[^0-9]/g, ' ');
});
  const email   = document.getElementById('email').value.trim();
  const course  = document.getElementById('course').value;

  if (!name || !phone || !email || !course) {
    alert('Please fill in your Name, Phone, Email and Course before submitting.');
    return;
  }

  submitBtn.textContent = '✓ Enquiry Submitted! We will call you shortly.';
  submitBtn.style.background    = '#14a3a8';
  submitBtn.style.color         = '#fff';
  submitBtn.disabled            = true;
});

/* ─── ACTIVE NAV LINK ON SCROLL ─── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}`
            ? 'var(--gold)'
            : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(sec => sectionObserver.observe(sec));

/* ─── STICKY NAV SHADOW ─── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});
