function generateNumber() {
    const random = Math.random(); // Génère un nombre aléatoire entre 0 et 1
  
    if (random < 0.8) { // 10% de chance
      // Choisir aléatoirement entre 2, 3, et 4
      const randomChoice = Math.floor(Math.random() * 2); // Génère 2, 3 ou 4 before *10
      return randomChoice;
    } else {
      // 90% de chance de retourner 1
      return -1;
    }
}

function updatePaddles(player1, player2) {
    for (let i = 0; i < player1.paddles.length; i++) {
        player1.paddles[i].update('a', 'd', 0, WIDTH / 2 - 19, 'horizontal');
    }
    for (let i = 0; i < player2.paddles.length; i++) {
        player2.paddles[i].update('1', '3', WIDTH / 2 + 19, WIDTH, 'horizontal');
    }
}

function fillbrick(bricks, x, y) {
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 12; col++) {
            bricks.push({
                x: (x + col) * 32, // Position X de la brique
                y: (y + row) * 16, // Position Y de la brique
                bonus: generateNumber()  // 10% de chance d'avoir un bonus
            });
        }
    }
    bricks.sort((a, b) => b.y - a.y);
}

function ft_newBall(player, ball) {
    for (let i = 0; i < Math.floor(Math.random() * 2) + 1; i++)
        player.balls.push(new Ball(ball.x, ball.y, 0, 2, 5));
}

function ft_increasePaddle(player, ball) {
    for (let paddle of player.paddles){

        if (paddle.width < WIDTH / 2 - 16){
            paddle.width += 10;
        }
    }
}
function Collision(player, lWall, rWall, bonus) {
    const topWall = 0;
    const bottomWall = HEIGHT;

    // Handle ball-wall and out-of-bounds collisions
    player.balls = player.balls.filter(ball => {
        // Horizontal wall collisions
        if (ball.x + ball.radius > rWall || ball.x - ball.radius < lWall) {
            ball.x = Math.max(lWall + ball.radius, Math.min(rWall - ball.radius, ball.x));
            ball.speedX = -ball.speedX;
        }

        // Top wall collision
        if (ball.y - ball.radius < topWall) {
            ball.y = topWall + ball.radius;
            ball.speedY = -ball.speedY;
        }

        // Ball out of bounds (bottom)
        if (ball.y + ball.radius > bottomWall) {
            return false; // Remove this ball
        }

        return true;
    });

    // Respawn ball if no balls remain
    if (player.balls.length === 0) {
        player.balls.push(new Ball(player.spawnBallx, player.spawnBally, 4, 4, 5));
    }

    // Paddle collision handling
    player.balls.forEach(ball => {
        // Ensure ball speed is not too low
        if (ball.speedY === 2) {
            ball.speedY = 4;
        }

        player.paddles.forEach(paddle => {
            if (isCollidingWithPaddle(ball, paddle)) {
                handlePaddleCollision(ball, paddle);
            }
        });
    });

    // Brick collision handling
    player.balls.forEach(ball => {
        for (let i = player.bricks.length - 1; i >= 0; i--) {
            const brick = player.bricks[i];
            if (isCollidingWithBrick(ball, brick)) {
                handleBrickCollision(player, ball, brick, i, bonus);
                break; // Exit loop after first collision
            }
        }
    });

    // Update ball positions
    player.balls.forEach(ball => {
        ball.x += ball.speedX;
        ball.y += ball.speedY;
    });
}

// Helper function to check paddle collision
function isCollidingWithPaddle(ball, paddle) {
    return (ball.y + ball.radius > paddle.y &&
            ball.y - ball.radius < paddle.y + paddle.height &&
            ball.x > paddle.x &&
            ball.x < paddle.x + paddle.width);
}

// Helper function to handle paddle collision with advanced angle calculation
function handlePaddleCollision(ball, paddle) {
    // Reverse the vertical direction
    ball.speedY = -Math.abs(ball.speedY);  // Ensure the ball always bounces upward
    
    // Calculate new horizontal speed based on where the ball hit the paddle
    const hitPos = (ball.x - paddle.x) / paddle.width;
    
    // Maximum and minimum horizontal speed constraints
    const maxSpeedX = 8;
    const minSpeedX = 2;
    
    // Use sine function for more balanced horizontal velocity
    ball.speedX = Math.sin((hitPos - 0.5) * Math.PI) * maxSpeedX;
    
    // Ensure minimum horizontal speed
    if (Math.abs(ball.speedX) < minSpeedX) {
        ball.speedX = ball.speedX > 0 ? minSpeedX : -minSpeedX;
    }
}

// Helper function to check brick collision
function isCollidingWithBrick(ball, brick) {
    return (ball.x + ball.radius > brick.x &&
            ball.x - ball.radius < brick.x + 32 &&
            ball.y + ball.radius > brick.y &&
            ball.y - ball.radius < brick.y + 16);
}

// Helper function to handle brick collision
function handleBrickCollision(player, ball, brick, brickIndex, bonus) {
    // Determine collision direction
    const overlapLeft = ball.x + ball.radius - brick.x;
    const overlapRight = brick.x + 32 - (ball.x - ball.radius);
    const overlapTop = ball.y + ball.radius - brick.y;
    const overlapBottom = brick.y + 16 - (ball.y - ball.radius);

    // Change ball direction based on smallest overlap
    if (Math.min(overlapLeft, overlapRight) < Math.min(overlapTop, overlapBottom)) {
        ball.speedX = -ball.speedX;
    } else {
        ball.speedY = -ball.speedY;
    }

    // Apply bonus if brick has one
    if (brick.bonus !== -1) {
        console.log('Brick bonus:', brick.bonus);
        bonus[brick.bonus](player, ball);
    }

    // Remove the brick
    player.bricks.splice(brickIndex, 1);
}

function drawBreakoutBorder() {
    ctx.strokeStyle = 'white';
    ctx.strokeRect(0, 0, WIDTH / 2 - 16, HEIGHT);
    ctx.strokeRect(WIDTH / 2 + 16, 0, WIDTH / 2 - 16, HEIGHT);
}

function displayBreakoutScore(scorePlayer1, scorePlayer2) {
    ctx.font = '32px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(scorePlayer1, 100, 50);
    ctx.fillText(scorePlayer2, WIDTH - 140, 50);
}   

function drawBreakoutAera(player1, player2) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    displayBreakoutScore(player1.score, player2.score);

    player1.drawBricks();
    player2.drawBricks();
    drawBreakoutBorder();

    for (let i = 0; i < player1.paddles.length; i++)
        player1.paddles[i].drawPaddle();
    for (let i = 0; i < player2.paddles.length; i++)
        player2.paddles[i].drawPaddle();
    for (let i = 0; i < player1.balls.length; i++)
        player1.balls[i].drawBall();
    for (let i = 0; i < player2.balls.length; i++)
        player2.balls[i].drawBall();
}

function updateBreakout(player1, player2, bonus) {
    drawBreakoutAera(player1, player2);
    player2.isIa = false;
    IaControle(player1, 0);
    Collision(player1, 0, WIDTH / 2 - 16, bonus);
    Collision(player2, WIDTH / 2 + 16, WIDTH, bonus);
    updatePaddles(player1, player2);
    if (game === false)
        return
    if (player1.bricks.length === 0 || player2.bricks.length === 0) {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        drawBreakoutBorder();
        if (player1.bricks.length === 0)
            ctx.fillText('WIN', 100, 50);
        else
            ctx.fillText('WIN', WIDTH - 140, 50);
        setTimeout(() => {
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
        }, 1000)
    }
    else
        requestAnimationFrame(() => updateBreakout(player1, player2, bonus));
}


function startBreakout() {
    game = true;

    let player1 = new Player(new Paddle(WIDTH / 4 - 80 / 2, HEIGHT - 8, 80, 8),
                        new Ball(WIDTH / 4, 3 * HEIGHT / 4, 0, 4, 5));
    let player2 = new Player(new Paddle(3 * WIDTH / 4 - 80 / 2, HEIGHT - 8, 80, 8),
                    new Ball(3 * WIDTH / 4, 3 * HEIGHT / 4, 0, 4, 5));
    const bonus = [ft_newBall, ft_increasePaddle];
    fillbrick(player1.bricks, 0, 5);
    fillbrick(player2.bricks, 13, 5);

    player1.initControls('a', 'd');
    player2.initControls('1', '3');

    drawBreakoutAera(player1, player2);

    return updateBreakout(player1, player2, bonus);
}