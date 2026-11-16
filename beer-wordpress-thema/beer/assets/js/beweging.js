/* BEER. – zachte beweging: header-schaduw en blokken die in beeld schuiven. */
(function () {
	var header = document.querySelector('.beer-header');
	if (header) {
		var zet = function () { header.classList.toggle('gescrold', window.scrollY > 10); };
		window.addEventListener('scroll', zet, { passive: true });
		zet();
	}

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
	var io = new IntersectionObserver(function (items) {
		items.forEach(function (it) {
			if (!it.isIntersecting) return;
			it.target.classList.add('zichtbaar');
			io.unobserve(it.target);
			setTimeout(function () { it.target.classList.remove('beer-onthul', 'zichtbaar'); }, 1200);
		});
	}, { rootMargin: '0px 0px -8% 0px' });

	var kies = '.is-style-kaart, .wp-block-details, .is-layout-grid > .wp-block-group, .wp-block-columns > .wp-block-column';
	document.querySelectorAll('main ' + kies.split(', ').join(', main ')).forEach(function (el) {
		if (el.getBoundingClientRect().top < window.innerHeight) return;
		var broers = Array.prototype.slice.call(el.parentElement.children);
		el.style.setProperty('--d', (broers.indexOf(el) % 4) * 90 + 'ms');
		el.classList.add('beer-onthul');
		io.observe(el);
	});
})();

/* Productpagina: klik op een kleine foto om hem groot te tonen. */
(function () {
	var groot = document.querySelector('.beer-galerij-groot img');
	if (!groot) return;
	document.querySelectorAll('.beer-galerij-klein img').forEach(function (img) {
		img.addEventListener('click', function () { groot.src = img.src; groot.alt = img.alt; });
	});
})();
