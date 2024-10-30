        // Star canvas setup
        const canvas = document.getElementById('star-canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Function to draw stars
        function drawStars() {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Create random stars
            for (let i = 0; i < 150; i++) { // Adjust this number for more or fewer stars
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const radius = Math.random() * 1.5; // Adjust size of stars
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, 2 * Math.PI);
                ctx.fillStyle = 'white';
                ctx.fill();
            }
        }

        // Initial draw
        drawStars();

        // Redraw stars on resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawStars();
        });