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

function collisionPong(player1, player2) {
    for (let ball of player1.balls) {
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
        }
        if (ball.x + ball.radius > WIDTH) {
            player1.balls.splice(player1.balls.indexOf(ball), 1);
            player2.balls.splice(player2.balls.indexOf(ball), 1);
            newBall = new Ball(player1.spawnBallx, player1.spawnBally, 5, 5, 8)
            player1.balls.push(newBall);
            player2.balls.push(newBall);
            player2.score++;
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
        for (i = x; x > 0; i--){
            x += speedX;
            y += speedY;
            if (y >= HEIGHT || y <= 0){
                speedY = speedY * -1;
            }
        }
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
    let mid = player.paddles[0].midlPong;
    let top = player.paddles[0].y;
    let bot = player.paddles[0].y + player.paddles[0].height;
    let ball = player.balls[0].x;
    //regarde si la balle est a droite si oui il se place au milieu
    let pos = calculePositions(player);
    if (player.balls[0].speedX < 0){
        console.log('pos == ', pos);
        console.log('bot == ', bot);
        console.log('top == ', top);        
        if (pos > bot){
            player.distance = pos - bot;
            player.lastInput = 's';
            console.log('s');
            return 's';
        }
        else if (pos < top){
            player.distance = top - pos;
            player.lastInput = 'w';
            console.log('w');
            return 'w';
        }
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
    // document.dispatchEvent(player.lastInput);
    let eventdown = new KeyboardEvent('keydown', {
        key: eventTab,
    });
    //document.dispatchEvent(eventup);
    document.dispatchEvent(eventdown);
    if (player.distance > 20 && player.distance < 300){
        setTimeout(() => {
            if (player.distance < 50)
                player.distance = 150;
            console.log('player.distance == ', player.distance + 100);
            //0.3 j avance de 160
            document.dispatchEvent(eventup);
        }, player.distance);
        
    }
    //console.log('after seconde is  == ', new Date().getSeconds());
}

function updatePong(player1, player2) {

    drawPongArea(player1, player2);
    player2.isIa = false;
    IaControlePong(player1, 0);
    player1.balls[0].x += player1.balls[0].speedX;
    player1.balls[0].y += player1.balls[0].speedY;
    collisionPong(player1, player2);
    updatePaddlePong(player1, player2);
    
    if (game === false)
        return;
    if (player1.score === 3 || player2.score === 3) {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(0, 0, WIDTH, HEIGHT);
        if (player1.score === 3)
            ctx.fillText('WIN', 100, 50);
        else
            ctx.fillText('WIN', WIDTH - 140, 50);
        setTimeout(() => {
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
        }, 1000)
        return;
    }
    requestAnimationFrame(() => updatePong(player1, player2, ));
}

function startPong() {
    game = true;
    mainBall = new Ball(WIDTH / 2, HEIGHT / 2, 5, 5, 8);
    let player1 = new Player(new Paddle(0, HEIGHT / 2 - 80, 8, 160), mainBall);
    let player2 = new Player(new Paddle(WIDTH - 8, HEIGHT / 2 - 80, 8, 160), mainBall);
    // const bonus = [newBall, increasePaddle];

    player1.initControls('w', 's');
    player2.initControls('5', '2');

    drawPongArea(player1, player2);
    updatePong(player1, player2, );
}
