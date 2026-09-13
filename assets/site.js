// Before / after sliders. Pointer events on the figure drive the value so a
// finger or mouse can start anywhere on the photo (a native range only moves
// from its thumb on touch screens). The range input stays for keyboard users.
document.querySelectorAll('[data-compare]').forEach(function (el) {
  var range = el.querySelector('.compare-range');
  if (!range) return;
  var update = function () {
    el.style.setProperty('--pos', range.value + '%');
    range.setAttribute('aria-valuetext', range.value + '% before, ' + (100 - range.value) + '% after');
  };
  var fromPointer = function (e) {
    var rect = el.getBoundingClientRect();
    if (!rect.width) return;
    var pct = Math.round((e.clientX - rect.left) / rect.width * 100);
    range.value = Math.max(0, Math.min(100, pct));
    update();
  };
  var dragging = false;
  el.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragging = true;
    if (el.setPointerCapture) el.setPointerCapture(e.pointerId);
    e.preventDefault();
    fromPointer(e);
  });
  el.addEventListener('pointermove', function (e) {
    if (dragging) fromPointer(e);
  });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (name) {
    el.addEventListener(name, function () { dragging = false; });
  });
  range.addEventListener('input', update);
  el.classList.add('compare-ready');
  update();
});

var toggle = document.querySelector('.nav-toggle');
var nav = document.getElementById('nav');
if (toggle && nav) {
  var closeMenu = function () {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  toggle.closest('.header').classList.add('nav-ready');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu();
      toggle.focus();
    }
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.header')) closeMenu();
  });
  nav.addEventListener('focusout', function () {
    setTimeout(function () {
      if (!nav.contains(document.activeElement) && document.activeElement !== toggle) closeMenu();
    }, 0);
  });
  window.matchMedia('(min-width: 861px)').addEventListener('change', closeMenu);
}

// Native POST stays on the existing endpoint, including without JavaScript.
var next = document.getElementById('form-next');
if (next) next.value = new URL('thanks.html', window.location.href).href;

var form = document.getElementById('quote-form');
if (form) {
  var status = document.getElementById('form-status');
  var submit = form.querySelector('button[type="submit"]');
  var fields = Array.from(form.querySelectorAll('.field input, .field select, .field textarea'));
  fields.forEach(function (field) {
    var error = document.createElement('span');
    error.id = field.id + '-error';
    error.className = 'field-error';
    field.parentNode.appendChild(error);
    field.setAttribute('aria-describedby', [field.getAttribute('aria-describedby'), error.id].filter(Boolean).join(' '));
    field.addEventListener('input', function () {
      if (field.hasAttribute('aria-invalid')) validate(field);
    });
    field.addEventListener('blur', function () {
      if (field.value || field.hasAttribute('aria-invalid')) validate(field);
    });
  });
  function validate(field) {
    var message = '';
    field.setCustomValidity('');
    if (field.required && !field.value.trim()) message = 'Please complete this field.';
    else if (field.id === 'f-phone' && (field.value.replace(/\D/g, '').length < 7 || !field.validity.valid)) message = 'Enter a phone number with at least 7 digits, including the area code.';
    else if (field.validity.typeMismatch) message = 'Enter an email address, such as name@example.co.nz.';
    else if (!field.validity.valid) message = field.validationMessage;
    field.setCustomValidity(message);
    document.getElementById(field.id + '-error').textContent = message;
    if (message) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
    return !message;
  }
  form.noValidate = true;
  form.addEventListener('submit', function (e) {
    var invalid = fields.filter(function (field) { return !validate(field); });
    if (invalid.length) {
      e.preventDefault();
      status.textContent = 'Please check the highlighted fields before sending.';
      invalid[0].focus();
      return;
    }
    if (submit.disabled) { e.preventDefault(); return; }
    submit.disabled = true;
    submit.textContent = 'Sending request…';
    status.textContent = 'Sending your request. Please wait for the confirmation page.';
    // Navigation failures must not leave the form permanently locked.
    setTimeout(resetSubmit, 15000);
  });
  function resetSubmit() {
    if (!submit.disabled) return;
    submit.disabled = false;
    submit.textContent = 'Send quote request';
    status.textContent = 'No confirmation yet. If this page has not changed, check your connection and try again, or call us.';
  }
  window.addEventListener('pageshow', function () {
    submit.disabled = false;
    submit.textContent = 'Send quote request';
    status.textContent = '';
  });
}

// Keep the preview copies (github.io, botsmith.dev) out of search results.
if (/(^|\.)(github\.io|botsmith\.dev)$/.test(window.location.hostname)) {
  var m = document.querySelector('meta[name="robots"]') || document.createElement('meta');
  m.name = 'robots';
  m.content = 'noindex';
  document.head.appendChild(m);
}
