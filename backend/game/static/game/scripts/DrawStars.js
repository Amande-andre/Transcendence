	// Star canvasStar setup
	const canvasStar = document.getElementById('star-canvas');
	const starContext = canvasStar.getContext('2d');

	// Set canvasStar size
	canvasStar.width = window.innerWidth;
	canvasStar.height = window.innerHeight;

	// Function to draw stars
	function drawStars() {
		// Clear canvasStar
		starContext.clearRect(0, 0, canvasStar.width, canvasStar.height);

		// Create random stars
		for (let i = 0; i < 150; i++) { // Adjust this number for more or fewer stars
			const x = Math.random() * canvasStar.width;
			const y = Math.random() * canvasStar.height;
			const radius = Math.random() * 1.5; // Adjust size of stars
			starContext.beginPath();
			starContext.arc(x, y, radius, 0, 2 * Math.PI);
			starContext.fillStyle = 'white';
			starContext.fill();
		}
	}

	// Initial draw
	drawStars();

	// Redraw stars on resize
	window.addEventListener('resize', () => {
		canvasStar.width = window.innerWidth;
		canvasStar.height = window.innerHeight;
		drawStars();
	});