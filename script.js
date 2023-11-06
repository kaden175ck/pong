/*
Course: SENG 513 
Date: OCT 30, 2023 
Assignment 3
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
let SCORE_LIMIT = 5;
let gameInterval;  // Interval ID to control game loop
let gameMode = '2P'; 
let difficulty = 'easy'; 
let leftPaddle, rightPaddle, ballElement, gameArea;
const INITIAL_X_VALUE_FOR_AIPADDLE = 700;  
const INITIAL_Y_VALUE_FOR_AIPADDLE = 200;  
let aiSpeed = 4; // Ai speed adjustment
let mode = "";  
let speedSlider;
let speedValue;

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


function initializeGame() {
    
    // Set initial state using global objects
    leftScore = 0;
    rightScore = 0;
    updateScoreDisplay();
    movePaddle(leftPaddle, 0);
    moveBall(ball.x, ball.y);

    // Use gameMode to initialize
    if (gameMode === '1P') {
        aiPaddle.x = INITIAL_X_VALUE_FOR_AIPADDLE;
        aiPaddle.y = INITIAL_Y_VALUE_FOR_AIPADDLE;
        movePaddle(rightPaddle, aiPaddle.y);
        switch (difficulty) {
            case 'easy':
                aiSpeed = 2;
                break;
            case 'medium':
                aiSpeed = 4;
                break;
            case 'hard':
                aiSpeed = 6;
                break;
        }
    } else if (gameMode === '2P') {
        movePaddle(rightPaddle, 0);
    }
}


document.addEventListener("DOMContentLoaded", function() {

    // Cache DOM elements
    leftPaddle = document.getElementById('leftPaddle');
    rightPaddle = document.getElementById('rightPaddle');
    ballElement = document.getElementById('ball');
    gameArea = document.getElementById('gameArea');
    speedSlider = document.getElementById('speedSlider');
    speedValue = document.getElementById('speedValue');

    // Game controls
    document.getElementById('startBtn').addEventListener('click', startGame);
    document.getElementById('pauseBtn').addEventListener('click', pauseGame);
    document.getElementById('resetBtn').addEventListener('click', resetGame);
    
    // Keyboard controls
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    document.getElementById('setScoreLimit').addEventListener('click', function() {
        let inputScoreLimit = document.getElementById('scoreLimit').value;
        if (inputScoreLimit && inputScoreLimit > 0) {
            SCORE_LIMIT = parseInt(inputScoreLimit);
            console.log(`New SCORE_LIMIT set: ${SCORE_LIMIT}`);
        } else {
            console.log('Invalid input for SCORE_LIMIT');
        }
    });

    // Theme selector event
    document.getElementById('themeSelector').addEventListener('change', function() {
        let selectedTheme = this.value;
        gameArea.className = "";  
        if (selectedTheme !== 'default') {
            gameArea.classList.add(selectedTheme);  
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
    
    // Event listener for 2 Player mode
    document.getElementById('twoPlayerMode').addEventListener('click', function() {
        gameMode = '2P';
        this.classList.add('highlighted'); // Highlight the button
        clearHighlightsAndHideDropdown();
    });

    // Event listener for 1 Player mode (AI)
    document.getElementById('onePlayerMode').addEventListener('click', function() {
        gameMode = '1P';
        this.classList.add('highlighted');
        // Show the difficulty selection
        document.getElementById('aiDifficulty').style.display = 'block';
    });

    // Event listeners for AI difficulty modes
    document.getElementById('easyMode').addEventListener('click', function() {
        difficulty = 'easy';
        aiSpeed = 2;
        this.classList.add('highlighted');
        clearHighlightsAndHideDropdown();
    });
    document.getElementById('mediumMode').addEventListener('click', function() {
        difficulty = 'medium';
        aiSpeed = 4;
        this.classList.add('highlighted');
        clearHighlightsAndHideDropdown();
    });
    document.getElementById('hardMode').addEventListener('click', function() {
        difficulty = 'hard';
        aiSpeed = 6;
        this.classList.add('highlighted');
        clearHighlightsAndHideDropdown();
    });

    speedSlider.addEventListener('input', function() {
        let speedFactor = parseFloat(speedSlider.value) / 50; 
        ball.dx = 3 * speedFactor;
        ball.dy = 2 * speedFactor;
        speedValue.textContent = speedSlider.value;
    });

    document.getElementById('playAgainBtn').addEventListener('click', function() {
        // Reset game logic 
        initializeGame();
        // Hide overlay
        let overlay = document.getElementById('gameOverlay');
        overlay.style.display = 'none';
    });
});


// Helper function to clear all highlights and hide dropdown
function clearHighlightsAndHideDropdown() {
    // Remove highlighted class from all buttons
    document.querySelectorAll('#gameModeDropdown .dropdown-content button').forEach(button => {
        button.classList.remove('highlighted');
    });
    // Hide the dropdown content after a brief delay
    setTimeout(() => {
        document.getElementById('aiDifficulty').style.display = 'none';
        document.querySelector('#gameModeDropdown .dropdown-content').style.display = 'none';
    }, 500); 
}


// Handle paddle movements on key press
function handleKeyDown(event) {
    switch(event.keyCode) {
        case 87: // 'W' key
            leftPaddleMoveUp = true;
            event.preventDefault(); // Prevent the page from scrolling
            break;
        case 83: // 'S' key
            leftPaddleMoveDown = true;
            event.preventDefault(); 
            break;
        // Check if gameMode is 2P before accepting input for right paddle
        case 38: // Up arrow
            if (gameMode === '2P') rightPaddleMoveUp = true;
            event.preventDefault(); 
            break;
        case 40: // Down arrow
            if (gameMode === '2P') rightPaddleMoveDown = true;
            event.preventDefault(); 
            break;
    }
}


// Stop paddle movements on key release
function handleKeyUp(event) {
    switch(event.keyCode) {
        case 87: // 'W' key
            leftPaddleMoveUp = false;
            event.preventDefault(); 
            break;
        case 83: // 'S' key
            leftPaddleMoveDown = false;
            event.preventDefault(); 
            break;
        // Check if gameMode is 2P before accepting input for right paddle
        case 38: // Up arrow
            if (gameMode === '2P') rightPaddleMoveUp = false;
            event.preventDefault(); 
            break;
        case 40: // Down arrow
            if (gameMode === '2P') rightPaddleMoveDown = false;
            event.preventDefault(); 
            break;
    }
}


function startGame() {
    console.log("Start button clicked");
    if (gameRunning) {
        return; // Exit the function if the game is already running
    }
    gameRunning = true; // Set the flag to true
    initializeGame();
    requestAnimationFrame(gameLoop);
}


function pauseGame() {
    console.log("Pause button clicked");
    gameRunning = false; 
    clearInterval(gameInterval);
}


function resetGame() {
    // Reload the page from the server
    window.location.reload(true);
}


function gameLoop() {
    if (gameRunning) {
        handlePaddleMovements();
        handleBallMovement();
        checkWinCondition();

        if (gameMode === '1P') {
            moveAIPaddle();
            applyAIPaddleMovement();
        }

        requestAnimationFrame(gameLoop);
    }
}


function resetBall(initialX, initialY, initialDx, initialDy) {
    ball.x = initialX;
    ball.y = initialY;
    ball.dx = initialDx;
    ball.dy = initialDy;
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
        resetBall(390, 190, 3, 2);  // Use initial values
    }

    // Ball passes the right paddle (Left player scores)
    if (ball.x + ballElement.clientWidth >= gameArea.clientWidth) {
        leftScore++;
        updateScoreDisplay();
        resetBall(390, 190, -3, 2);  // Use initial values but with negative dx
    }

    moveBall(ball.x, ball.y);
}


function moveAIPaddle() {
    let ballCenter = ball.y + 5; 
    let aiPaddleCenter = aiPaddle.y + 25; 
    let predictY; // Predicted Y-position for the ball when it reaches the AI paddle

    switch (difficulty) {
        case 'easy':
            predictY = ball.y; // No prediction, just follow
            break;
        case 'medium':
            predictY = ball.y + ball.dy * 30; // Some prediction
            break;
        case 'hard':
            predictY = ball.y + ball.dy * 60; // Strong prediction
            break;
    }

    if (predictY > aiPaddleCenter) {
        aiPaddle.y += aiSpeed;
    } else if (predictY < aiPaddleCenter) {
        aiPaddle.y -= aiSpeed;
    }
}


function applyAIPaddleMovement() {
    movePaddle(rightPaddle, aiPaddle.y);
}


function movePaddle(paddleElement, newYPosition) {
    if (newYPosition < 0) {
        newYPosition = 0;
    } else if (newYPosition + paddleElement.clientHeight > gameArea.clientHeight) {
        newYPosition = gameArea.clientHeight - paddleElement.clientHeight;
    }
    paddleElement.style.top = newYPosition + 'px';
}


function moveBall(newX, newY) {
    const ball = document.getElementById("ball");
    ball.style.left = newX + "px";
    ball.style.top = newY + "px";
    if (mode === "1p") {
        // Adjust the right paddle's top based on ball's position
        if (ball.offsetTop > rightPaddle.offsetTop + paddleHeight / 2) {
            rightPaddle.style.top = `${Math.min(gameHeight - paddleHeight, rightPaddle.offsetTop + aiSpeed)}px`;
        } else {
            rightPaddle.style.top = `${Math.max(0, rightPaddle.offsetTop - aiSpeed)}px`;
        }
    }
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


function announceWinner(winner) {
    let announcement = document.getElementById('winnerAnnouncement');
    announcement.textContent = winner + ' wins!';
    
    // Show overlay
    let overlay = document.getElementById('gameOverlay');
    overlay.style.display = 'block';
}


function updateScoreDisplay() {
    // Update displayed scores
    document.getElementById("leftPlayerScore").textContent = leftScore;
    document.getElementById("rightPlayerScore").textContent = rightScore;
}


// Function to check if either player has met the winning condition
function checkWinCondition() {
    if (leftScore >= SCORE_LIMIT) {
        //alert('Left Player Wins!');
        announceWinner("Player 1");
        clearInterval(gameInterval);
        resetGame();
    } else if (rightScore >= SCORE_LIMIT) {
        //alert('Right Player Wins!');
        announceWinner("Player 2");
        clearInterval(gameInterval);
        resetGame();
    }
}