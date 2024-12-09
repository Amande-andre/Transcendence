function swapControls(player1, player2) {
    tmp = player2.keyleft;
    player2.keyleft = player2.keyright;
    player2.keyright = tmp;
    setTimeout(() => {
        tmp = player2.keyleft;
        player2.keyleft = player2.keyright;
        player2.keyright = tmp;
    }, 5000);
}

function decreasePaddleSize(player1, player2) {
    player2.paddles.forEach(paddle => {
        paddle.height -= 10;
    });
}

function increasePaddleSize(player1, player2) {
    player1.paddles.forEach(paddle => {
        paddle.height += 10;
    });
}

function teleportBall(player1, player2) {
    player1.balls.forEach(ball => {
        ball.y = Math.floor(Math.random() * HEIGHT);
    });
}

function addNewBall(player1, player2) {
    const newBall = new Ball(player1.spawnBallx, player1.spawnBally, 5, 5, 8);
    player1.balls.push(newBall);
    player2.balls.push(newBall);
}

function drawRec(x, y) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, 15, 15);
}

function drawBall(x, y) {
    ctx.fillStyle = 'white';
    console.log(x, y);  
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
    ctx.lineTo(0, 400);
    ctx.closePath();

}

function displayPongScore(scorePlayer1, scorePlayer2) {
    ctx.font = '32px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(scorePlayer1, 100, 50);
    ctx.fillText(scorePlayer2, WIDTH - 140, 50);
}   

function updatePaddlePong(player1, player2) {
    for (let i = 0; i < player1.paddles.length; i++) {
        player1.paddles[i].update(player1.keyleft, player1.keyright, 0, HEIGHT, 'vertical');
    }
    for (let i = 0; i < player2.paddles.length; i++) {
        player2.paddles[i].update(player2.keyleft, player2.keyright, 0, HEIGHT, 'vertical');
    }
}

function collisionPong(player1, player2, playersi, bonus) {
    // Create a copy of balls to safely iterate and modify
    const ballsToProcess = [...player1.balls];

    ballsToProcess.forEach(ball => {
        // Handle paddle collisions
        handlePaddleCollisions(ball, player1, player2);

        // Handle wall collisions
        handleWallCollisions(ball, player1, player2);

        // Handle scoring and ball reset
        handleScoring(ball, player1, player2);

        // Handle bonus collisions
        if (isBonus)
            handleBonusCollisions(ball, player1, player2, bonus);
    });
}

// Helper function to check paddle collision
function isPaddleCollision(ball, paddle) {
    // return (ball.x + ball.radius > paddle.x &&
    //         ball.x - ball.radius < paddle.x + paddle.width &&
    //         ball.y > paddle.y &&
    //         ball.y < paddle.y + paddle.height);
        // Collision horizontale (côtés de la raquette)
        const horizontalCollision = 
        ball.x + ball.radius > paddle.x && 
        ball.x - ball.radius < paddle.x + paddle.width;

    // Collision verticale (hauteur de la raquette)
    const verticalCollision = 
        ball.y + ball.radius > paddle.y && 
        ball.y - ball.radius < paddle.y + paddle.height;

    // Les deux conditions doivent être vraies
    return horizontalCollision && verticalCollision;
}

// Calculate new ball trajectory after paddle hit
function adjustBallTrajectoryOnPaddle(ball, paddle) {
    // Reverse the horizontal direction
    ball.speedX = -ball.speedX;
    
    // Calculate new vertical speed based on where the ball hit the paddle
    const hitPos = (ball.y - paddle.y) / paddle.height;
    
    // Adjust the multiplier to control the maximum vertical speed
    const maxSpeedY = 8;  // Maximum vertical speed
    
    // Use a sine function to create a more balanced curve
    ball.speedY = Math.sin((hitPos - 0.5) * Math.PI) * maxSpeedY;
    
    // Ensure a minimum vertical speed to prevent straight horizontal bounces
    const minSpeedY = 2;
    if (Math.abs(ball.speedY) < minSpeedY) {
        ball.speedY = ball.speedY > 0 ? minSpeedY : -minSpeedY;
    }
}

// Handle paddle collisions for a single ball
function handlePaddleCollisions(ball, player1, player2) {
    // Check collision with player1's paddles
    for (let paddle of player1.paddles) {
        if (isPaddleCollision(ball, paddle)) {
            adjustBallTrajectoryOnPaddle(ball, paddle);
            player1.bounce++;
            return; // Exit after first collision to prevent multiple hits
        }
    }

    // Check collision with player2's paddles
    for (let paddle of player2.paddles) {
        if (isPaddleCollision(ball, paddle)) {
            adjustBallTrajectoryOnPaddle(ball, paddle);
            player2.bounce++;
            return; // Exit after first collision to prevent multiple hits
        }
    }
}

// Handle vertical wall collisions
function handleWallCollisions(ball, player1, player2) {
    // Reverse vertical direction when hitting top or bottom walls
    if (ball.y + ball.radius > HEIGHT || ball.y - ball.radius < 0) {
        ball.speedY = -ball.speedY;
        player1.bounce++;
        player2.bounce++;
    }
}

// Handle scoring and ball reset
function handleScoring(ball, player1, player2) {
    // Ball goes out on left side
    if (ball.x - ball.radius < 0) {
        removeBall(ball, player1, player2);
        spawnNewBall(player1, player2);
        player2.score++;
    }
    // Ball goes out on right side
    else if (ball.x + ball.radius > WIDTH) {
        removeBall(ball, player1, player2);
        spawnNewBall(player1, player2);
        player1.score++;
    }
}

// Handle bonus collisions
function handleBonusCollisions(ball, player1, player2, applyBonus) {
    // Check collision for both players
    if (player1.bricks.length === 0) {
        for (let i = 0; i < 3; i++)
            player1.bricks.push({x: generateX(), y: generateY(), bonus: generateBonus});
    }
    player1.bricks.forEach(brick => {
        if (isCollidingWithBrick(ball, brick)) {
            bonusWinner = ball.speedX > 0 ? player1 : player2;
            bonusLoser = ball.speedX > 0 ? player2 : player1;
            bonusWinner.bonusTaken++;
            applyBonus[0](bonusWinner, bonusLoser);
            player1.bricks.splice(player1.bricks.indexOf(brick), 1);
        }
    });
}
        
// return a number between 300 and 500
function generateX() {
    return Math.floor(Math.random() * 200) + 300;
}

// return a number between 0 and 600
function generateY() {
    return Math.floor(Math.random() * 600);
}

function generateBonus() {
    return Math.floor(Math.random() * 5);
}

function isCollidingWithBrick(ball, brick) {
    return (ball.x + ball.radius > brick.x &&
            ball.x - ball.radius < brick.x + 15 &&
            ball.y + ball.radius > brick.y &&
            ball.y - ball.radius < brick.y + 15);
}

// Remove ball from both players' ball arrays
function removeBall(ball, player1, player2) {
    const index1 = player1.balls.indexOf(ball);
    const index2 = player2.balls.indexOf(ball);
    
    if (index1 !== -1) player1.balls.splice(index1, 1);
    if (index2 !== -1) player2.balls.splice(index2, 1);
}

// Spawn a new ball for both players
function spawnNewBall(player1, player2) {
    const newBall = new Ball(player1.spawnBallx, player1.spawnBally, 5, 5, 8);
    player1.balls.push(newBall);
    player2.balls.push(newBall);
}

function drawPongArea(player1, player2) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(0, 0, WIDTH, HEIGHT);
    displayPongScore(player1.score, player2.score);

    for (let i = 0; i < player1.paddles.length; i++)
        player1.paddles[i].drawPaddle();
    for (let i = 0; i < player2.paddles.length; i++)
        player2.paddles[i].drawPaddle();
    for (let i = 0; i < player1.balls.length; i++)
        player1.balls[i].drawBall();
    for (let i = 0; i < player2.balls.length; i++)
        player2.balls[i].drawBall();
    for (player1.brick of player1.bricks)
        drawRec(player1.brick.x, player1.brick.y);
}

function updatePong(player1, player2, players, bonus) {
    drawPongArea(player1, player2);
    IaControlePong(player1);
    IaControlePong(player2);
    player1.balls[0].x += player1.balls[0].speedX;
    player1.balls[0].y += player1.balls[0].speedY;
    collisionPong(player1, player2, players, bonus);
    updatePaddlePong(player1, player2);

    if (game === false)
        return;
    else if (player1.score === 3 || player2.score === 3) {
        handleEndGame(player1, player2, players);
        return;
    }
    else
        requestAnimationFrame(() => updatePong(player1, player2, players, bonus));
}

function getPlayersData(canvas) {
    // Récupère l'élément HTML qui contient les données JSON
    // Lit les données de l'attribut data et les parse en objet JavaScript
    const playersData = canvas.getAttribute('data-players');
    console.log('players = ', playersData);
    players = JSON.parse(playersData.replace(/'/g, '"'));
    return players;
}

function getPlayer(players) {
    
    let lowestRound = 10;
    
    for (let i = 0; i < players.length; i++) {
        if (players[i].loose === 0){
            if (players[i].round <= lowestRound){
                lowestRound = players[i].round;
            }
        }
    }
    for (let i = 0; i < players.length; i++) {

        if (players[i].loose === 0 && players[i].round === lowestRound){
            players[i].round++;
            return i;
        }
    }
    return -1;
}

async function startPong(canvas, button) {
    let players = getPlayersData(canvas);
    console.log('players', players);
    await new Promise((resolve) => {
        game = true;
        mainBall = new Ball(WIDTH / 2, HEIGHT / 2, 5, 5, 8);
        let index1 = getPlayer(players);
        if (index1 === -1)
            return resolve();
        let player1 = new Player(new Paddle(0, HEIGHT / 2 - 80, 8, 160, players[index1].color), mainBall, index1, players[index1].isIa);
        player1.isIa = isIa(players[index1].isIa);
        let index2 = getPlayer(players);
        let player2 = new Player(new Paddle(WIDTH - 8, HEIGHT / 2 - 80, 8, 160, players[index2].color), mainBall, index2, players[index2].isIa);
        player2.isIa = isIa(players[index2].isIa);
        player1.initControls('w', 's');
        player2.initControls('5', '2');
        const bonus = [swapControls, decreasePaddleSize, increasePaddleSize, teleportBall, addNewBall];
        
        drawPongArea(player1, player2);
        updatePong(player1, player2, players, bonus);
        
        const checkGameEnd = () => {
            if (player1.score === 3 || player2.score === 3) {
                resolve();
            } else {
                requestAnimationFrame(checkGameEnd);
            }
        };
        checkGameEnd();
    });
    
    button.setAttribute('hx-vals', JSON.stringify({'players': JSON.stringify(players), 'game': 'pong'}));
	// remove the class popito
	button.classList.remove('popito');
}