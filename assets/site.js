// Before/after sliders: the range input drives a CSS variable that clips the
// "before" image. Native input, so it works with keyboard, mouse and touch.
document.querySelectorAll('[data-compare]').forEach(function (el) {
  var range = el.querySelector('.compare-range');
  if (!range) return;
  var update = function () { el.style.setProperty('--pos', range.value + '%'); };
  range.addEventListener('input', update);
  update();
});

// Mobile menu
var toggle = document.querySelector('.nav-toggle');
var nav = document.getElementById('nav');
if (toggle && nav) {
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// The form service redirects to an absolute URL after a submission, so build it
// from wherever the site is hosted (works on the staging host and the real domain).
var next = document.getElementById('form-next');
if (next) {
  next.value = new URL('thanks.html', window.location.href).href;
}

// Keep search engines off the staging host. Remove this block once the site is
// served from shorewash.co.nz only.
if (/github\.io$/.test(window.location.hostname)) {
  var m = document.createElement('meta');
  m.name = 'robots';
  m.content = 'noindex';
  document.head.appendChild(m);
}
