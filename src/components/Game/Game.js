import React, { Component } from 'react'
import Board from './Board'

export default class Game extends Component {
    constructor(props) {
        super(props)
        this.isGameStarted = false
        this.state = {
            isGameOver: false,
            board: this.createBoard(props.grid)
        }

        this.onCellClick = this.onCellClick.bind(this)
        this.handleNewGame = this.handleNewGame.bind(this)
    }

    createBoard(grid) {
        return new Board({ ...grid })
    }

    handleNewGame(grid) {
        this.isGameStarted = false
        this.setState({
            board: this.createBoard(grid),
            isGameOver: false
        })
    }

    onCellClick(cell, action) {
        const { board } = this.state

        if (cell.hasMine()) {
            board.showAllMines() // TODO: Immutable
            this.setState({ isGameOver: true })
            return
        }

        // if this is the first click:
        // 1. go and place mines
        // 2. calculate nearby mines
        if (!this.isGameStarted) {
            board.placeMines(cell)
            board.caculateNearbyMines()
            this.isGameStarted = true
        }

        board.cells = board.update(cell)
        this.setState({ board })
    }

    render() {
        const { isGameOver, board } = this.state
        return this.props.children({
            onNewGame: this.handleNewGame,
            isGameOver,
            onCellClick: this.onCellClick,
            boardModel: board
        })
    }
}