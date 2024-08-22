const canvas = document.getElementById('GameCanvas');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width = 800;
const HEIGHT = canvas.height = 600;
let keys = {};

let paddleWidth, paddleHeight, ballRadius;
let player1Y;
let player2Y;
let player1X = WIDTH / 4 - paddleWidth / 2;
let player2X = 3 * WIDTH / 4 - paddleWidth / 2;
let ball1X, ball1Y;
let ball2X = 3 * WIDTH / 4, ball2Y = 3 * HEIGHT / 4;
let ball1SpeedX = 4, ball1SpeedY = 4;
let ball2SpeedX = 4, ball2SpeedY = 4;
let brickWidth = 32, brickHeight = 8;
let brickColumns = 25, brickRows = 20;
let bricks1 = [];
let bricks2 = [];

let scorePlayer1 = 0, scorePlayer2 = 0;