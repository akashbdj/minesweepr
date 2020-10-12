# Simplified Minesweeper

## **Usage instructions**

Clone this repo, install the packages, fire up the server and you should be good to go!

### `yarn install && yarn start`

Open http://localhost:3000 to view it in the browser.

## Design

### User Interface

There are 3 components:
1. `<Game>`, a headless component which contains core logic of the game. It accepts a UI component as **function as child** pattern. Users can provide any implementation of Minesweeper UI to it without worrying about the game logic, and it will just work. **Benefit: Same game logic can be used with different game UI.**
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
3. Calculatinng `nearbyMinesCount` for each cell.
4. Opening all the nearby empty cells recursively when you click on a cell. It stops opening cells once it reaches the boundary of numbers(nearbyMinesCount).
5. Showing all the mines once the game is over.

Cell class contains
- properties: `row`, `col`, `opened`, `mine`, and `nearbyMinesCount`
- methods to manipulate cell properties

## Improvements/Missing

1. Immutability

Right now, a single instance of the board object is mutated. Another approach could be to create an entirely new instance of the board object every time it changes, i.e.  using an immutable object. I thought about this a bit and went with my current approach because if the size of the board grows, immutability will incur a larger cost. There are advantages to immutability in general, but in this specific case, I think a mutable approach is more efficient.

2. Test cases

I haven't added tests yet, but I've structured this such that it would be straightforward to add unit tests for the individual classes (Board, Cell), and integration tests for React components.

3. Flagging feature is not implemented yet.

4. Win game feature is not implemented, which is very straightfoward to implement. Just count the number of cells you have opened, then it becomes: 
```javascript
hasWon = ((rows * cols) - #mines) === #openedCells
```