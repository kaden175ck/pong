# Pong Game - Code Explanation

## Overall Logic

## Initialization

The `initializeGame()` function resets the game to its initial state. It sets scores to zero and positions the ball and paddles. For 1-Player mode, it sets the AI paddle's position and speed based on the difficulty level.

## Event Listeners

Event listeners are attached to DOM elements for game controls (start, pause, reset), keyboard controls for paddle movement, difficulty selection, speed adjustment, and theme customization. These ensure interactive gameplay and allow the player to customize various aspects of the game.

## Paddle Movement

`handleKeyDown()` and `handleKeyUp()` functions track when a player presses and releases keys to move the paddles. They prevent default scrolling of the webpage when these keys are pressed.

## Game Control Functions

- `startGame()`: Begins the game loop using `requestAnimationFrame`.
- `pauseGame()`: Pauses the game by setting `gameRunning` to false.
- `resetGame()`: Reloads the page, effectively resetting the entire game.

## Game Loop

`gameLoop()` is the core loop that runs while the game is active. It handles paddle movements, ball movement, AI logic, and win conditions. If it's a 1-Player game, it also moves the AI paddle.

## Ball and Paddle Movement Logic

- `handleBallMovement()`: Updates the ball's position, checks for collisions with walls and paddles, and updates scores if the ball passes a paddle.
- `moveAIPaddle()`: Contains logic for moving the AI paddle based on the ball's position and the selected difficulty.
- `movePaddle(paddleElement, newYPosition)`: Moves a given paddle to a new Y position within the boundaries of the game area.

## Helper Functions

`clearHighlightsAndHideDropdown()`: Utility function to clear button highlights and hide the dropdown menu for game mode and difficulty selection.

## Collision Detection and Scoring

- Ball-paddle collision is detected using positions and sizes of the paddles and the ball.
- Scoring is handled by checking if the ball has passed the left or right edges of the play area.

## AI Paddle Logic

- The AI paddle's movement is determined by predicting where the ball will be when it reaches the paddle's X position.
- The level of prediction and the speed of the AI paddle's movement are adjusted based on the selected difficulty.

## Theme and Ball Color Selection

The code allows players to select themes and ball colors dynamically, which are applied to the game area and the ball respectively.

