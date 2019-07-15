# tic tac toe!

## To Do:

- Indicate which player is playing currently by high-lighting active player
- When a player clicks cell, icon ( 'O' or 'X') gets rendered
- ID of the cell gets pushed to each players array

- After 3rd click (per player)
  - function hasWon => check the current player's array to see if it matches winning pattern
    - If winning -> 
      - cells of winning pattern gets high-lighted
      - Player chip gets high-lighted 
    - Else -> next player plays (hasWon)

## To Add:

- When reset button is clicked it:
  - prompted to ask if really want to be cleared
  - clear the board
  - if won -> remove high-light from cells and a winner chip