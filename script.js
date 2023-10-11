//event listener to detect key presses and releases:
let leftPaddleMoveUp = false;
let leftPaddleMoveDown = false;
let rightPaddleMoveUp = false;
let rightPaddleMoveDown = false;

//initialize score
let leftScore = 0;
let rightScore = 0;


document.addEventListener("keydown", function(event) {
    switch(event.key) {
        case "ArrowUp":
            rightPaddleMoveUp = true;
            break;
        case "ArrowDown":
            rightPaddleMoveDown = true;
            break;
        case "w":
            leftPaddleMoveUp = true;
            break;
        case "s":
            leftPaddleMoveDown = true;
            break;
    }
});

document.addEventListener("keyup", function(event) {
    switch(event.key) {
        case "ArrowUp":
            rightPaddleMoveUp = false;
            break;
        case "ArrowDown":
            rightPaddleMoveDown = false;
            break;
        case "w":
            leftPaddleMoveUp = false;
            break;
        case "s":
            leftPaddleMoveDown = false;
            break;
    }
});

document.addEventListener("DOMContentLoaded", function() {

// DOM Elements
const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

// Game variables and constants
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
    //  Implement
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
    
}

function drawPaddles() {
    ctx.fillStyle = "white";
    ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    
}

function drawScores() {
    ctx.font = "30px Arial";
    ctx.fillText(leftScore, canvas.width / 4, 30);
    ctx.fillText(rightScore, (3 * canvas.width) / 4, 30);
}

// Update game's state
function update() {
    // Implement ball movement, paddle collision, etc.

    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top and bottom
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }

     // Left paddle movement
     if (leftPaddleMoveUp && leftPaddle.y > 0) {
        leftPaddle.y -= leftPaddle.dy;
    }
    if (leftPaddleMoveDown && (leftPaddle.y + leftPaddle.height) < canvas.height) {
        leftPaddle.y += leftPaddle.dy;
    }

    // Right paddle movement
    if (rightPaddleMoveUp && rightPaddle.y > 0) {
        rightPaddle.y -= rightPaddle.dy;
    }
    if (rightPaddleMoveDown && (rightPaddle.y + rightPaddle.height) < canvas.height) {
        rightPaddle.y += rightPaddle.dy;
    }

    // Ball collision with paddles, scoring, etc.
    // Ball collision with left paddle
    if (ball.x - ball.radius < leftPaddle.x + leftPaddle.width &&
        ball.x + ball.radius > leftPaddle.x &&
        ball.y - ball.radius < leftPaddle.y + leftPaddle.height &&
        ball.y + ball.radius > leftPaddle.y) {
        ball.dx = -ball.dx; // Change ball direction
    }

    // Ball collision with right paddle
    if (ball.x - ball.radius < rightPaddle.x + rightPaddle.width &&
        ball.x + ball.radius > rightPaddle.x &&
        ball.y - ball.radius < rightPaddle.y + rightPaddle.height &&
        ball.y + ball.radius > rightPaddle.y) {
        ball.dx = -ball.dx; // Change ball direction
    }

    // Scoring
    if (ball.x - ball.radius < 0) { // ball has passed the left side
        rightScore++;
        resetBall();
    }

    if (ball.x + ball.radius > canvas.width) { // ball has passed the right side
        leftScore++;
        resetBall();
    }
}


function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx; // Change ball direction for variety
}

// Main game loop
function gameLoop() {
    // Implement drawing and updating
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    drawBall();
    drawPaddles();
    update();
    requestAnimationFrame(gameLoop);

    drawScores();


    //requestAnimationFrame(gameLoop);
}

//helper function
//generate a random dice value
//return a random number between 1 and 6

function generateDiceValue(){
    //return a random number between 1 and 6
}

//add more helper function if needed

//game initialization

// Initialize the game
gameLoop();
});
