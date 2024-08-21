function drawRec(x, y, Width, Height) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, Width, Height);
}

function drawBall(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

function displayScore() {
    ctx.font = '32px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(scorePlayer1, 100, 50);
    ctx.fillText(scorePlayer2, WIDTH - 140, 50);
}   

function updatePaddlePong() {
    if (keys['a'] && player1X > 0) {
        player1X -= 5;
    } else if (keys['d'] && player1X < WIDTH / 2 - paddleWidth - 16) {
        player1X += 5;
    }

    if (keys['1'] && player2X > WIDTH / 2 + 16) {
        player2X -= 5;
    } else if (keys['3'] && player2X < WIDTH - paddleWidth) {
        player2X += 5;
    }
}

function collisionPong() {
    //Wall
    if (ball1X + ballRadius > WIDTH / 2 || ball1X - ballRadius < 0)
        ball1SpeedX = -ball1SpeedX;
    if (ball1Y + ballRadius > HEIGHT || ball1Y - ballRadius < 0)
        ball1SpeedY = -ball1SpeedY;
    //Paddle
    if (ball1Y + ballRadius > HEIGHT - paddleHeight && ball1X > player1X && ball1X < player1X + paddleWidth)
        ball1SpeedY = -ball1SpeedY;
}

function updatePong() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    displayScore();

    ctx.strokeStyle = 'white';
    ctx.strokeRect(0, 0, WIDTH, HEIGHT);
    drawRec(player1X, HEIGHT - paddleHeight);
    drawRec(player2X, HEIGHT - paddleHeight);

    drawBall(ball1X, ball1Y);
    drawBall(ball2X, ball2Y);

    ball1X += ball1SpeedX;
    ball1Y += ball1SpeedY;
    ball2X += ball2SpeedX;
    ball2Y += ball2SpeedY;
    collisionPong();
    
    updatePaddlePong();
    requestAnimationFrame(update);
}

function startPong() {
    player1X = WIDTH / 4 - paddleWidth / 2;
    player2X = 3 * WIDTH / 4 - paddleWidth / 2;
    document.addEventListener('keydown', function(event) {  
        if (event.key ==='a')
            keys['a'] = true;
        else if (event.key === 'd')
            keys['d'] = true;

        if (event.key ==='1')
            keys['1'] = true
        else if (event.key === '3')
            keys['3'] = true
    });

    document.addEventListener('keyup', function(event) {  
        if (event.key ==='a')
            keys['a'] = false;
        else if (event.key === 'd')
            keys['d'] = false;

        if (event.key ==='1')
            keys['1'] = false 
        else if (event.key === '3')
            keys['3'] = false 
    });

    updatePong();
}