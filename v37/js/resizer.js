function ResizerInit() {
	window.addEventListener('load', resizeCanvas);
    window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
    OnWindowSizeChanged(window.innerWidth, window.innerHeight);
}

function OnWindowSizeChanged(width, height) {
	if (((window.innerWidth * 0.8) * (720 / 1280)) > (window.innerHeight * 0.8)) {
		height = (window.innerHeight * 0.8);
		width = ((window.innerHeight * 0.8) * (1280 / 720));
		canvas.style.height = height + "px";
		canvas.style.width = width + "px";
		
		loader_canvas.style.height = canvas.style.height;
		loader_canvas.style.width = canvas.style.width;
	} else {
		height = ((window.innerWidth * 0.8) * (720 / 1280));
		width = (window.innerWidth * 0.8);

		canvas.style.height = height + "px";
		canvas.style.width = width + "px";
		
		loader_canvas.style.height = canvas.style.height;
		loader_canvas.style.width = canvas.style.width;
	}

	SPLASH_SCREEN.style.height = canvas.style.height;
	SPLASH_SCREEN.style.width = canvas.style.width;

	MAINTENANCE_BREAK.style.height = canvas.style.height;
	MAINTENANCE_BREAK.style.width = canvas.style.width;

	maintenance_button.style.fontSize = width / 50 + "px"; 
}
