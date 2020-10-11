export default class Cell {
    constructor({ row, col, mine = false, nearbyMinesCount = 0 }) {
        this.row = row
        this.col = col
        this.mine = mine
        this.opened = false
        this.nearbyMinesCount = nearbyMinesCount
    }

    placeMine() {
        this.mine = true
    }

    hasMine() {
        return this.mine
    }

    open() {
        this.opened = true
    }

    isOpen() {
        return this.opened
    }

    setNearbyMinesCount(count) {
        this.nearbyMinesCount = count
    }

    getNearbyMinesCount() {
        return this.nearbyMinesCount
    }

}