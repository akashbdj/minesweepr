# Minesweeper

## **Usage instructions**

Just clone this repo, install the packages, fire up the server and you should be good to go! 

### `yarn install && yarn start`
Open http://localhost:3000 to view it in the browser.

## **Design**

### User Interface
There are 3 components:
1. `<Game>`, a headless component which contains core logic of the game. It accepts a UI component as **function as child** pattern. Users can provide any implementation of Minesweeper UI to it without worrying about the game logic, and it will just work. **Benefits: Same game logic can be used with different game UI.**
2. `<Board>`, a default UI implementation of game board which is passed to `<Game>`.
3. `<Menu>` allows us to change difficulty level and start a new game. We've 3 predefined levels to choose from: **Beginner**, **Intermediate**, and **Expert**, each having a different board configuration(`rows`, `cols`, and `mines`).

### Model
The game has 2 components: Board and Cells

Board class contains:
- properties: `rows`, `cols`, `cells`, and `plantedMinesLocation`
- methods to manipulate cells inside board.

It is responsible for:
1. Creating a board of size `rows` * `cols`. Each cell of the board is an instance of class `Cell`.
2. Planting X mines randomly on the board.
3. Calculate `nearbyMinesCount` for each cell
4. Opening all the nearby cells when you click on a cell only if the cells are not mines. It stops opening cells once it reaches the boundary of numbers(nearbyMinesCount).
5. Showing all the mines once the game is over.


Cell class contains
- properties: `row`, `col`, `opened`, `mine`, and `nearbyMinesCount`
- methods to manipulate cell properties


## Improvements/Missing
1. Immutability
2. Test cases
3. Flagging feature