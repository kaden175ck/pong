// Game: Pong
// Author: Haoyang Shi
// Date: 10/11
// Global variables
let leftPaddleMoveUp = false;
let leftPaddleMoveDown = false;
let rightPaddleMoveUp = false;
let rightPaddleMoveDown = false;
let leftScore = 0;
let rightScore = 0;
let gameRunning = false;
const SCORE_LIMIT = 5;
let gameInterval;  // Interval ID to control game loop


document.addEventListener("DOMContentLoaded", function() {
    // Game controls
    document.getElementById('startBtn').addEventListener('click', startGame);
    document.getElementById('pauseBtn').addEventListener('click', pauseGame);
    document.getElementById('resetBtn').addEventListener('click', resetGame);
    
    // Keyboard controls
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
});

function initializeGame() {
    // Set initial state
    leftScore = 0;
    rightScore = 0;
    updateScoreDisplay();
    movePaddle('leftPaddle', 0);
    movePaddle('rightPaddle', 0);
    moveBall(390, 190); // Starting ball position
}



function handleKeyDown(event) {
    // Handle paddle movements on key press
    switch(event.keyCode) {
        case 87: leftPaddleMoveUp = true; break;
        case 83: leftPaddleMoveDown = true; break;
        case 38: rightPaddleMoveUp = true; break;
        case 40: rightPaddleMoveDown = true; break;
    }
}

function handleKeyUp(event) {
    // Stop paddle movements on key release
    switch(event.keyCode) {
        case 87: leftPaddleMoveUp = false; break;
        case 83: leftPaddleMoveDown = false; break;
        case 38: rightPaddleMoveUp = false; break;
        case 40: rightPaddleMoveDown = false; break;
    }
}

function movePaddle(paddleID, newPosition) {
    const paddle = document.getElementById(paddleID);
    const gameArea = document.getElementById('gameArea'); // ID set in HTML for game area

    // Boundary checks to ensure paddles don't move outside the game area
    if (newPosition < 0) newPosition = 0;
    if (newPosition + paddle.clientHeight > gameArea.clientHeight) {
        newPosition = gameArea.clientHeight - paddle.clientHeight;
    }

    paddle.style.top = newPosition + "px";
}


function startGame() {
    console.log("Start button clicked");
    initializeGame();
    gameInterval = setInterval(gameLoop, 50); // Run gameLoop every 50ms
}


function pauseGame() {
    console.log("Pause button clicked");
    clearInterval(gameInterval);
}

function resetGame() {
    console.log("Reset button clicked");
    clearInterval(gameInterval);
    initializeGame();
}

function gameLoop() {
    console.log("Game Loop running");
    handlePaddleMovements();
    handleBallMovement();
    checkWinCondition();
}


function handlePaddleMovements() {
    const PADDLE_SPEED = 5;

    // Handle left paddle movement
    if (leftPaddleMoveUp || leftPaddleMoveDown) {
        let currentPos = parseInt(document.getElementById('leftPaddle').style.top) || 0;
        let newPos = leftPaddleMoveUp ? currentPos - PADDLE_SPEED : currentPos + PADDLE_SPEED;
        movePaddle('leftPaddle', newPos);
    }

    // Handle right paddle movement
    if (rightPaddleMoveUp || rightPaddleMoveDown) {
        let currentPos = parseInt(document.getElementById('rightPaddle').style.top) || 0;
        let newPos = rightPaddleMoveUp ? currentPos - PADDLE_SPEED : currentPos + PADDLE_SPEED;
        movePaddle('rightPaddle', newPos);
    }
}

// Placeholder for ball movement logic
function handleBallMovement() {
    // To be implemented in Assignment 3
}

function updateScoreDisplay() {
    // Update displayed scores
    document.getElementById("leftPlayerScore").textContent = leftScore;
    document.getElementById("rightPlayerScore").textContent = rightScore;
}



// Function to check if either player has met the winning condition
// The winning conditon might change in Assignment3.
function checkWinCondition() {
    if (leftScore >= SCORE_LIMIT) {
        alert('Left Player Wins!');
        clearInterval(gameInterval);
        resetGame();
    } else if (rightScore >= SCORE_LIMIT) {
        alert('Right Player Wins!');
        clearInterval(gameInterval);
        resetGame();
    }
}


function moveBall(newX, newY) {
    const ball = document.getElementById("ball");
    ball.style.left = newX + "px";
    ball.style.top = newY + "px";
}