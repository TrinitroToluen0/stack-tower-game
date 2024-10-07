# **Stack Tower Game**

This is a simple and fun web-based game where boxes fall from the top of the canvas and bounce off the sides. The goal is to stack the boxes as accurately as possible. If the boxes don't align properly, they get trimmed, and the game continues until there is no more box left to fall. Once that happens, it's game over!

## **Gameplay**
- Boxes bounce horizontally at the top of the canvas.
- The player must drop the boxes by clicking or pressing the spacebar.
- If the box doesn't align with the previous one, it gets trimmed.
- The game gets progressively harder as the speed of the bouncing box increases.
- If a box falls completely outside the last box, the game ends.

## **Controls**
- **Mouse click** or **Spacebar**: Drop the current bouncing box.

## **Game Modes**
The game has three modes:
- **BOUNCE**: The current box is bouncing horizontally, waiting to be dropped.
- **FALL**: The current box falls down after the player clicks or presses space.
- **GAME OVER**: The game ends if a box completely misses the stack, and the "Game Over" screen is displayed.

## **Code Structure**
- `draw()`: Main loop that clears the canvas and draws all the boxes and the current state.
- `startNewGame()`: Initializes a new game session.
- `bounce()`: Handles the logic for the bouncing movement of the current box.
- `fall()`: Handles the logic for the falling box when it’s dropped.
- `land()`: Checks for alignment, trims boxes if necessary, and stacks the box on top of the last one.
- `gameOver()`: Displays the Game Over screen.

## **Future Improvements**
1. Show debris when a box is trimmed.
2. Make the camera rise more smoothly.

![image](https://github.com/user-attachments/assets/8298a56f-1445-4930-b096-68aa40cb4e8d)
