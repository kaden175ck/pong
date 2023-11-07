# Pong Game - Code Explanation

### Note
### Please refer to the in-code comments for more details if this document is not detail enough

## Overall JS Logic

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


## Collision Detection and Scoring

- Ball-paddle collision is detected using positions and sizes of the paddles and the ball.
- Scoring is handled by checking if the ball has passed the left or right edges of the play area.

# Pong AI Opponent Development

When developing the AI opponent for a Pong game, the primary goal is to create an automated paddle that behaves like a human player, offering a challenging and engaging experience for the player. This document outlines the thought process and considerations involved in developing such an AI.

## Objectives

1. **Reactivity**: The AI should be responsive enough to provide a challenge but not so perfect that it's unbeatable.
2. **Adaptability**: It must adapt to changes in the ball's speed and direction.
3. **Scalable Difficulty**: There should be varying levels of difficulty that players can choose from.

## Strategy

The AI will use a simple heuristic-based approach to determine the paddle's movement. It doesn't need to employ complex algorithms like neural networks or machine learning since the game's scope is limited, and performance is a priority.

## Logic Breakdown

### Position Tracking

- **Paddle Alignment**: The AI keeps track of the paddle's y-position and aligns it with the ball's y-position. It aims to hit the ball with its center for the most predictable rebound angle.
- **Ball Watch**: The AI constantly monitors the ball's position and direction, especially when the ball is headed towards it.

### Predictive Movement

- **Anticipation**: The AI anticipates where the ball will be when it reaches its side and moves the paddle accordingly.
- **Difficulty Modulation**: Depending on the difficulty level, the AI's predictive capabilities and speed vary:
  - **Easy**: The paddle moves directly towards the ball's current position but with a slower speed.
  - **Medium**: It predicts where the ball will be shortly and moves faster than on easy mode.
  - **Hard**: The AI uses a more advanced prediction of the ball's trajectory and moves at a high speed.

### Speed and Direction Adjustment

- The AI paddle's speed is adjusted according to the game's difficulty level.
- If the ball's speed increases, the AI's reaction time decreases to maintain the challenge.

### Boundary Constraints

- The AI's movement is constrained within the game's vertical limits, ensuring that it doesn't move off-screen.

## Development Considerations

### Fairness

- The AI must be beatable. Perfect prediction or reaction would make the game frustrating.

### Performance

- The AI's logic is executed within the game loop, hence it's optimized to run efficiently to prevent any lag in the game.

### Responsiveness

- The AI paddle's movements are smooth and continuous, closely mimicking the potential movements of a human player.

## Implementation

- The AI's behavior is coded in JavaScript, utilizing functions that handle its position, speed, and collision detection.
- CSS is used to style the paddle and ball, while HTML elements are updated in real-time with the game's state.



### Some not complex HTML Concepts in the Project

## Structure Overview
The HTML structure is composed of several main components within a `game-container`. These components are:
- Game Area Container
- Scoreboard
- Speed Control
- Score Limit
- Game Area
- Controls Container

Each of these components has specific roles.

## Custom Overlay for Game Pauses and Endings
An overlay is used to pause the game and display messages such as the winner announcement. 
- It uses a div with an ID `gameOverlay` that can be shown or hidden via JavaScript.
- Contains a button to play again, allowing users to restart the game after it ends.



### Complex and custom CSS Concepts in the Project

## Complex Selectors for Targeting Elements
- Descendant selectors like `#gameArea.dino` target the element with `id="gameArea"` that also has a class of `.dino`, allowing us to change the background image depending on the game mode.
- Attribute selectors like `[type="range"]` could be used to style all `<input>` elements of the type range.

## CSS Animations and Keyframes
- `@keyframes` define the animation sequence, such as `pulsate` which creates a glowing effect around the `#gameArea`.
- `animation: pulse 2s infinite;` applied to `.ball` gives it a pulsating effect, mimicking a heartbeat.

## Custom Properties for Theming and Shadows
- `var(--main-color)` could be defined to standardize the main color theme and easily adapt it by changing the variable.
- The `--main-text-shadow` and `--button-shadow` properties are used to apply consistent shadows across text and buttons, adding depth to the elements. For example, shadows are applied to the `.score-item` and `.divider` for a neon glow effect.