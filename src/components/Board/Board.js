import React, { Component } from 'react'

export default class Board extends Component {
    getValue(cell) {
        if (!cell.isOpened()) {
            return null
        }

        const count = cell.getNearbyMinesCount()
        return cell.hasMine() ? '💣' : count ? count : null
    }

    renderCell(cell) {
        const { isGameOver, onCellClick } = this.props
        return (
            <td key={`${cell.row}-${cell.col}`}
                className={`cell ${cell.isOpened() ? 'opened-cell' : ''}`}
                onClick={() => !isGameOver && onCellClick(cell)}>
                {this.getValue(cell)}
            </td>
        )
    }

    renderRow(row, idx) {
        return (<tr key={idx}>{row.map((cell) => this.renderCell(cell))}</tr>)
    }

    renderBoard() {
        const { boardModel } = this.props;
        return (
            <table>
                <tbody>
                    {boardModel.cells.map((row, idx) => this.renderRow(row, idx))}
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <div className="container">
                {this.renderBoard()}
            </div>
        )
    }
}