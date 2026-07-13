function initScrollReveal() {
  var reveals = document.querySelectorAll('.reveal-section');
  if (!reveals || reveals.length === 0) return;

  function reveal() {
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 100;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add('active');
      }
    }
  }

  window.addEventListener('scroll', reveal);
  reveal();
}

function initAll() {
  initScrollReveal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}
