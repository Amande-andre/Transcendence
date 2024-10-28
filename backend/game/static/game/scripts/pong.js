// document.getElementById('pong-button').addEventListener('click', function () {
//     const canvas = document.getElementById('pongCanvas');
//     if (canvas.style.display === 'none') {
//         canvas.style.display = 'block';  // Affiche le canvas au centre de la page
//         canvas.style.margin = '0 auto';  // Centrer horizontalement
//         startPong();  // Lancer le jeu Pong
//     }
// });
window.onload = function () {
	const canvas = document.getElementById('GameCanvas');
	const ctx = canvas.getContext('2d');
	const WIDTH = canvas.width = 800;
	const HEIGHT = canvas.height = 600;
	
	// const button = document.querySelector('button');
	let keys = {};
	// Function to get a cookie value by name
	// function getCookie(name) {
	//     let cookieValue = null;
	//     if (document.cookie && document.cookie !== '') {
	//         const cookies = document.cookie.split(';');
	//         for (let i = 0; i < cookies.length; i++) {
	//             const cookie = cookies[i].trim();
	//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
	//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	//                 break;
	//             }
	//         }
	//     }
	//     return cookieValue;
	// }
	
	// // Get the CSRF token from cookies
	// const csrftoken = getCookie('csrftoken');  // Make sure this runs before using it
	
	
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
			this.isIa = true;
			this.time = new Date();
			this.second = this.time.getSeconds();
			this.input = null;
			this.second = 0;
			this.past = -1;
		}
		initControls(key1, key2) {
				const time = new Date();
	
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
			this.midl = x + (width / 2);
			this.midlPong = y + (height / 2);
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
	let gameInfo = new GameInfo();

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

function choiceIaPong(player, nb)  {
        
    //faire les calcule de diff avant et toujours comparer entre un scope ex si >40 et <400 par exemple
    let halfP = player.paddles[0].height / 2;
    let mid = player.paddles[0].midlPong;
    let ball = player.balls[0].x;
    //regarde si la balle est a droite si oui il se place au milieu
    if (nb === 0) {
        if (player.balls[0].x < WIDTH / 3){
            if (mid > HEIGHT / 2 + halfP){
                this.input = 's';
                console.log('pos ball 1 == ', ball, 'pos paddle == ', mid, ' move chose = ' , this.input);
                return 's';
            }
            else if (mid < HEIGHT / 2 - halfP){
                this.input = 'w';
                console.log('pos ball 2 == ', ball, 'pos paddle == ', mid, ' move chose = ' , this.input);

                return 'w';
            }
            else 
                return null;
        } //dessous c est pour choisir quand la balle est cote iA
        if (ball - mid  > 20){
            this.input = 's';
            console.log('ball 3 == ', ball, 'paddle == ', mid);
            console.log('diff 3 == ', ball - mid, ' move chose = ', this.input);

            return 's';
        }
        else if (ball - mid < -20){
            this.input = 'w';
            console.log('ball 4 == ', ball, 'paddle == ', mid);
            console.log('diff 4 == ', ball - mid, ' move chose = ', this.input);

            return 'w';
        }
        else {
            console.log('pos ball 5 == ', player.balls[0].y, 'pos paddle == ', mid, ' move chose = ' , this.input);

            return null;
        }
    }
}

function IaControlePong(player, nb) {
    
    if (!player.isIa)
        return;
    player.second = new Date().getSeconds();
    if (player.second <= player.past && (player.second !== 0 && player !== 59)){ 
        return;
    }       
    console.log('player.second == ', player.second);
    player.past = player.second;
    //player.past = player.second ;
    let eventTab = choiceIaPong(player, nb);
    otherevent = eventTab === 'w' ? 's' : 'w';
    // if (player.input === eventTab){
    //     return;
    // }
    if (eventTab === null)
        return;
    //vv envoyer un touple dont le deuxieme est le temps d attente pour le key up.
    //temps d attente === 0 quand le paddle arrive a la coordonnee de la balle
    let eventdown = new KeyboardEvent('keyup', {
        key: otherevent,
    });
    let eventup = new KeyboardEvent('keydown', {
        key: eventTab,
    });
    document.dispatchEvent(eventup);
    //document.dispatchEvent(eventup);
    document.dispatchEvent(eventdown);
    // setTimeout(() => {
    //     document.dispatchEvent(eventup);
    // }, 500);
    //console.log('after seconde is  == ', new Date().getSeconds());
}

function updatePong(player1, player2, bonus) {

    drawPongArea(player1, player2);
    player2.isIa = false;
    IaControlePong(player1, 0);
    player1.balls[0].x += player1.balls[0].speedX;
    player1.balls[0].y += player1.balls[0].speedY;
    collisionPong(player1, player2);
    updatePaddlePong(player1, player2);
    
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
    requestAnimationFrame(() => updatePong(player1, player2, bonus));
}

function startPong() {
    mainBall = new Ball(WIDTH / 2, HEIGHT / 2, 5, 5, 8);
    let player1 = new Player(new Paddle(0, HEIGHT / 2 - 80, 8, 160), mainBall);
    let player2 = new Player(new Paddle(WIDTH - 8, HEIGHT / 2 - 80, 8, 160), mainBall);
    const bonus = [newBall, increasePaddle];

    player1.initControls('w', 's');
    player2.initControls('5', '2');

    drawPongArea(player1, player2);
    updatePong(player1, player2, bonus);
}

startPong();
};