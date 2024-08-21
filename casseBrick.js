const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width = 800;
const HEIGHT = canvas.height = 600;
let keys = {};

let paddleWidth = 80, paddleHeight = 8, ballRadius = 8;
let player1X = WIDTH / 4 - paddleWidth / 2;
let player2X = 3 * WIDTH / 4 - paddleWidth / 2;
let ball1X = WIDTH / 4, ball1Y = 3 * HEIGHT / 4;
let ball2X = 3 * WIDTH / 4, ball2Y = 3 * HEIGHT / 4;
let ball1SpeedX = 4, ball1SpeedY = 4;
let ball2SpeedX = 4, ball2SpeedY = 4;
let brickWidth = 32, brickHeight = 8;
let brickColumns = 25, brickRows = 10;
let bricks = [];

let scorePlayer1 = 0, scorePlayer2 = 0;

function drawRec(x, y) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
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

function updatePaddle() {
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

function fillBricks() {
}

function drawBricks() {
}

function Collision() {
    // Ball 1
    //Wall
    if (ball1X + ballRadius > WIDTH / 2 || ball1X - ballRadius < 0)
        ball1SpeedX = -ball1SpeedX;
    if (ball1Y + ballRadius > HEIGHT || ball1Y - ballRadius < 0)
        ball1SpeedY = -ball1SpeedY;
    //Paddle
    if (ball1Y + ballRadius > HEIGHT - paddleHeight && ball1X > player1X && ball1X < player1X + paddleWidth)
        ball1SpeedY = -ball1SpeedY;
    // Ball 2
    //Wall
    if (ball2X - ballRadius < WIDTH / 2 || ball2X + ballRadius > WIDTH)
        ball2SpeedX = -ball2SpeedX;
    if (ball2Y + ballRadius > HEIGHT || ball2Y - ballRadius < 0)
        ball2SpeedY = -ball2SpeedY;
    //Paddle
    if (ball2Y + ballRadius > HEIGHT - paddleHeight && ball2X > player2X && ball2X < player2X + paddleWidth)
        ball2SpeedY = -ball2SpeedY;
}

function update() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    displayScore();

    ctx.fillStyle = 'white';
    ctx.fillRect(WIDTH / 2 - 16, 0, 32, HEIGHT);
    ctx.fillStyle = 'black';
    ctx.fillRect(WIDTH / 2 - 14, 0, 28, HEIGHT);
    drawRec(player1X, HEIGHT - paddleHeight);
    drawRec(player2X, HEIGHT - paddleHeight);

    drawBall(ball1X, ball1Y);
    drawBall(ball2X, ball2Y);

    ball1X += ball1SpeedX;
    ball1Y += ball1SpeedY;
    ball2X += ball2SpeedX;
    ball2Y += ball2SpeedY;
    Collision();
    
    updatePaddle();
    requestAnimationFrame(update);
}

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
update();