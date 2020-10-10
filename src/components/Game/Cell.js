export default class Cell {
    constructor({ row, col, mine = false, nearbyMinesCount = 0 }) {
        this.row = row
        this.col = col
        this.mine = mine
        this.opened = false
        this.nearbyMinesCount = nearbyMinesCount
    }

    setMine() {
        this.mine = true
    }

    hasMine() {
        return this.mine
    }

    setOpen() {
        this.opened = true
    }

    isOpened() {
        return this.opened
    }

    setNearbyMinesCount(count) {
        this.nearbyMinesCount = count
    }

    getNearbyMinesCount() {
        return this.nearbyMinesCount
    }

}