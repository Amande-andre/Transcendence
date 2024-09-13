const canvas = document.getElementById('GameCanvas');
const ctx = canvas.getContext('2d');
const WIDTH = canvas.width = 800;
const HEIGHT = canvas.height = 600;
let keys = {};

class Player {
    constructor(paddle, ball) {
        this.score = 0;
        this.paddles = []; 
        this.balls = [];
        this.bricks = [];
        this.paddles.push(paddle);
        this.balls.push(ball);
        this.spawnBallx = ball.x;
        this.spawnBally = ball.y;
    }

    drawBricks() {
        for (let i = 0; i < this.bricks.length; i++) {
            const brick = this.bricks[i];
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            
            ctx.fillRect(brick.x, brick.y, 32, 16);
            ctx.strokeRect(brick.x, brick.y, 32, 16);
        }
    }
}

class Ball {
    constructor(x, y, speedX, speedY, radius) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.radius = radius;
    }

    drawBall() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }
}

class Paddle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    drawPaddle() {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    update(left, right, limitL, limitR) {
        if (keys[left] && this.x > limitL)
            this.x -= 5;
        else if (keys[right] && this.x + this.width < limitR )
            this.x += 5;
    }
}