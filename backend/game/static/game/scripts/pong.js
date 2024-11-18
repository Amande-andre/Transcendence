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
    for (let ball of player1.balls) {
        // Check collision with paddles
        for (let paddle of player1.paddles) {
            if (ball.x + ball.radius > paddle.x &&
                ball.x - ball.radius < paddle.x + paddle.width &&
                ball.y > paddle.y &&
                ball.y < paddle.y + paddle.height) {
                
                // Reverse the horizontal direction
                ball.speedX = -ball.speedX;
                
                // Calculate new vertical speed based on where the ball hit the paddle
                let hitPos = (ball.y - paddle.y) / paddle.height;
                
                // Adjust the multiplier to control the maximum vertical speed
                let maxSpeedY = 8;  // Maximum vertical speed
                
                // Use a sine function to create a more balanced curve
                ball.speedY = Math.sin((hitPos - 0.5) * Math.PI) * maxSpeedY;
                
                // Ensure a minimum vertical speed to prevent straight horizontal bounces
                let minSpeedY = 2;
                if (Math.abs(ball.speedY) < minSpeedY) {
                    ball.speedY = ball.speedY > 0 ? minSpeedY : -minSpeedY;
                }
            }
        }
        for (let paddle of player2.paddles) {
            if (ball.x + ball.radius > paddle.x &&
                ball.x - ball.radius < paddle.x + paddle.width &&
                ball.y > paddle.y &&
                ball.y < paddle.y + paddle.height) {
                
                // Reverse the horizontal direction
                ball.speedX = -ball.speedX;
                
                // Calculate new vertical speed based on where the ball hit the paddle
                let hitPos = (ball.y - paddle.y) / paddle.height;
                
                // Adjust the multiplier to control the maximum vertical speed
                let maxSpeedY = 8;  // Maximum vertical speed
                
                // Use a sine function to create a more balanced curve
                ball.speedY = Math.sin((hitPos - 0.5) * Math.PI) * maxSpeedY;
                
                // Ensure a minimum vertical speed to prevent straight horizontal bounces
                let minSpeedY = 2;
                if (Math.abs(ball.speedY) < minSpeedY) {
                    ball.speedY = ball.speedY > 0 ? minSpeedY : -minSpeedY;
                }
            }
        }
        if (ball.y + ball.radius > HEIGHT || ball.y - ball.radius < 0) {
            ball.speedY = -ball.speedY;
        }
        if (ball.x - ball.radius < 0) {
            player1.balls.splice(player1.balls.indexOf(ball), 1);
            player2.balls.splice(player2.balls.indexOf(ball), 1);
            newBall = new Ball(player1.spawnBallx, player1.spawnBally, 5, 5, 8)
            player1.balls.push(newBall);
            player2.balls.push(newBall);
            player1.score++;
            players[player1.index].score[players[player1.index].round] = player1.score;
        }
        if (ball.x + ball.radius > WIDTH) {
            player1.balls.splice(player1.balls.indexOf(ball), 1);
            player2.balls.splice(player2.balls.indexOf(ball), 1);
            newBall = new Ball(player1.spawnBallx, player1.spawnBally, 5, 5, 8)
            player1.balls.push(newBall);
            player2.balls.push(newBall);
            player2.score++;
            players[player2.index].score[players[player2.index].round] = player2.score;
        }
    }
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
}

function calculePositions(player) {
    let mid = player.paddles[0].midlPong;
    let ball = player.balls[0].x;
    let x = player.balls[0].x;
    let y = player.balls[0].y;
    let speedX = player.balls[0].speedX;
    let speedY = player.balls[0].speedY;

    if (speedX < 0){
        for (i = x; x > 0; i-=5){
            x += speedX;
            y += speedY;
            if (y >= HEIGHT || y <= 0){
                speedY = speedY * -1;
            }
        }
        //draw a pixel at the coordonate x, y
    }
    else {
        for (i = x; x < WIDTH; i++){
            x += speedX;
            y += speedY;
            if (y >= HEIGHT || y <= 0){
                speedY = speedY * -1;
            }
        }
    }
    return y;
}

function choiceIaPong(player, nb)  {
        
    //faire les calcule de diff avant et toujours comparer entre un scope ex si >40 et <400 par exemple
    let halfP = player.paddles[0].height / 2;
    let top = player.paddles[0].y;
    let bot = player.paddles[0].y + player.paddles[0].height;
    //regarde si la balle est a droite si oui il se place au milieu
    let pos = calculePositions(player);
    if (player.balls[0].speedX < 0){
        console.log('pos == ', pos);
        console.log('bot == ', bot);
        console.log('top == ', top);        
        if (pos > bot){
            player.distance = pos - bot;
            player.lastInput = 's';
        }
        else if (pos < top){
            player.distance = top - pos;
            player.lastInput = 'w';
        }
        else {
            player.distance = 0;
            return null;
        }

        console.log('player.distance == ', player.distance);

        player.distance = player.distance / 300 * 1000;
        console.log('player.distance 1 == ', player.distance);
        return player.lastInput;
    }
    
    // else if (player.balls[0].speedX > 0 && player.balls[0].x < WIDTH / 2){
    //     if (mid + 100 > HEIGHT / 2){
    //         player.distance = 100;
    //         return 'w';
    //     }
    //     else if (mid - 100 < HEIGHT / 2) {
    //         player.distance = 100;
    //         return 's';
    //     }
    // }
    player.distance = 0;

    return null;
}

function IaControlePong(player, nb) {
    
    if (!player.isIa)
        return;
    player.second = new Date().getSeconds();
    if (player.second === player.past){ 
        return;
    }
    console.log('player.second == ', player.second);
    let eventup = new KeyboardEvent('keyup', {
        key: player.lastInput,
    });
    document.dispatchEvent(eventup);
    // 
    player.past = player.second;
    let eventTab = choiceIaPong(player, nb);
    console.log('====================');
    if (eventTab === null){
        
        return;
    }
    otherevent = eventTab === 'w' ? 's' : 'w';
    let eventdown = new KeyboardEvent('keydown', {
        key: eventTab,
    });
    document.dispatchEvent(eventdown);
    if (player.distance < 500){
        if (player.distance < 50)
            player.distance += 50;
        setTimeout(() => {
            document.dispatchEvent(eventup);
            console.log('player.distance 2 == ', player.distance);
        }, player.distance);
    }
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
        }
        else{
            players[player2.index].win++;
            players[player1.index].loose++;
        }
        players[player1.index].round++;
        players[player2.index].round++;
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
    players = JSON.parse(playersData.replace(/'/g, '"'));
    return players;
}

function getPlayer(players) {
    
    let lowestRound = 0;
    for (let i = 0; i < players.length; i++) {
        if (players[i].loose === 0){
            if (players[i].round <= lowestRound){
                lowestRound = players[i].round;
            }
        }
    }
    for (let i = 0; i < players.length; i++) {
        console.log('players here ', players[i].loose, ' ', players[i].round, ' ', lowestRound);

        if (players[i].loose === 0 && players[i].round === lowestRound){
            players[i].round++;
            console.log('players[i].round == ', players[i].round,' i = ', i);
            return i;
        }
    }
    console.log('playe ', lowestRound);
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
        let player1 = new Player(new Paddle(0, HEIGHT / 2 - 80, 8, 160), mainBall, index1);
        console.log('players', players);
        getPlayer(players);
        let player2 = new Player(new Paddle(WIDTH - 8, HEIGHT / 2 - 80, 8, 160), mainBall, getPlayer(players));
        console.log('players', players);

        player1.initControls('w', 's');
        player2.initControls('5', '2');

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
    listplayers = [players];
    console.log('players', listplayers);
    console.log('button', button);
    button.setAttribute('hx-vals', JSON.stringify({'players': JSON.stringify(players)}));
    console.log('button', button);
    button.style.display = 'block';
}