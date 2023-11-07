# Pong Game - Code Explanation

## Overall Logic

### Initialization (`initializeGame` function)

- Sets initial scores to 0 and updates the score display.
- Establishes initial positions for paddles and the ball.
- In '1P' mode, sets AI paddle position and speed according to the difficulty level chosen (easy, medium, hard).

### DOM Content Loaded Event

- Caches elements like paddles and ball for easy reference upon full DOM load.
- Sets event listeners for game controls (start, pause, reset), keyboard inputs, and customization options (score limit, theme, ball color).
- `playAgainBtn` calls `initializeGame` to reset the game.

### Keyboard Control

- `handleKeyDown` and `handleKeyUp` functions set movement flags for paddle control based on key events.

### Game Control

- `startGame` function begins the game loop with `requestAnimationFrame`.
- `pauseGame` function stops the game loop.
- `resetGame` function reloads the page, resetting the game.

### Game Loop (`gameLoop` function)

- Manages paddle and ball movements, collision detection, and checks for win conditions.
- In '1P' mode, executes AI paddle movement.
- Recursively calls itself for a continuous loop via `requestAnimationFrame`.

### Utility Functions

- `movePaddle` and `moveBall` handle respective element movements within game bounds.
- `clearHighlightsAndHideDropdown` resets UI elements.

## Most Complex Part - AI Logic

### AI Paddle Positioning

- AI paddle tracks the ball (`ball.y`) and predicts where to meet the ball on its side.

### Difficulty Levels (`moveAIPaddle` function)

- Adjusts the AI's prediction mechanics based on difficulty settings:
  - 'Easy': Follows the ball directly without prediction.
  - 'Medium': Predicts where the ball will be after 30 frames.
  - 'Hard': Predicts where the ball will be after 60 frames.

### Prediction Mechanism

- Predicts the ball's future position by considering its current speed and direction (`ball.dy`).
- The predictive factor (30 or 60) simulates foresight by estimating the ball's vertical position in the near future.

### Movement Logic

- The AI paddle moves up or down to align its center with the predicted ball position (`predictY`).

### Speed Adjustment

- The AI paddle's speed (`aiSpeed`) is variable and correlates with the game's difficulty level, influencing how quickly the paddle can reposition.

### Positioning Restrictions (`applyAIPaddleMovement`)

- Ensures AI paddle remains within the vertical limits of the play area to prevent it from moving off-screen.
