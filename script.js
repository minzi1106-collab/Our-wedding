function initScrollReveal() {
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal-section'));
  if (reveals.length === 0) return;

  function revealElement(element) {
    element.classList.add('active');
  }

  // IntersectionObserver는 브라우저가 레이아웃 계산 시점에 가시성을 판단하므로
  // 스크롤 이벤트마다 모든 섹션의 위치를 읽는 강제 리플로우를 막습니다.
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        revealElement(entry.target);
        observer.unobserve(entry.target);
      });
    }, {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0
    });

    reveals.forEach(function (element) {
      observer.observe(element);
    });
    return;
  }

  // 구형 브라우저용 폴백: 레이아웃 읽기는 rAF 안에서 한 번에 처리하고,
  // 모든 읽기가 끝난 뒤에만 DOM 쓰기를 수행합니다.
  var pending = false;
  function checkVisibility() {
    pending = false;
    var viewportBottom = window.innerHeight - 100;
    var visible = [];

    reveals.forEach(function (element) {
      if (element.getBoundingClientRect().top < viewportBottom) visible.push(element);
    });
    visible.forEach(revealElement);
    reveals = reveals.filter(function (element) {
      return visible.indexOf(element) === -1;
    });

    if (reveals.length === 0) window.removeEventListener('scroll', scheduleCheck);
  }

  function scheduleCheck() {
    if (pending) return;
    pending = true;
    window.requestAnimationFrame(checkVisibility);
  }

  window.addEventListener('scroll', scheduleCheck, { passive: true });
  scheduleCheck();
}

function initAll() {
  initScrollReveal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll, { once: true });
} else {
  initAll();
}
