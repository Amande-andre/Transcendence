const canvas = document.getElementById('GameCanvas');
const ctx = canvas.getContext('2d');
const WIDTH = canvas.width = 800;
const HEIGHT = canvas.height = 600;
// const button = document.querySelector('button');
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

    initControls(key1, key2) {

        document.addEventListener('keydown', function(event) {  
            if (event.key === key1)
                keys[key1] = true;
            else if (event.key === key2)
                keys[key2] = true;
        });
        document.addEventListener('keyup', function(event) {  
            if (event.key === key1)
                keys[key1] = false;
            else if (event.key === key2)
                keys[key2] = false;
        });
    }
    drawBricks() {
        for (let i = 0; i < this.bricks.length; i++) {
            const brick = this.bricks[i];
            if (brick.bonus !== -1)
                ctx.fillStyle = 'grey';
            else
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
        this.type;
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
    update(key1, key2, limitL, limitR, orientation) {

        let direction = orientation === 'horizontal' ? this.x : this.y;
        let paddleDirection = orientation ==='horizontal' ? this.width : this.height;
        if (keys[key1] && direction > limitL) {
            if (orientation === 'horizontal')
                this.x -= 5;
            else
                this.y -= 5;
        }
        else if (keys[key2] && direction + paddleDirection < limitR ){
            if (orientation === 'horizontal') 
                this.x += 5;
            else
                this.y += 5;
        }
    }
}