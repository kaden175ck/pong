document.addEventListener("DOMContentLoaded", function() {

// DOM Elements
const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

// Game variables and constants
// TODO: Define ball, paddles, scores, etc.
//game objects and Var
//bal object
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 2,
    dx: 2,  // direction of the ball on the x-axis
    dy: 2   // direction of the ball on the y-axis
};

//paddle object
let leftPaddle = {
    x: 0,
    y: canvas.height / 2 - 50, // center it
    width: 10,
    height: 100,
    dy: 4   // speed of paddle
};

let rightPaddle = {
    x: canvas.width - 10, // on the right side
    y: canvas.height / 2 - 50, // center it
    width: 10,
    height: 100,
    dy: 4
};



// core game function

//draws the ball on the canvas
function drawBall() {
    // TODO: Implement
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
    
}

function drawPaddles() {
    // TODO: Implement
    ctx.fillStyle = "white";
    ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    
}

function drawScores() {
    // TODO: Implement
}

// Update game's state
function update() {
    // TODO: Implement ball movement, paddle collision, etc.

    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top and bottom
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }

    // TODO: Ball collision with paddles, scoring, etc.
}

// Main game loop
function gameLoop() {
    // TODO: Implement drawing and updating
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    drawBall();
    drawPaddles();
    update();
    requestAnimationFrame(gameLoop);


    //requestAnimationFrame(gameLoop);
}

//helper function
//generate a random dice value
//return a random number between 1 and 6

function generateDiceValue(){
    //TODO: return a random number between 1 and 6
}

//todo : add more helper function if needed

//game initialization

// Initialize the game
gameLoop();
});
