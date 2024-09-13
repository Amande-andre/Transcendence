function generateNumber() {
    const random = Math.random(); // Génère un nombre aléatoire entre 0 et 1
  
    if (random < 0.3) { // 10% de chance
      // Choisir aléatoirement entre 2, 3, et 4
      const randomChoice = Math.floor(Math.random() * 3) + 2; // Génère 2, 3 ou 4
      return randomChoice;
    } else {
      // 90% de chance de retourner 1
      return 1;
    }
}

function updatePaddles(player1, player2) {
    for (let i = 0; i < player1.paddles.length; i++) {
        player1.paddles[i].update('a', 'd', 0, WIDTH / 2 - 19);
    }
    for (let i = 0; i < player2.paddles.length; i++) {
        player2.paddles[i].update('1', '3', WIDTH / 2 + 19, WIDTH);
    }
}

function fillbrick(bricks, x, y) {
    for (let row = 0; row < 18; row++) {
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

function newBall(player, ball) {
    player.balls.push(new Ball(ball.x, ball.y, 0, 2, 5));
}

function Collision(player, lWall, rWall, bonus) {
    // Ball-Wall Collision
    for (let ball of player.balls) {
        if (ball.x + ball.radius > rWall || ball.x - ball.radius < lWall) {
            ball.speedX = -ball.speedX;
        }
        if (ball.y - ball.radius < 0) {
            ball.speedY = -ball.speedY;
        }
        // Ball out of bounds (bottom)
        if (ball.y + ball.radius > HEIGHT) {
            player.balls.splice(player.balls.indexOf(ball), 1);
            if (player.balls.length === 0)
                player.balls.push(new Ball(player.spawnBallx, player.spawnBally, 4, 4, 5));
        }
    }
    for (let ball of player.balls) {
        if (ball.speedY === 2)
            ball.speedY = 4;
        for (let paddle of player.paddles) {
            if (ball.y + ball.radius > paddle.y &&
                ball.y - ball.radius < paddle.y + paddle.height &&
                ball.x > paddle.x &&
                ball.x < paddle.x + paddle.width) {
                
                // Reverse the vertical direction
                ball.speedY = -Math.abs(ball.speedY);  // Ensure the ball always bounces upward
                
                // Calculate new horizontal speed based on where the ball hit the paddle
                let hitPos = (ball.x - paddle.x) / paddle.width;
                
                // Adjust the multiplier to control the maximum horizontal speed
                let maxSpeedX = 8;  // Maximum horizontal speed
                
                // Use a sine function to create a more balanced curve
                ball.speedX = Math.sin((hitPos - 0.5) * Math.PI) * maxSpeedX;
                
                // Ensure a minimum horizontal speed to prevent straight vertical bounces
                let minSpeedX = 2;
                if (Math.abs(ball.speedX) < minSpeedX) {
                    ball.speedX = ball.speedX > 0 ? minSpeedX : -minSpeedX;
                }
            }
        }
    } 
    // Ball-Brick Collision
    for (let ball of player.balls) {
        for (let i = 0; i < player.bricks.length; i++) {
            let brick = player.bricks[i];
            if (ball.x + ball.radius > brick.x &&
                ball.x - ball.radius < brick.x + 32 &&
                ball.y + ball.radius > brick.y &&
                ball.y - ball.radius < brick.y + 16) {
                // Determine collision direction
                let overlapLeft = ball.x + ball.radius - brick.x;
                let overlapRight = brick.x + 32 - (ball.x - ball.radius);
                let overlapTop = ball.y + ball.radius - brick.y;
                let overlapBottom = brick.y + 16 - (ball.y - ball.radius);

                if (Math.min(overlapLeft, overlapRight) < Math.min(overlapTop, overlapBottom)) {
                    ball.speedX = -ball.speedX;
                } else {
                    ball.speedY = -ball.speedY;
                }
                if (brick.bonus > 1) 
                    bonus[0](player, ball);
                player.bricks.splice(i, 1);
                break; // Exit loop after collision
            }
        }
    }
    // Update ball positions
    for (let ball of player.balls) {
        ball.x += ball.speedX;
        ball.y += ball.speedY;
    }
}

function drawBreakoutArea() {
    ctx.strokeStyle = 'white';
    ctx.strokeRect(0, 0, WIDTH / 2 - 16, HEIGHT);
    ctx.strokeRect(WIDTH / 2 + 16, 0, WIDTH / 2 - 16, HEIGHT);
}

function displayScore(scorePlayer1, scorePlayer2) {
    ctx.font = '32px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(scorePlayer1, 100, 50);
    ctx.fillText(scorePlayer2, WIDTH - 140, 50);
}   

function drawScreen(player1, player2) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    displayScore(player1.score, player2.score);

    player1.drawBricks();
    player2.drawBricks();
    drawBreakoutArea();

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

    drawScreen(player1, player2);

    Collision(player1, 0, WIDTH / 2 - 16, bonus);
    Collision(player2, WIDTH / 2 + 16, WIDTH, bonus);
    updatePaddles(player1, player2);
    //if (bricks1.length === 0 || bricks2.length === 0) {
    //    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    //    drawBreakoutArea();
    //    if (bricks1.length === 0)
    //        ctx.fillText('WIN', 100, 50);
    //    else
    //        ctx.fillText('WIN', WIDTH - 140, 50);
    //    setTimeout(() => {
    //        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    //    }, 1000)
    //}
    //else
        requestAnimationFrame(() => updateBreakout(player1, player2, bonus));
}

function initControls() {

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
}

function startBreakout() {
    let player1 = new Player(new Paddle(WIDTH / 4 - 80 / 2, HEIGHT - 8, 80, 8),
                        new Ball(WIDTH / 4, 3 * HEIGHT / 4, 0, 4, 5));
    let player2 = new Player(new Paddle(3 * WIDTH / 4 - 80 / 2, HEIGHT - 8, 80, 8),
                    new Ball(3 * WIDTH / 4, 3 * HEIGHT / 4, 0, 4, 5));
    const bonus = [newBall];
    fillbrick(player1.bricks, 0, 5);
    fillbrick(player2.bricks, 13, 5);

    initControls()

    drawScreen(player1, player2);


    updateBreakout(player1, player2, bonus);
}