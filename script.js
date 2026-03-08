  (function () {
  'use strict';

  var IMG_OFF = 'images/music_off.png';
  var IMG_ON = 'images/music_on.png';

  function initCoverMusic() {
    var btn = document.getElementById('music-toggle-btn');
    var icon = document.getElementById('music-toggle-icon');
    var audio = document.getElementById('bgm-audio');
    if (!btn || !icon || !audio) return;

    icon.src = IMG_OFF;
    audio.pause();

    btn.addEventListener('click', function () {
      if (audio.paused) {
        audio.play();
        icon.src = IMG_ON;
      } else {
        audio.pause();
        icon.src = IMG_OFF;
      }
    });
  }

  document.addEventListener('DOMContentLoaded', initCoverMusic);

})();

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

  function initMap() {
    var mapEl = document.getElementById('map');
    if (!mapEl) return;

    var loadingEl = document.getElementById('map-loading');
    function setLoadingText(text) {
      if (!loadingEl) return;
      loadingEl.textContent = text;
    }
    function hideLoading() {
      if (!loadingEl) return;
      loadingEl.style.display = 'none';
    }

    if (!window.kakao || !kakao.maps || !kakao.maps.load) {
      setLoadingText('지도를 불러올 수 없습니다.');
      return;
    }

    kakao.maps.load(function () {
      var lat = 37.517799;
      var lng = 127.0247136;
      var center = new kakao.maps.LatLng(lat, lng);

      var map = new kakao.maps.Map(mapEl, {
        center: center,
        level: 3
      });

      map.setZoomable(true);
      var zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      var marker = new kakao.maps.Marker({ position: center });
      marker.setMap(map);

      hideLoading();
    });
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
    initCoverMusic();
    initScrollReveal();
    initMap();
    initGallery();
    initTicketFlip(); // 티켓 기능 실행
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }