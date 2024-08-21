const canvas = document.getElementById('GameCanvas');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width = 800;
const HEIGHT = canvas.height = 600;
let keys = {};

let paddleWidth = 80, paddleHeight = 8, ballRadius = 8;
let player1X;
let player2X;
let ball1X = WIDTH / 4, ball1Y = 3 * HEIGHT / 4;
let ball2X = 3 * WIDTH / 4, ball2Y = 3 * HEIGHT / 4;
let ball1SpeedX = 4, ball1SpeedY = 4;
let ball2SpeedX = 4, ball2SpeedY = 4;
let brickWidth = 32, brickHeight = 8;
let brickColumns = 25, brickRows = 10;
let bricks = [];

let scorePlayer1 = 0, scorePlayer2 = 0;