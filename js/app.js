document.addEventListener('DOMContentLoaded', function () {
const swiper = new Swiper('.swipers', {
	// Optional parameters
	direction: 'horizontal',
	loop: true,
	autoplay: true,
	effect: "fade",
	// If we need pagination
	pagination: {
		el: '.swiper-pagination',
		clickable: true
	},

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	// And if we need scrollbar
});
const swiperl = new Swiper('.swipersl', {
	// Optional parameters
	direction: 'horizontal',
	loop: true,
	autoplay: true,
	// If we need pagination
	pagination: {
		el: '.swiper-pagination',
		clickable: true
	},

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	// And if we need scrollbar
});
const swipers = new Swiper('.swiper-container', {
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	effect: "Cards",
	slidesPerView: 1,
	spaceBetween: 10,
	// init: false,

	breakpoints: {
		620: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		680: {
			slidesPerView: 2,
			spaceBetween: 40,
		},
		920: {
			slidesPerView: 3,
			spaceBetween: 40,
		},
		1240: {
			slidesPerView: 4,
			spaceBetween: 50,
		},
	}
});
const swiperCliente = new Swiper('.swiper-clientes', {
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	effect: "Cards",
	slidesPerView: 1,
	spaceBetween: 10,
	// init: false,

	breakpoints: {
		620: {
			slidesPerView: 1,
			spaceBetween: 20,
		},
		680: {
			slidesPerView: 2,
			spaceBetween: 40,
		},
		920: {
			slidesPerView: 2,
			spaceBetween: 40,
		},
		1240: {
			slidesPerView: 3,
			spaceBetween: 50,
		},
	}
});
});