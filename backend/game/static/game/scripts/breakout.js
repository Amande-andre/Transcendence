function generateNumber() {
    const random = Math.random(); // Génère un nombre aléatoire entre 0 et 1
  
    if (random < 0.1) { // 10% de chance
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
    for (let i = 0; i < Math.floor(Math.random() * 2) + 1; i++)
        player.balls.push(new Ball(ball.x, ball.y, 0, 2, 5));
}

function increasePaddle(player, ball) {
    for (let paddle of player.paddles){

        if (paddle.width < WIDTH / 2 - 16){
            paddle.width += 30;
        }
        setTimeout(() => {
            paddle.width -= 30;
        }, 2000);
    }
}

function Collision(player, lWall, rWall, bonus) {
    // Ball-Wall Collision
    let topWall = 0;
    let bottomWall = HEIGHT;
    for (let ball of player.balls) {
        if (ball.x + ball.radius > rWall || ball.x - ball.radius < lWall) {
            ball.x = Math.max(lWall + ball.radius, Math.min(rWall - ball.radius, ball.x));
            ball.speedX = -ball.speedX;
        }
        if (ball.y - ball.radius < 0) {
            ball.y = Math.max(topWall + ball.radius, Math.min(bottomWall - ball.radius, ball.y));
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
                if (brick.bonus !== -1) {
                    bonus[brick.bonus](player, ball);
                }
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

function choiceIa(player, nb)  {
        
    if (nb === 0) {
        if (player.balls[0].x < player.paddles[0].midl){
            this.input = 'a';
            return 'a';
        }
        else if (player.balls[0].x > player.paddles[0].midl){
            this.input = 'd';
            return 'd';
        }
    }
    else {
        if (player.balls[0].x < player.paddles[0].midl){

            return '1';
        }
        else if (player.balls[0].x > player.paddles[0].midl){

            return '3';
        }
    }
}

function IaControle(player, nb) {
    
    if (!player.isIa)
        return;
    player.second = new Date().getSeconds();
    if (player.second <= player.past && (player.second !== 0 && player !== 59)){ 
        return;
    }       
    console.log('player.second == ', player.second);
    player.past = player.second;
    //player.past = player.second ;
    let eventTab = choiceIa(player, nb);
    otherevent = eventTab === 'a' ? 'd' : 'a';
    // if (player.input === eventTab){
    //     return;
    // }
    let eventdown = new KeyboardEvent('keyup', {
        key: otherevent,
    });
    let eventup = new KeyboardEvent('keydown', {
        key: eventTab,
    });
    setTimeout(() => {
        document.dispatchEvent(eventup);
    }, 500);
    //document.dispatchEvent(eventup);
    document.dispatchEvent(eventdown);
    //console.log('after seconde is  == ', new Date().getSeconds());
}

function updateBreakout(player1, player2, bonus) {

    drawBreakoutAera(player1, player2);
    player2.isIa = false;
    IaControle(player1, 0);
    Collision(player1, 0, WIDTH / 2 - 16, bonus);
    Collision(player2, WIDTH / 2 + 16, WIDTH, bonus);
    updatePaddles(player1, player2);
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
    const bonus = [newBall, increasePaddle];
    fillbrick(player1.bricks, 0, 5);
    fillbrick(player2.bricks, 13, 5);

    player1.initControls('a', 'd');
    player2.initControls('1', '3');

    drawBreakoutAera(player1, player2);

    updateBreakout(player1, player2, bonus);
}