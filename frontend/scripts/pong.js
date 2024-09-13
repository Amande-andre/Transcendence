function drawRec(x, y) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawBall(x, y) {
    ctx.fillStyle = 'white';
    console.log(x, y);  
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
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
    if (keys['w'] && player1Y > 0) {
        player1Y -= 5;
    } else if (keys['s'] && player1Y + paddleHeight < HEIGHT) {
        player1Y += 5;
    }

    if (keys['5'] && player2Y > 0) {
        player2Y -= 5;
    } else if (keys['2'] && player2Y + paddleHeight < HEIGHT) {
        player2Y += 5;
    }
}

function collisionPong() {
    //Wall
    if (ball1Y + ballRadius > HEIGHT || ball1Y - ballRadius < 0)
        ball1SpeedY = -ball1SpeedY;
    //Paddle
    else if (ball1X + ballRadius > WIDTH - paddleWidth && ball1Y > player2Y && ball1Y < (player2Y + paddleHeight))
        ball1SpeedX = -ball1SpeedX;
    else if (ball1X - ballRadius < 0 + paddleWidth && ball1Y > player1Y && ball1Y < (player1Y + paddleHeight))
        ball1SpeedX = -ball1SpeedX;
    else if (ball1X + ballRadius > WIDTH )
        scorePlayer1++;
    else if (ball1X - ballRadius < 0)
        scorePlayer2++;
}

function updatePong() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(0, 0, WIDTH, HEIGHT);
    displayScore();

    drawRec(1, player1Y);
    drawRec(WIDTH - paddleWidth, player2Y);

    drawBall(ball1X, ball1Y);

    ball1X += ball1SpeedX;
    ball1Y += ball1SpeedY;
    collisionPong();
    
    if (scorePlayer1 === 3 || scorePlayer2 === 3) {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(0, 0, WIDTH, HEIGHT);
        if (scorePlayer1 === 3)
            ctx.fillText('WIN', 100, 50);
        else
            ctx.fillText('WIN', WIDTH - 140, 50);
        setTimeout(() => {
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
        }, 1000)
        return;
    }
    updatePaddlePong();
    requestAnimationFrame(updatePong);
}

function startPong() {
    paddleWidth = 8;
    paddleHeight = 80;
    player1Y = HEIGHT / 2 - paddleHeight / 2;;
    player2Y = HEIGHT / 2 - paddleHeight / 2;;
    ball1X = WIDTH / 2;
    ball1Y = HEIGHT / 2;
    ballRadius = 8;
    scorePlayer1 = 0;
    scorePlayer2 = 0;

    document.addEventListener('keydown', function(event) {  
        if (event.key ==='w')
            keys['w'] = true;
        else if (event.key === 's')
            keys['s'] = true;

        if (event.key ==='5')
            keys['5'] = true
        else if (event.key === '2')
            keys['2'] = true
    });

    document.addEventListener('keyup', function(event) {  
        if (event.key ==='w')
            keys['w'] = false;
        else if (event.key === 's')
            keys['s'] = false;

        if (event.key ==='5')
            keys['5'] = false 
        else if (event.key === '2')
            keys['2'] = false 
    });

    updatePong();
}