const header = document.getElementById('site-header');
const mobileToggle = document.getElementById('mobile-toggle');
const mobileNav = document.getElementById('mobile-nav');
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');
const cursorGlow = document.getElementById('cursor-glow');
const yearNode = document.getElementById('current-year');
const submitText = document.getElementById('submit-text');

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

mobileToggle.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
  mobileToggle.textContent = mobileNav.classList.contains('open') ? '✕' : '☰';
});

mobileNav.querySelectorAll('a, button[data-scroll]').forEach((element) => {
  element.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    mobileToggle.textContent = '☰';
  });
});

document.querySelectorAll('[data-scroll]').forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    const target = document.querySelector(trigger.dataset.scroll);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    if (targetId && targetId.length > 1) {
      event.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

if (contactForm) {
  emailjs.init('0kQ3hnIfL310si8uq'); // Replace with your EmailJS public key

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    submitText.textContent = 'Sending Message...';

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    const templateParams = {
      from_name: name,
      from_email: email,
      reply_to: email,
      subject: `Website contact from ${name || 'Guest'}`,
      message: message,
    };

    contactForm.querySelectorAll('input, textarea, button').forEach((field) => {
      field.disabled = true;
    });

    try {
      await emailjs.send('service_3mny9vv', 'template_46pdea9', templateParams);
      contactForm.reset();
      showToast(`Thank you, ${name || 'Guest'}! Your message has been sent.`);
    } catch (error) {
      console.error('EmailJS error:', error);
      showToast('Sorry, something went wrong. Please try again later.');
    } finally {
      submitText.textContent = 'Send Message';
      contactForm.querySelectorAll('input, textarea, button').forEach((field) => {
        field.disabled = false;
      });
    }
  });
}

window.addEventListener('mousemove', (event) => {
  const x = event.clientX;
  const y = event.clientY;
  cursorGlow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(56, 208, 175, 0.14), transparent 26%)`;
});
