# Pong Game - Code Explanation(JS,HTML,CSS)

### Note
### Please refer to the in-code comments for more details if this document is not detail enough

## Complex and custom JavaScript Usage

## Table of Contents

  - [Game Initialization](#game-initialization)
  - [Game Loop](#game-loop)
  - [AI Paddle Movement](#ai-paddle-movement)
  - [Ball Movement and Collision Detection](#ball-movement-and-collision-detection)

### Game Initialization

The `initializeGame` function sets up the initial state of the game, including paddle positions and scores. It distinguishes between the two modes and sets the AI speed based on difficulty:

- The `gameMode` variable controls whether the game will run in '1P' or '2P' mode.
- In '1P' mode, the `aiPaddle` object is positioned, and its speed is adjusted as per the selected difficulty.

### Game Loop

The `gameLoop` function is called continuously using `requestAnimationFrame`. It updates the game state at every frame and handles:

- Paddle movements based on user input flags (`leftPaddleMoveUp`, `rightPaddleMoveDown`, etc.)
- Ball movement by updating its position (`ball.x` and `ball.y`) and detecting wall collisions.
- AI paddle movement if in '1P' mode.
- Checking for the win condition.

### Custom AI Paddle Movement

- The `moveAIPaddle` function contains logic to move the AI paddle in response to the ball's movement.
- Depending on the difficulty, the AI anticipates the ball's future position using a predictive algorithm.
- The AI paddle tracks the ball by adjusting its position (`y`) to align with a predicted y-coordinate of the ball (`predictY`). This prediction changes based on the difficulty level set, with `easy` difficulty having no prediction and just following the ball's current `y`, `medium` difficulty predicting some frames ahead, and `hard` difficulty predicting even further ahead to simulate a more challenging opponent.

### Ball Movement and Collision Detection

- The `handleBallMovement` function controls the ball's physics, including reflection angles upon hitting walls or paddles.
- Collision detection with paddles is done using position checks and updating the direction of the ball's movement when a collision is detected.

### Win Condition
- The `checkWinCondition` function presumably checks if the score limit has been reached and then takes necessary actions to end the game and announce the winner.

### Game Reset
-`resetGame` reloads the page to start over, and `resetBall` places the ball back in the center with initial velocities after a score.






## Some not complex HTML Concepts in the Project

### Structure Overview
The HTML structure is composed of several main components within a `game-container`. These components are:
- Game Area Container
- Scoreboard
- Speed Control
- Score Limit
- Game Area
- Controls Container

Each of these components has specific roles.

### Custom Overlay for Game Pauses and Endings
An overlay is used to pause the game and display messages such as the winner announcement. 
- It uses a div with an ID `gameOverlay` that can be shown or hidden via JavaScript.
- Contains a button to play again, allowing users to restart the game after it ends.



## Complex and custom CSS Concepts in the Project

### Complex Selectors for Targeting Elements
- Descendant selectors like `#gameArea.dino` target the element with `id="gameArea"` that also has a class of `.dino`, allowing us to change the background image depending on the game mode.
- Attribute selectors like `[type="range"]` could be used to style all `<input>` elements of the type range.

### CSS Animations and Keyframes
- `@keyframes` define the animation sequence, such as `pulsate` which creates a glowing effect around the `#gameArea`.
- `animation: pulse 2s infinite;` applied to `.ball` gives it a pulsating effect, mimicking a heartbeat.

### Custom Properties for Theming and Shadows
- `var(--main-color)` could be defined to standardize the main color theme and easily adapt it by changing the variable.
- The `--main-text-shadow` and `--button-shadow` properties are used to apply consistent shadows across text and buttons, adding depth to the elements. For example, shadows are applied to the `.score-item` and `.divider` for a neon glow effect.