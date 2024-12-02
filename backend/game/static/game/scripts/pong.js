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

function drawRec(x, y) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
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
        player1.paddles[i].update('w', 's', 0, HEIGHT, 'vertical');
    }
    for (let i = 0; i < player2.paddles.length; i++) {
        player2.paddles[i].update('5', '2', 0, HEIGHT, 'vertical');
    }
}

function collisionPong(player1, player2, players) {
    // Create a copy of balls to safely iterate and modify
    const ballsToProcess = [...player1.balls];

    ballsToProcess.forEach(ball => {
        // Handle paddle collisions
        handlePaddleCollisions(ball, player1.paddles, player2.paddles);

        // Handle wall collisions
        handleWallCollisions(ball);

        // Handle scoring and ball reset
        handleScoring(ball, player1, player2);

        // Handle bonus collisions
        if (isBonus)
            handleBonusCollisions(ball, player1, player2);
    });
}

// Helper function to check paddle collision
function isPaddleCollision(ball, paddle) {
    return (ball.x + ball.radius > paddle.x &&
            ball.x - ball.radius < paddle.x + paddle.width &&
            ball.y > paddle.y &&
            ball.y < paddle.y + paddle.height);
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
function handlePaddleCollisions(ball, player1Paddles, player2Paddles) {
    // Check collision with player1's paddles
    for (let paddle of player1Paddles) {
        if (isPaddleCollision(ball, paddle)) {
            adjustBallTrajectoryOnPaddle(ball, paddle);
            return; // Exit after first collision to prevent multiple hits
        }
    }

    // Check collision with player2's paddles
    for (let paddle of player2Paddles) {
        if (isPaddleCollision(ball, paddle)) {
            adjustBallTrajectoryOnPaddle(ball, paddle);
            return; // Exit after first collision to prevent multiple hits
        }
    }
}

// Handle vertical wall collisions
function handleWallCollisions(ball) {
    // Reverse vertical direction when hitting top or bottom walls
    if (ball.y + ball.radius > HEIGHT || ball.y - ball.radius < 0) {
        ball.speedY = -ball.speedY;
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
function handleBonusCollisions(ball, player1, player2) {
    // Check collision for both players
    if (player1.bricks.length === 0)
        player1.bricks.push({x: generateX(), y: generateY(), bonus: 0});
    player1.bricks.forEach(brick => {
        if (isCollidingWithBrick(ball, brick)) {
            bonusWinner = ball.speedX > 0 ? player1 : player2;
            bonusLoser = ball.speedX > 0 ? player2 : player1;
            applyBonus(bonusWinner, bonusLoser);
            brick.splice(brick.indexOf(brick), 1);
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

function isCollidingWithBrick(ball, brick) {
    return (ball.x + ball.radius > brick.x &&
            ball.x - ball.radius < brick.x + 32 &&
            ball.y + ball.radius > brick.y &&
            ball.y - ball.radius < brick.y + 16);
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


function updatePong(player1, player2, players) {
    drawPongArea(player1, player2);
    player2.isIa = false;
    IaControlePong(player1, 0);
    player1.balls[0].x += player1.balls[0].speedX;
    player1.balls[0].y += player1.balls[0].speedY;
    collisionPong(player1, player2, players);
    updatePaddlePong(player1, player2);

    if (game === false)
        return;
    else if (player1.score === 3 || player2.score === 3) {
        if (player1.score === 3){
            players[player1.index].win++;
            players[player2.index].loose++;
            //ici save la win or lose du players[1] ou [0]
        }
        else{
            players[player2.index].win++;
            players[player1.index].loose++;
        }
        let rd = players[player1.index].round - 1;
        console.log('rd == ', rd, ' player1.index == ', player1.index, ' score == ', player1.score, 'players score == ', players[player1.index].score[rd]);
        console.log('rd == ', rd, ' player2.index == ', player2.index, ' score == ', player2.score, 'players score == ', players[player2.index].score[rd]);
        players[player1.index].score[rd] = player1.score;
        players[player2.index].score[rd] = player2.score;
        postMatch(players, player1, player2, rd);
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(0, 0, WIDTH, HEIGHT);
        return;
    }
    else
        requestAnimationFrame(() => updatePong(player1, player2, players));
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
        if (index1 === -1){
            resolve();
            return;
        }
        let player1 = new Player(new Paddle(0, HEIGHT / 2 - 80, 8, 160), mainBall, index1, players[index1].isIa);
        index2 = getPlayer(players);
        let player2 = new Player(new Paddle(WIDTH - 8, HEIGHT / 2 - 80, 8, 160), mainBall, index2, players[index2].isIa);
        
        player1.initControls('w', 's');
        player2.initControls('5', '2');
        const bonus = [swapControls];
        
        drawPongArea(player1, player2);
        updatePong(player1, player2, players);
        
        const checkGameEnd = () => {
            if (player1.score === 3 || player2.score === 3) {
                resolve();
            } else {
                requestAnimationFrame(checkGameEnd);
            }
        };
        checkGameEnd();
    });
    
    button.setAttribute('hx-vals', JSON.stringify({'players': JSON.stringify(players)}));
    button.style.display = 'block';
}