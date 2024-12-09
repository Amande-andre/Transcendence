const WIDTH = 800;
const HEIGHT = 600;
const paddleWidth = 100;
const paddleHeight = 10;
let map;
let game = true
let ctx;
let isBonus = false;
keys = {};

class Player {
    constructor(paddle, ball, i, isIa, bonus) {
        
        this.score = 0;
        this.paddles = []; 
        this.balls = [];
        this.bricks = [];
        this.paddles.push(paddle);
        this.balls.push(ball);
        this.spawnBallx = ball.x;
        this.spawnBally = ball.y;
        this.index = i;
        this.isIa = true;
        this.time = new Date();
        this.second = this.time.getSeconds();
        this.input = null;
        this.second = 0;
        this.past = -1;
        this.distance = 0;
        this.lastInput = null;
        this.keyleft = null;
        this.keyright = null;
        this.bonus = false;
        this.color = null;
        this.bounce = 0;
        this.bonusTaken = 0;
    }
    initControls(key1, key2) {
        const time = new Date();

        this.keyleft = key1;
        this.keyright = key2;
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
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.midl = x + (width / 2);
        this.midlPong = y + (height / 2);
        this.color = color;
    }

    drawPaddle() {
        ctx.fillStyle = this.color;
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
        this.midl = this.x + (this.width / 2);
        this.midlPong = this.y + (this.height / 2);
    }
}

class GameInfo{
    constructor() {
        let nbPlaye = 0;
        let playerName = [];
        let color = null;

    }
}
