import { each } from 'jquery';
import {$} from './common';

// $(window).scroll(function(){
// 	if($(this).scrollTop()>300){
// 		$('.js-move-up').addClass('visible');
// 	}else{
// 		$('.js-move-up').removeClass('visible');
// 	}
// });
// $('.js-move-up').click(function(){$('body,html').animate({scrollTop:0},800);return false;});

// Слайдер услуг
if($('.js-services-slider').length){
	$('.js-services-slider').slick({
		infinite: true,
		dots: true,
		arrows: false,
	});
}

// Слайдер работ
if($('.js-works-slider').length){
	$('.js-works-slider').slick({
		infinite: true,
		dots: true,
		appendArrows: $('.js-works-slider-arr'),
		prevArrow: '<button id="prev" type="button" class="btn-arr"><svg class="icon ic-stroke ic-arrow-left" width="10" height="20"><use xlink:href="assets/sprites/sprite.svg#ic-arrow-left"></use></svg></button>',
		nextArrow: '<button id="next" type="button" class="btn-arr"><svg class="icon ic-stroke ic-arrow-right" width="10" height="20"><use xlink:href="assets/sprites/sprite.svg#ic-arrow-right"></use></svg></button>',
		appendDots: $('.js-works-slider-dots'),
		slidesToShow: 3,
		slidesToScroll: 3
	});
}

// Слайдер партнеров
if($('.js-partner-slider').length){
	$('.js-partner-slider').slick({
		infinite: true,
		dots: true,
		appendArrows: $('.js-partner-slider-arr'),
		prevArrow: '<button id="prev" type="button" class="btn-arr"><svg class="icon ic-stroke ic-arrow-left" width="10" height="20"><use xlink:href="assets/sprites/sprite.svg#ic-arrow-left"></use></svg></button>',
		nextArrow: '<button id="next" type="button" class="btn-arr"><svg class="icon ic-stroke ic-arrow-right" width="10" height="20"><use xlink:href="assets/sprites/sprite.svg#ic-arrow-right"></use></svg></button>',
		appendDots: $('.js-partner-slider-dots'),
		slidesToShow: 5,
		slidesToScroll: 5
	});
}

// Yandex карта
if ($('#map').length) {
	// Иницилизация карты
	ymaps.ready(init);

	function init(){
		var myMap;

		$('.js-map-item').each(function(index) {
			var coordx = $(this).data('coordx');
			var coordy = $(this).data('coordy');

			if(index == 0){
				myMap = new ymaps.Map("map", {
					center: [coordx, coordy-0.005],
					zoom: 15,
					controls: []
				});
			}

			var myPlacemark = new ymaps.Placemark([coordx, coordy] , {},
			{ iconLayout: 'default#image',
			iconImageHref: 'assets/img/mark-map.png',
			iconImageSize: [50, 65],
			iconImageOffset: [-25, -65] });

			myMap.geoObjects.add(myPlacemark);
		});

		// Изменение центра карты при клике по табам
		$('.js-map-item').on('click',function(e) {
			var curCenterMapX = $(this).data('coordx');
			var curCenterMapY = $(this).data('coordy')-0.005;

			myMap.panTo([curCenterMapX, curCenterMapY]);
		});
	}
}

// Табуляция
if ($('.js-tabs-page').length) {
	$('.js-tabs-page-list').each(function(){
		$(this).find('.js-tabs-page-item:first').addClass("active");
	});

	$('.js-tabs-page-content').each(function(){
		$(this).find('.js-tabs-page-content-item:first').fadeIn();
	});

	$('.js-tabs-page-item').on('click',function(e) {
		e.preventDefault();
		var $parent = $(this).parents('.js-tabs-page');

		$parent.find('.js-tabs-page-content-item').hide();
		$parent.find('.js-tabs-page-item').removeClass('active');

		$(this).addClass("active");
		$parent.find('#' + $(this).attr('data-item')).fadeIn();
	});
}