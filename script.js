/*
Course: SENG 513 
Date: OCT 16, 2023 
Assignment 2 
Name: Haoyang Shi 
UCID: 30105296 

    All pictures download from https://unsplash.com, and meet the CC0 criteria
    ............see pictures details in README file
*/




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
let gameMode = '2P'; 
let difficulty = 'easy'; 
let leftPaddle, rightPaddle, ballElement, gameArea;
const INITIAL_X_VALUE_FOR_AIPADDLE = 700;  
const INITIAL_Y_VALUE_FOR_AIPADDLE = 200;  

let ball = {
    x: 390, 
    y: 190,
    dx: 3,    
    dy: 2   
};

let aiPaddle = {
    x: INITIAL_X_VALUE_FOR_AIPADDLE,  // X position
    y: INITIAL_Y_VALUE_FOR_AIPADDLE   // Y position
};


document.addEventListener("DOMContentLoaded", function() {
        // Cache DOM elements
        leftPaddle = document.getElementById('leftPaddle');
        rightPaddle = document.getElementById('rightPaddle');
        ballElement = document.getElementById('ball');
        gameArea = document.getElementById('gameArea');

        // Game controls
        document.getElementById('startBtn').addEventListener('click', startGame);
        document.getElementById('pauseBtn').addEventListener('click', pauseGame);
        document.getElementById('resetBtn').addEventListener('click', resetGame);
        
        // Keyboard controls
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        // Theme selector event
        document.getElementById('themeSelector').addEventListener('change', function() {
            let selectedTheme = this.value;
            gameArea.className = "";  // Clear any existing theme classes
            if (selectedTheme !== 'default') {
                gameArea.classList.add(selectedTheme);  // new theme class
            }
        });


        document.getElementById('ballColorSelector').addEventListener('change', function() {
            let selectedColor = this.value;
            if (selectedColor === 'default') {
                ballElement.style.backgroundColor = 'black';
            } else {
                ballElement.style.backgroundColor = selectedColor;
            }
        });
        
});


function initializeGame() {
    // Set initial state using global objects
    leftScore = 0;
    rightScore = 0;
    updateScoreDisplay();
    movePaddle(leftPaddle, 0);
    moveBall(ball.x, ball.y);

    // If gameMode is 1P, then set AI paddle position
    if (gameMode === '1P') {
        aiPaddle.x = INITIAL_X_VALUE_FOR_AIPADDLE;
        aiPaddle.y = INITIAL_Y_VALUE_FOR_AIPADDLE;
        movePaddle(rightPaddle, aiPaddle.y);
    } else if (gameMode === '2P') {
        movePaddle(rightPaddle, 0);
    }
}


function handleKeyDown(event) {
    // Handle paddle movements on key press
    switch(event.keyCode) {
        case 87: leftPaddleMoveUp = true; break;
        case 83: leftPaddleMoveDown = true; break;
        // Check if gameMode is 2P before accepting input for right paddle
        case 38: if (gameMode === '2P') rightPaddleMoveUp = true; break;
        case 40: if (gameMode === '2P') rightPaddleMoveDown = true; break;
    }
}


function handleKeyUp(event) {
    // Stop paddle movements on key release
    switch(event.keyCode) {
        case 87: leftPaddleMoveUp = false; break;
        case 83: leftPaddleMoveDown = false; break;
        // Check if gameMode is 2P before accepting input for right paddle
        case 38: if (gameMode === '2P') rightPaddleMoveUp = false; break;
        case 40: if (gameMode === '2P') rightPaddleMoveDown = false; break;
    }
}


function movePaddle(paddleElement, newPosition) {
    // Boundary checks using cached gameArea
    if (newPosition < 0) newPosition = 0;
    if (newPosition + paddleElement.clientHeight > gameArea.clientHeight) {
        newPosition = gameArea.clientHeight - paddleElement.clientHeight;
    }

    paddleElement.style.top = newPosition + "px";
}

function startGame() {
    console.log("Start button clicked");
    if (gameRunning) {
        return; // Exit the function if the game is already running
    }
    gameRunning = true; // Set the flag to true
    initializeGame();
    gameInterval = setInterval(gameLoop, 50); // Run gameLoop every 50ms
}

function pauseGame() {
    console.log("Pause button clicked");
    gameRunning = false; 
    clearInterval(gameInterval);
}

function resetGame() {
    console.log("Reset button clicked");
    gameRunning = false; 
    clearInterval(gameInterval);
    initializeGame();
}

function gameLoop() {
    console.log("Game Loop running");
    handlePaddleMovements();
    handleBallMovement();
    checkWinCondition();
    
    if (gameMode === 'AI') {
        moveAIPaddle();
        applyAIPaddleMovement();
    }
}


function handlePaddleMovements() {
    const PADDLE_SPEED = 5;

    // Handle left paddle movement
    if (leftPaddleMoveUp || leftPaddleMoveDown) {
        let currentPos = parseInt(leftPaddle.style.top) || 0;
        let newPos = leftPaddleMoveUp ? currentPos - PADDLE_SPEED : currentPos + PADDLE_SPEED;
        movePaddle(leftPaddle, newPos);
    }

    // Handle right paddle movement
    if (rightPaddleMoveUp || rightPaddleMoveDown) {
        let currentPos = parseInt(rightPaddle.style.top) || 0;
        let newPos = rightPaddleMoveUp ? currentPos - PADDLE_SPEED : currentPos + PADDLE_SPEED;
        movePaddle(rightPaddle, newPos);
    }
}


// Ball movement logic
function handleBallMovement() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Collision with top wall
    if (ball.y <= 0) {
        ball.y = 0;
        ball.dy = -ball.dy;  // Reverse the Y direction
    }
    // Collision with bottom wall
    if (ball.y + ballElement.clientHeight >= gameArea.clientHeight) {
        ball.y = gameArea.clientHeight - ballElement.clientHeight;
        ball.dy = -ball.dy;  // Reverse the Y direction
    }


     // Collision with left paddle
     if (ball.x <= leftPaddle.offsetLeft + leftPaddle.clientWidth &&
        ball.y + ballElement.clientHeight >= leftPaddle.offsetTop &&
        ball.y <= leftPaddle.offsetTop + leftPaddle.clientHeight) {
        ball.dx = -ball.dx;  // Reverse the X direction
    }

    // Collision with right paddle
    if (ball.x + ballElement.clientWidth >= rightPaddle.offsetLeft &&
        ball.y + ballElement.clientHeight >= rightPaddle.offsetTop &&
        ball.y <= rightPaddle.offsetTop + rightPaddle.clientHeight) {
        ball.dx = -ball.dx;  // Reverse the X direction
    }


    // Ball passes the left paddle (Right player scores)
    if (ball.x <= 0) {
        rightScore++;
        updateScoreDisplay();
        ball.x = 390; // Reset ball to center
        ball.y = 190;
        ball.dx = 3;  // Reset ball direction to initial
        ball.dy = 2;
    }

    // Ball passes the right paddle (Left player scores)
    if (ball.x + ballElement.clientWidth >= gameArea.clientWidth) {
        leftScore++;
        updateScoreDisplay();
        ball.x = 390; // Reset ball to center
        ball.y = 190;
        ball.dx = -3;  // Reset ball direction to initial but to the left
        ball.dy = 2;
    }

    moveBall(ball.x, ball.y);
}


function updateScoreDisplay() {
    // Update displayed scores
    document.getElementById("leftPlayerScore").textContent = leftScore;
    document.getElementById("rightPlayerScore").textContent = rightScore;
}


// Function to check if either player has met the winning condition
// Might change in next Iteration.
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


function toggleAIDifficulty() {
    const aiDifficultyDiv = document.getElementById('aiDifficulty');

    // Toggle the display property based on its current value
    if (aiDifficultyDiv.style.display === "none" || aiDifficultyDiv.style.display === "") {
        aiDifficultyDiv.style.display = "block";
    } else {
        aiDifficultyDiv.style.display = "none";
    }
}


function setDifficulty(level) {
    difficulty = level;
}


function moveAIPaddle() {
    let aiSpeed;

    switch(difficulty) {
        case 'easy': aiSpeed = 2; break;
        case 'medium': aiSpeed = 4; break;
        case 'hard': aiSpeed = 6; break;
    }

    if (ball.y > aiPaddle.y) {
        aiPaddle.y += aiSpeed;
    } else {
        aiPaddle.y -= aiSpeed;
    }

    // Ensure AI paddle doesn't move off the screen
    if (aiPaddle.y < 0) aiPaddle.y = 0;
    if (aiPaddle.y + rightPaddle.clientHeight > gameArea.clientHeight) {
        aiPaddle.y = gameArea.clientHeight - rightPaddle.clientHeight;
    }
}

function applyAIPaddleMovement() {
    movePaddle(rightPaddle, aiPaddle.y);
}