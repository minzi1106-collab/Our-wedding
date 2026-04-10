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

function initGallery() {
  if (!document.querySelector('.gallery-swiper')) return;

  new Swiper('.gallery-swiper', {
    slidesPerView: 1.1,
    centeredSlides: true,
    spaceBetween: 14,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 1
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

// 6. 티켓 뒤집기 기능 (추가된 부분)
function initTicketFlip() {
  var ticketCard = document.getElementById('ticketCard');
  if (!ticketCard) return;

  ticketCard.addEventListener('click', function () {
    this.classList.toggle('flip');
  });
}

// 7. 통합 초기화 실행
function initAll() {
  initScrollReveal();
  initGallery();
  initTicketFlip(); // 티켓 기능 실행
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}
