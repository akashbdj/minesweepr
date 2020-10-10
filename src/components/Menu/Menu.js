import React, { Component } from 'react'

export default class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            optionsVisible: false,
            chosenGridKey: 'Beginner' // TODO: better way to do this. 
        }

        this.handleOptionsClick = this.handleOptionsClick.bind(this)
        this.handleNewGameClick = this.handleNewGameClick.bind(this)
        this.handleLevelSelection = this.handleLevelSelection.bind(this)
    }

    handleOptionsClick() {
        this.setState((prevState) => ({ optionsVisible: !prevState.optionsVisible }))
    }

    handleNewGameClick() {
        const { options, onNewGame } = this.props
        onNewGame(options[this.state.chosenGridKey])
        this.setState({ optionsVisible: false })
    }

    handleLevelSelection(key) {
        this.setState({ chosenGridKey: key })
    }

    renderOptions() {
        const { options } = this.props
        const keys = Object.keys(options)
        const chosenGridKey = this.state.chosenGridKey

        return (
            <>
                <table className="menu">
                    <thead>
                        <tr>
                            <td>Level</td>
                            <td>Rows</td>
                            <td>Columns</td>
                            <td>Mines</td>
                        </tr>
                    </thead>
                    <tbody>
                        {keys.map((key) => {
                            const grid = options[key]
                            return (
                                <tr key={key} onClick={() => this.handleLevelSelection(key)}>
                                    <td><input type="radio" name="level" checked={key === chosenGridKey} /> {key}</td>
                                    <td>{grid.rows}</td>
                                    <td>{grid.cols}</td>
                                    <td>{grid.mines}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <button className="new-game" onClick={this.handleNewGameClick}>New Game</button>
            </>
        )
    }

    render() {
        return (
            <div className="options">
                <button id="game-options" onClick={this.handleOptionsClick}>Game options &#x25BE;</button>
                {this.state.optionsVisible ? this.renderOptions() : null}
            </div>
        )
    }

}