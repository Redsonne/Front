(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
      
        document.body.addEventListener("click", function (e) {
            const target = e.target.closest(".icon-menu");
            if (target) {
                e.preventDefault();
                const headerMenu = target.closest(".header_menu");
                if (headerMenu) {
                    headerMenu.classList.toggle("active");
                }
                target.classList.toggle("active");
                document.body.classList.toggle("fixed");
            }
        });

      
        document.addEventListener("scroll", function () {
            const header = document.getElementById("header");
            if (!header) return;

            const scrolled = window.pageYOffset || document.documentElement.scrollTop;
            if (scrolled > 80) {
                header.classList.add("top-nav-fixed");
            } else {
                header.classList.remove("top-nav-fixed");
            }
        });
    });
})();


$(document).ready(function () {
  const $slider = $('.main-block-slider');

  $slider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow: $('.main-block-slider__prev'),
    nextArrow: $('.main-block-slider__next'),
  });


  $('.slideCountAll').text($slider.slick('getSlick').slideCount);

  $slider.on('afterChange', function (event, slick, currentSlide) {
    $('.slideCountItem').text(currentSlide + 1);
  });
});
$(document).ready(function(){
  $('.photo-slider').slick({
    slidesToShow: 3,    
    slidesToScroll: 1,  
    rows: 1,    
    speed: 300,
    autoplay: true,       
    infinite: false,   
    arrows: true,       
    prevArrow: $('.photo-slider-prev'),
    nextArrow: $('.photo-slider-next'),
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
});


 ymaps.ready(init);
    
    function init() {
        var myMap = new ymaps.Map("map", {
            center: [53.89178031307021,27.505374331124518], 
            zoom: 16 ,

              controls: ['zoomControl'] 
        });
        
 
        var myPlacemark = new ymaps.Placemark([53.89178031307021,27.505374331124518], {
            hintContent: 'Музей Мороженого', 
            balloonContent: 'Музей Мороженого<br>ул. Кальварийская , 18' 
        }, {
            iconLayout: 'default#image',
            iconImageHref: '/img/free-icon-ice-cream-648872.png', 
            iconImageSize: [150,150], 
            iconImageOffset: [-27, -90] 
        });
        
        myMap.geoObjects.add(myPlacemark);
    }




    
