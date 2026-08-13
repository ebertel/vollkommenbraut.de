// Sale Popup
document.addEventListener('DOMContentLoaded', function() {
	const popupHTML = `
	<div id="sale-popup-overlay" style="
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
		opacity: 0;
		transition: opacity 0.7s ease;
		pointer-events: none;
	">
		<div id="sale-popup" style="
			position: relative;
			background: none;
			border-radius: 0;
			width: auto;
			max-width: min(90vw, calc(90vh * 853 / 1280));
			max-height: 90vh;
			overflow: hidden;
			opacity: 0;
			transition: opacity 0.7s ease;
			box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
			padding: 0;
			margin: 0;
			line-height: 0;
		">
			<img src="site/assets/wedding-inspiration-day.jpg?v=20260813" alt="Wedding Inspiration Day – 13. September, 12–16 Uhr" style="width: 100%; height: auto; display: block; border-radius: 0; margin: 0; padding: 0;">
		</div>
		
		<button id="sale-popup-close" style="
			position: fixed;
			top: 20px;
			right: 20px;
			width: 50px;
			height: 50px;
			background-color: rgba(0, 0, 0, 0.8);
			border: none;
			border-radius: 50%;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 10000;
			padding: 0;
		">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" style="width: 28px; height: 28px;">
				<path d="M18 6L6 18M6 6l12 12"></path>
			</svg>
		</button>
	</div>
	`;

	document.body.insertAdjacentHTML('beforeend', popupHTML);

	const overlay = document.getElementById('sale-popup-overlay');
	const popup = document.getElementById('sale-popup');
	const closeBtn = document.getElementById('sale-popup-close');

	// Fade in
	setTimeout(() => {
		overlay.style.opacity = '1';
		overlay.style.pointerEvents = 'auto';
		popup.style.opacity = '1';
	}, 50);

	// Close function
	function closePopup() {
		overlay.style.opacity = '0';
		overlay.style.pointerEvents = 'none';
		popup.style.opacity = '0';
		setTimeout(() => overlay.remove(), 700);
	}

	closeBtn.addEventListener('click', closePopup);
	overlay.addEventListener('click', (e) => {
		if (e.target === overlay) closePopup();
	});
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && document.getElementById('sale-popup-overlay')) {
			closePopup();
		}
	});
});
