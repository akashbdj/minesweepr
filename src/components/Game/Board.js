import Cell from './Cell'
import { OPEN, NEARBY_COORDIDATES, FLAG } from './../../constants'


export default class Board {
    constructor({ rows, cols, mines }) {
        this.rows = rows
        this.cols = cols
        this.mines = mines
        this.cells = new Array(rows).fill(null).map(_ => new Array(cols))
        this.plantedMinesLoc = []

        this.createBoard(rows, cols)
        this.areInBound = this.areInBound.bind(this)
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

    placeMines(cell) {
        let placed = 0
        while (placed < this.mines) {
            const row = this.getRandom(this.rows)
            const col = this.getRandom(this.cols)
            const c = this.cells[row][col]

            // donot place mine on the first clicked cell
            if (cell !== c && !c.hasMine()) {
                c.setMine()
                this.plantedMinesLoc.push([row, col])
                placed++
            }
        }
    }

    areInBound(r, c) {
        const ROWS = this.cells.length
        const COLS = this.cells[0].length
        return r >= 0 && r < ROWS && c >= 0 && c < COLS
    }

    caculateNearbyMines() {
        for (let [r, c] of this.plantedMinesLoc) {
            for (let [dr, dc] of NEARBY_COORDIDATES) {
                let nr = r + dr
                let nc = c + dc

                if (this.areInBound(nr, nc) && !this.cells[nr][nc].hasMine()) {
                    let cell = this.cells[nr][nc]
                    cell.setNearbyMinesCount(cell.getNearbyMinesCount() + 1)
                }
            }
        }
    }

    openCells(cell) {
        const visited = new Set()
        const inBound = this.areInBound
        const cells = this.cells

        // Depth First Search for opening cells
        // till we find a boundary of numbers(count of nearbyMines)
        function _open(r, c) {
            const key = `${r}-${c}`
            if (visited.has(key)) {
                return
            }

            visited.add(key)
            for (let [dr, dc] of NEARBY_COORDIDATES) {
                let nr = r + dr
                let nc = c + dc

                if (
                    inBound(nr, nc) &&
                    !cells[nr][nc].hasMine() &&
                    !cells[nr][nc].isOpened()
                ) {
                    cells[nr][nc].setOpen()

                    // open more cells only when you meet a cell with 0 nearbyMines
                    // in other words, stop exploration after you've found a boundary
                    if (cells[nr][nc].getNearbyMinesCount() === 0) {
                        _open(nr, nc)
                    }
                }
            }
        }

        cell.setOpen()
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
        }

        return this.cells // TODO: avoid mutation without verbosity

        // return this.cells.map((row) => {
        //     return row.map((_cell) => {
        //         if (_cell !== cell) {
        //             return _cell
        //         }
        //         const nc = new Cell({ ...cell })
        //         if (action === OPEN) nc.setOpen()
        //         return nc
        //     })
        // })
    }

    showAllMines() {
        this.plantedMinesLoc.map(([r, c]) => this.cells[r][c].setOpen())
    }

}