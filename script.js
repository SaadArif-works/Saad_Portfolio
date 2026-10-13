/* =========================================================
   Saad | Digital Marketing Portfolio
   Plain JavaScript, no libraries needed.
   ========================================================= */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     SETTINGS: change this to your real email address.
     It updates the email link and the contact form below.
     --------------------------------------------------------- */
  var CONTACT_EMAIL = 'muhammadsaadmuhammadarif@example.com';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Email placeholder -> real address ---------- */
  document.querySelectorAll('[data-email]').forEach(function (el) {
    el.setAttribute('href', 'mailto:' + CONTACT_EMAIL);
    if (el.hasAttribute('data-email-text')) el.textContent = CONTACT_EMAIL;
  });

  /* ---------- Header: add background after scrolling ---------- */
  var header = document.getElementById('site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 24);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('nav-menu');

  function setMenu(open) {
    if (!toggle || !header) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    header.classList.toggle('menu-open', open);
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 960) setMenu(false);
    });
  }

  /* ---------- Highlight the current section in the menu ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  var sectionIds = navLinks.map(function (l) { return l.getAttribute('href').slice(1); });

  function setActive(id) {
    navLinks.forEach(function (link) {
      var active = link.getAttribute('href') === '#' + id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sectionIds.forEach(function (id) {
      var section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }
  setActive('home');

  /* ---------- Reveal on scroll ---------- */
  var revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealItems.forEach(function (el) { revealer.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Project detail dialog ---------- */
  var dialog = document.getElementById('project-dialog');
  var dialogImg = document.getElementById('dialog-img');
  var dialogTitle = document.getElementById('dialog-title');
  var dialogMeta = document.getElementById('dialog-meta');
  var dialogContent = document.getElementById('dialog-content');
  var lastTrigger = null;

  if (dialog && typeof dialog.showModal === 'function') {
    document.querySelectorAll('[data-project-open]').forEach(function (button) {
      button.addEventListener('click', function () {
        var card = button.closest('.project-card');
        var template = card.querySelector('template');
        var image = card.querySelector('.project-media img');

        dialogImg.src = image.getAttribute('src');
        dialogImg.alt = image.getAttribute('alt');
        dialogImg.style.objectPosition = image.getAttribute('data-pos') || 'center';
        dialogTitle.textContent = card.querySelector('h3').textContent;

        dialogMeta.innerHTML = '';
        card.querySelectorAll('.project-meta .tag').forEach(function (tag) {
          dialogMeta.appendChild(tag.cloneNode(true));
        });

        dialogContent.innerHTML = '';
        dialogContent.appendChild(template.content.cloneNode(true));

        lastTrigger = button;
        document.body.classList.add('no-scroll');
        dialog.showModal();
        dialog.querySelector('.dialog-body').scrollTop = 0;
      });
    });

    dialog.querySelectorAll('[data-dialog-close]').forEach(function (el) {
      el.addEventListener('click', function () { dialog.close(); });
    });

    // Click on the dark backdrop closes the dialog
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) dialog.close();
    });

    dialog.addEventListener('close', function () {
      document.body.classList.remove('no-scroll');
      if (lastTrigger) lastTrigger.focus({ preventScroll: true });
    });
  } else {
    // Very old browsers: send the button to the contact section instead
    document.querySelectorAll('[data-project-open]').forEach(function (button) {
      button.addEventListener('click', function () {
        window.location.hash = '#contact';
      });
    });
  }

  /* ---------- Contact form (opens the visitor's email app) ---------- */
  var form = document.getElementById('contact-form');
  var statusBox = document.getElementById('form-status');

  function setError(fieldId, message) {
    var input = document.getElementById(fieldId);
    var error = document.getElementById(fieldId + '-error');
    if (!input || !error) return;
    error.textContent = message;
    input.closest('.field').classList.toggle('invalid', Boolean(message));
    if (message) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  }

  function validate(values) {
    var ok = true;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.name) { setError('name', 'Please enter your name.'); ok = false; }
    else setError('name', '');

    if (!values.email) { setError('email', 'Please enter your email.'); ok = false; }
    else if (!emailPattern.test(values.email)) { setError('email', 'Please enter a valid email address.'); ok = false; }
    else setError('email', '');

    if (!values.message) { setError('message', 'Please write a short message.'); ok = false; }
    else setError('message', '');

    return ok;
  }

  function showStatus(text, copyText) {
    statusBox.textContent = '';
    var p = document.createElement('p');
    p.textContent = text;
    statusBox.appendChild(p);

    if (copyText) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn-outline btn-sm';
      btn.textContent = 'Copy message';
      btn.addEventListener('click', function () {
        var done = function () { btn.textContent = 'Copied!'; };
        var fail = function () { btn.textContent = 'Copy not available'; };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(copyText).then(done, fail);
        } else {
          fail();
        }
      });
      statusBox.appendChild(btn);
    }
  }

  if (form && statusBox) {
    ['name', 'email', 'message'].forEach(function (id) {
      var el = document.getElementById(id);
      el.addEventListener('input', function () { setError(id, ''); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var values = {
        name: form.elements.name.value.trim(),
        email: form.elements.email.value.trim(),
        message: form.elements.message.value.trim()
      };

      if (!validate(values)) {
        var firstInvalid = form.querySelector('.invalid input, .invalid textarea');
        if (firstInvalid) firstInvalid.focus();
        statusBox.textContent = '';
        return;
      }

      var subject = 'Portfolio message from ' + values.name;
      var body = values.message + '\n\n' + values.name + '\n' + values.email;
      var mailto = 'mailto:' + CONTACT_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      var plain = 'To: ' + CONTACT_EMAIL + '\nSubject: ' + subject + '\n\n' + body;

      showStatus(
        'Thanks, ' + values.name + '! Your email app should open with your message ready to send. ' +
        'If nothing opens, copy the message and email it to ' + CONTACT_EMAIL + '.',
        plain
      );

      window.location.href = mailto;
    });
  }
})();
