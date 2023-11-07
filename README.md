# Guide for TA

- README.md - This file provides an overview of the project, including its purpose, how to set it up, and how to use it.
- explanation.md - Here, you'll find detailed explanations of the codebase, including how the algorithms work and the reasoning behind certain coding decisions.
- reflect.md - This document captures our development journey, discussing both the process of building the project and the thought process that guided our decisions.

# Pong Game

This is a browser-based version of the classic Pong game, recreated using vanilla HTML, CSS, and JavaScript. No canvas is used in the development of this game.

## Author

Haoyang Shi - TUT01

## Project Overview

Pong is an arcade-style game that simulates table tennis. Players control paddles on the screen to hit a ball back and forth. The goal is to outmaneuver your opponent and be the first to reach a predetermined number of points.

### How to Run the Game

To play the game locally:

1. Clone or download this repository to your local machine.
2. Navigate to the project directory.
3. Open the `index.html` file in your preferred web browser.

## Game Overview

- **Title**: Pong
- **Target Platform**: Desktop browsers
- **Game Genre**: Arcade, Sports
- **Objective**: Score points by getting the ball past the opponent's paddle. The first player to reach a predetermined score, such as 10 points, wins the game.

## Rules

- Each player controls a paddle using keyboard inputs.
- Players earn a point when the ball passes their opponent's paddle.
- Players can speed up the ball during play for added challenge.
- The game continues until one player reaches the winning score.

## Game Mechanics

- **Paddle Movement**: Paddles move vertically along the game area's edges, controlled by the players.
- **Ball Movement**: The ball moves across the game area, bouncing off the walls and paddles.
- **Scoring System**: Points are tracked and displayed on screen.
- **Collision Detection**: Determines when the ball makes contact with paddles or boundaries.
- **Game States**: The game can be in a start, play, or end state, each with appropriate displays and controls.

### Note

Please refer to the in-code comments that identify the sections for animations, interaction mechanisms, and custom algorithms.

## Custom Features

- **Animations**: Smooth and engaging animations for paddle movement and scoring.
- **Interaction Mechanism**: Custom collision detection to handle the ball and paddle interactions effectively.
- **Algorithms**: Game logic for ball movement, scoring, and paddle control.


## Assets Credits

All images downloaded from Unsplash are under the CC0 license, free for personal and commercial use.

dinoback:Photo by Blanca Paloma Sánchez on Unsplash
Favicon: Photo by Everyday basics on Unsplash
Hockey:Photo by <a href="https://unsplash.com/@chrisliverani?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Chris Liverani</a> on <a href="https://unsplash.com/photos/red-and-white-hockey-goal-5oZ9uVx7buc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
Football: https://unsplash.com/photos/aerial-view-of-football-field-deGn9vSwXIM
racing: Photo by <a href="https://unsplash.com/@aj5tdt?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Anders J</a> on <a href="https://unsplash.com/photos/red-and-white-wooden-wall-MekXOhHQVY4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>












Custom Animations:
Introduce animations that enhance the gameplay experience. This might include animations for player movements, transitions between game states, or visual feedback based on player actions.

Custom Interaction Mechanism:
Implement a custom collision detection mechanism if your game involves moving and interacting elements. If your chosen game concept (e.g., Chess, Sudoku) doesn't inherently involve collisions, focus on another complex interaction mechanism. For a chess game, this might be the logic to determine legal moves for each piece or a mechanism to check for check and checkmate scenarios.

Custom Algorithms:
Implement algorithms that drive the gameplay. This could be path-finding for games that involve navigation, sorting algorithms for scoreboards, or any other game-specific algorithm.

Note: Make the marker’s life easier by identifying these sections in your code.

