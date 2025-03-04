const btn = document.getElementById('button');
const sectionAll = document.querySelectorAll('section[id]');
const inputName = document.querySelector('#nombre');
const inputEmail = document.querySelector('#email');
const flagsElement = document.getElementById('flags');
const textsToChange = document.querySelectorAll('[data-section]');

/* ===== Loader =====*/
window.addEventListener('load', () => {
	const contenedorLoader = document.querySelector('.container--loader');
	contenedorLoader.style.opacity = 0;
	contenedorLoader.style.visibility = 'hidden';
});

/*===== Header =====*/
window.addEventListener('scroll', () => {
	const header = document.querySelector('header');
	header.classList.toggle('abajo', window.scrollY > 0);
});

/*===== Boton Menu =====*/
btn.addEventListener('click', function () {
	if (this.classList.contains('active')) {
		this.classList.remove('active');
		this.classList.add('not-active');
		document.querySelector('.nav_menu').classList.remove('active');
		document.querySelector('.nav_menu').classList.add('not-active');
	} else {
		this.classList.add('active');
		this.classList.remove('not-active');
		document.querySelector('.nav_menu').classList.remove('not-active');
		document.querySelector('.nav_menu').classList.add('active');
	}
});

/*===== Cambio de idioma =====*/
/*===== Cambio de idioma =====*/
const changeLanguage = async (language) => {
	try {
		const response = await fetch(`./assets/languages/${language}.json`);
		if (!response.ok) throw new Error('Error al cargar el archivo de idioma');

		const texts = await response.json();

		textsToChange.forEach((textElement) => {
			const section = textElement.dataset.section;
			const value = textElement.dataset.value;

			if (texts[section] && texts[section][value]) {
				textElement.innerHTML = texts[section][value];
			}
		});

		// Guardar la selección de idioma en localStorage
		localStorage.setItem('selectedLanguage', language);
	} catch (error) {
		console.error('Error cambiando el idioma:', error);
	}
};

flagsElement.addEventListener('click', (e) => {
	const flag = e.target.closest('.flags__item');
	if (flag) {
		const language = flag.dataset.language;
		changeLanguage(language);
	}
});

/*===== Cargar idioma guardado al iniciar =====*/
document.addEventListener('DOMContentLoaded', () => {
	const savedLanguage = localStorage.getItem('selectedLanguage') || 'es';
	changeLanguage(savedLanguage);
});

/*===== class active por secciones =====*/
window.addEventListener('scroll', () => {
	const scrollY = window.pageYOffset;
	sectionAll.forEach((current) => {
		const sectionHeight = current.offsetHeight;
		const sectionTop = current.offsetTop - 100;
		const sectionId = current.getAttribute('id');

		if (scrollY > sectionTop && scrollY < sectionTop + sectionHeight) {
			document
				.querySelector('nav a[href*=' + sectionId + ']')
				.classList.add('active');
		} else {
			document
				.querySelector('nav a[href*=' + sectionId + ']')
				.classList.remove('active');
		}
	});
});

/*===== Boton y función ir arriba =====*/
window.onscroll = function () {
	if (document.documentElement.scrollTop > 100) {
		document.querySelector('.go-top-container').classList.add('show');
	} else {
		document.querySelector('.go-top-container').classList.remove('show');
	}
};

document.querySelector('.go-top-container').addEventListener('click', () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
});
