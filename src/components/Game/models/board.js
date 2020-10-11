import Cell from './cell'
import { OPEN, NEARBY_COORDIDATES, FLAG } from '../../../constants'


export default class Board {
    constructor({ rows, cols, mines }) {
        this.rows = rows
        this.cols = cols
        this.mines = mines
        this.cells = new Array(rows).fill(null).map(_ => new Array(cols))
        this.plantedMinesLoc = []

        this.createBoard(rows, cols)
        this.inBound = this.inBound.bind(this)
    }

    createBoard() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                this.cells[r][c] = new Cell({ row: r, col: c })
            }
        }
    }

    getRandom(limit) {
        return ~~(Math.random() * limit)
    }

    plantMines(cell) {
        let placed = 0
        while (placed < this.mines) {
            const row = this.getRandom(this.rows)
            const col = this.getRandom(this.cols)
            const c = this.cells[row][col]

            // donot place mine on the first clicked cell
            // or if it's already a mine
            if (cell !== c && !c.hasMine()) {
                c.placeMine()
                this.plantedMinesLoc.push([row, col])
                placed++
            }
        }
    }

    inBound(r, c) {
        const ROWS = this.cells.length
        const COLS = this.cells[0].length
        return r >= 0 && r < ROWS && c >= 0 && c < COLS
    }

    caculateNearbyMines() {
        for (let [r, c] of this.plantedMinesLoc) {
            for (let [dr, dc] of NEARBY_COORDIDATES) {
                let nr = r + dr
                let nc = c + dc

                if (this.inBound(nr, nc) && !this.cells[nr][nc].hasMine()) {
                    let cell = this.cells[nr][nc]
                    cell.setNearbyMinesCount(cell.getNearbyMinesCount() + 1)
                }
            }
        }
    }

    openCells(cell) {
        const inBound = this.inBound
        const cells = this.cells

        // Depth First Search for opening cells
        // till we find a boundary of numbers(count of nearbyMines)
        function _open(r, c) {
            for (let [dr, dc] of NEARBY_COORDIDATES) {
                let nr = r + dr
                let nc = c + dc

                if (
                    inBound(nr, nc) &&
                    !cells[nr][nc].hasMine() &&
                    !cells[nr][nc].isOpen()
                ) {
                    cells[nr][nc].open()

                    // open more cells only when you meet a cell with 0 nearbyMines
                    // in other words, stop exploration after you've found a boundary
                    if (cells[nr][nc].getNearbyMinesCount() === 0) {
                        _open(nr, nc)
                    }
                }
            }
        }

        // first open the cell where a player clicked
        cell.open()

        // now open other cells recursively
        _open(cell.row, cell.col)
    }

    // action can be: OPEN a cell, FLAG a cell (not supported)
    update(cell, action = OPEN) {
        switch (action) {
            case OPEN:
                this.openCells(cell)
                break;
            case FLAG:
                console.log("not supported")
                break;
            default:
                console.log("unexpected action")
        }

        return this.cells
    }

    showMines() {
        this.plantedMinesLoc.map(([r, c]) => this.cells[r][c].open())
    }

}