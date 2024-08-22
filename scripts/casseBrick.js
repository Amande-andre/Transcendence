function updatePaddleBreakout() {
    if (keys['a'] && player1X > 0) {
        player1X -= 5;
    } else if (keys['d'] && player1X < WIDTH / 2 - paddleWidth - 19) {
        player1X += 5;
    }

    if (keys['1'] && player2X > WIDTH / 2 + 19) {
        player2X -= 5;
    } else if (keys['3'] && player2X < WIDTH - paddleWidth) {
        player2X += 5;
    }
}

function drawBrick(x, y) {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.fillRect(x, y, brickWidth, brickHeight);
    ctx.strokeRect(x, y, brickWidth, brickHeight);
}

function fillbrick() {
    for (let row = 0; row < brickRows; row++) {
        for (let col = 0; col < Math.trunc(brickColumns / 2); col++) {
            bricks1.push({
                x: col * brickWidth, // Position X de la brique
                y: (15 + row) * brickHeight, // Position Y de la brique
            });
            bricks2.push({
                x: (13 + col) * brickWidth, // Position X de la brique
                y: (15 + row) * brickHeight, // Position Y de la brique
            })
        }
    }
    bricks1.sort((a, b) => b.y - a.y);
    bricks2.sort((a, b) => b.y - a.y);
}

function drawbrickPatern() {
    for (let i = 0; i < bricks1.length; i++) {
            drawBrick(bricks1[i].x, bricks1[i].y);
    }
    for (let i = 0; i < bricks2.length; i++) {
            drawBrick(bricks2[i].x, bricks2[i].y);
    }
}

function brick1Collision() {
    for (let i = 0; i < bricks1.length; i++) {
        if (ball1Y - ballRadius < bricks1[i].y + brickHeight && ball1Y + ballRadius > bricks1[i].y && ball1X > bricks1[i].x && ball1X < bricks1[i].x + brickWidth) {
            ball1SpeedY = -ball1SpeedY;
            bricks1.splice(i, 1);
        }
        else if (ball1X - ballRadius < bricks1[i].x + brickWidth && ball1X + ballRadius > bricks1[i].x && ball1Y > bricks1[i].y && ball1Y < bricks1[i].y + brickHeight) {
            ball1SpeedX = -ball1SpeedX;
            bricks1.splice(i, 1);
        }
    }
}
function brick2Collision() {
    for (let i = 0; i < bricks2.length; i++) {
        if (ball2Y - ballRadius < bricks2[i].y + brickHeight && ball2Y + ballRadius > bricks2[i].y && ball2X > bricks2[i].x && ball2X < bricks2[i].x + brickWidth) {
            ball2SpeedY = -ball2SpeedY;
            bricks2.splice(i, 1);
        }
        else if (ball2X - ballRadius < bricks2[i].x + brickWidth && ball2X + ballRadius > bricks2[i].x && ball2Y > bricks2[i].y && ball2Y < bricks2[i].y + brickHeight) {
            ball2SpeedX = -ball2SpeedX;
            bricks2.splice(i, 1);
        }
    }
}

function Collision() {
    // Ball 1
    //Wall
    if (ball1X + ballRadius > WIDTH / 2 - 17 || ball1X - ballRadius < 0)
        ball1SpeedX = -ball1SpeedX;
    else if (ball1Y + ballRadius > HEIGHT || ball1Y - ballRadius < 0)
        ball1SpeedY = -ball1SpeedY;
    //Paddle
    else if (ball1Y + ballRadius > HEIGHT - paddleHeight && ball1X > player1X && ball1X < player1X + paddleWidth)
        ball1SpeedY = -ball1SpeedY;
    //Brick
    else
        brick1Collision();
    // Ball 2
    //Wall
    if (ball2X - ballRadius < WIDTH / 2 + 17 || ball2X + ballRadius > WIDTH)
        ball2SpeedX = -ball2SpeedX;
    else if (ball2Y + ballRadius > HEIGHT || ball2Y - ballRadius < 0)
        ball2SpeedY = -ball2SpeedY;
    //Paddle
    else if (ball2Y + ballRadius > HEIGHT - paddleHeight && ball2X > player2X && ball2X < player2X + paddleWidth)
        ball2SpeedY = -ball2SpeedY;
    //Brick
    else
        brick2Collision();
}

function drawBreakoutArea() {
    ctx.strokeStyle = 'white';
    ctx.strokeRect(0, 0, WIDTH / 2 - 16, HEIGHT);
    ctx.strokeRect(WIDTH / 2 + 16, 0, WIDTH / 2 - 16, HEIGHT);
}

function updateBreakout() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    displayScore();

    drawbrickPatern();
    drawBreakoutArea();
    drawRec(player1X, HEIGHT - paddleHeight);
    drawRec(player2X, HEIGHT - paddleHeight);

    drawBall(ball1X, ball1Y);
    drawBall(ball2X, ball2Y);

    ball1X += ball1SpeedX;
    ball1Y += ball1SpeedY;
    ball2X += ball2SpeedX;
    ball2Y += ball2SpeedY;
    Collision();
    
    updatePaddleBreakout();
    if (bricks1.length === 0 || bricks2.length === 0) {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        drawBreakoutArea();
        if (bricks1.length === 0)
            ctx.fillText('WIN', 100, 50);
        else
            ctx.fillText('WIN', WIDTH - 140, 50);
        setTimeout(() => {
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
        }, 1000)
    }
    else
        requestAnimationFrame(updateBreakout);
}

function startBreakout() {
    paddleWidth = 80;
    paddleHeight = 8;
    ballRadius = 5;
    player1X = WIDTH / 4 - paddleWidth / 2;
    player2X = 3 * WIDTH / 4 - paddleWidth / 2;
    ball1X = WIDTH / 4;
    ball1Y = 3 * HEIGHT / 4;

    fillbrick();

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

    updateBreakout();
}