import { each } from 'jquery';
import {$} from './common';

// определяем устройство
var deviceDesc = true;
var deviceMob = false;
var deviceChange = false;
var deviceChangeMob = false;
var widthWindow = $(window).width();

if(widthWindow > 991){
	deviceDesc = true;
}else{
	deviceDesc = false;
}

$(window).on('resize', function(){
	widthWindow = $(window).width();

	if(widthWindow > 991 && deviceDesc == false){
		deviceDesc = true;
		deviceChange = true;
	}else if(widthWindow <= 991 && deviceDesc == true){
		deviceDesc = false;
		deviceChange = true;
	}else{
		deviceChange = false;
	}

	if(widthWindow <= 767 && deviceMob == false){
		deviceMob = true;
		deviceChangeMob = true;
	}else if(widthWindow > 767 && deviceMob == true){
		deviceMob = false;
		deviceChangeMob = true;
	}else{
		deviceChangeMob = false;
	}
});


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
	function servicesSlider() {
		$('.js-services-slider').slick({
			infinite: true,
			dots: true,
			arrows: false,
		});
	}

	if(widthWindow > 767){
		servicesSlider();
	}

	$(window).on('resize', function(){
		if(widthWindow > 767 && deviceChangeMob == true){
			servicesSlider();
		} else if(widthWindow <= 767 && deviceChangeMob == true){
			$('.js-services-slider').slick('unslick');
		}
	});
}

// Слайдер работ
if($('.js-works-slider').length){
	function worksSlider() {
		$('.js-works-slider').slick({
			infinite: true,
			dots: true,
			appendArrows: $('.js-works-slider-arr'),
			prevArrow: '<button id="prev" type="button" class="btn-arr"><svg class="icon ic-stroke ic-arrow-left" width="10" height="20"><use xlink:href="assets/sprites/sprite.svg#ic-arrow-left"></use></svg></button>',
			nextArrow: '<button id="next" type="button" class="btn-arr"><svg class="icon ic-stroke ic-arrow-right" width="10" height="20"><use xlink:href="assets/sprites/sprite.svg#ic-arrow-right"></use></svg></button>',
			appendDots: $('.js-works-slider-dots'),
			slidesToShow: 3,
			slidesToScroll: 3,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						dots: false,
					}
				},
			]
		});
	}

	if(widthWindow > 767){
		worksSlider();
	}

	$(window).on('resize', function(){
		if(widthWindow > 767 && deviceChangeMob == true){
			worksSlider();
		} else if(widthWindow <= 767 && deviceChangeMob == true){
			$('.js-works-slider').slick('unslick');
		}
	});
}

// Слайдер партнеров
if($('.js-partner-slider').length){
	function partnerSlider() {
		$('.js-partner-slider').slick({
			infinite: true,
			dots: true,
			appendArrows: $('.js-partner-slider-arr'),
			prevArrow: '<button id="prev" type="button" class="btn-arr"><svg class="icon ic-stroke ic-arrow-left" width="10" height="20"><use xlink:href="assets/sprites/sprite.svg#ic-arrow-left"></use></svg></button>',
			nextArrow: '<button id="next" type="button" class="btn-arr"><svg class="icon ic-stroke ic-arrow-right" width="10" height="20"><use xlink:href="assets/sprites/sprite.svg#ic-arrow-right"></use></svg></button>',
			appendDots: $('.js-partner-slider-dots'),
			slidesToShow: 5,
			slidesToScroll: 5,
			responsive: [
				{
					breakpoint: 1230,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4,
					}
				},
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						dots: false,
					}
				},
			]
		});
	}

	if(widthWindow > 767){
		partnerSlider();
	}

	$(window).on('resize', function(){
		if(widthWindow > 767 && deviceChangeMob == true){
			partnerSlider();
		} else if(widthWindow <= 767 && deviceChangeMob == true){
			$('.js-partner-slider').slick('unslick');
		}
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

// Создание мобильного меню
if($('.js-add-mm').length){
	var arrMobileMenu = [];
	
	function addMobileMenu() {
		$('.js-add-mm').each(function(){
			var indexItem = $(this).data('order');
			$(this).before('<div class="js-add-desc" data-order="'+indexItem+'"></div>');
			arrMobileMenu[indexItem] = $(this);
			$(this).detach();
		});
		
		for (var i = 0; i < arrMobileMenu.length; i++) {
			$(arrMobileMenu[i]).appendTo('.js-mobile-menu-content');
		}
	}
	
	if(widthWindow <= 991){
		addMobileMenu();
	}
	
	$(window).on('resize', function(){
		if(widthWindow > 991 && deviceChange == true){
			$('.js-add-desc').each(function(){
				var indexItem = $(this).data('order');
				
				$(this).after($(arrMobileMenu[indexItem]));
				$(this).remove();
			});
			
			$('.js-mobile-menu-content .js-add-mm').remove();
		}else if(widthWindow <= 991 && deviceChange == true){
			addMobileMenu();
		}
	});
}

// Открыть/Закрыть мобильное меню
if($('.js-btn-menu').length){
	$('.js-btn-menu').on('click',function(e) {
		$(this).toggleClass('active');
		$('.js-mobile-menu').slideToggle(300);
		$('.js-body').toggleClass('no-scroll');
	});
	
}