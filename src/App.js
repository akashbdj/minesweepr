import React from 'react';
import Game from './components/Game/Game'
import Board from './components/Board/Board'
import Menu from './components/Menu/Menu'
import { PRE_DEFINED_GRIDS } from './constants'
import './App.css';

export default function App() {
  console.log("You man!!!")
  return (
    <div className="App">
      <Game grid={PRE_DEFINED_GRIDS['Beginner']}>
        {({ isGameOver, onCellClick, boardModel, onNewGame }) => {
          return (
            <>
              <Menu onNewGame={onNewGame} options={PRE_DEFINED_GRIDS} />
              <Board boardModel={boardModel} onCellClick={onCellClick} isGameOver={isGameOver} />
              {isGameOver && <div className="game-over">Game over!</div>}
            </>
          )
        }}
      </Game>
    </div>
  )
}
