import React, { useState } from 'react';
import './App.css'

const Board = () => {
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard);
  const [nextPlayer, setNextPlayer] = useState('X');
  const [gameOver, setGameOver] = useState(false);

  const handleClick = index => {
    if (!board[index] && !gameOver) {
      setBoard(prevBoard => {
        prevBoard[index] = nextPlayer;
        return prevBoard;
      });
      setNextPlayer(nextPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkDraw = () => {
    return !board.includes(null);
  };

  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const winner = checkWinner();
  const draw = checkDraw();

  if ((winner || draw) && !gameOver) {
    setGameOver(true);
  }

  const newGame = () => {
    setBoard(emptyBoard);
    setNextPlayer('X');
    setGameOver(false);
  };

  return (
    <div className="page">
      <div className="info">
        {winner ? winner + ' Wins' : draw ? 'Draw!' : 'Player ' + nextPlayer}
      </div>
      <div className="board">
        {board.map((item, index) => (
          <div className="cell" onClick={() => handleClick(index)} key={index}>
            {item}
          </div>
        ))}
      </div>
      {gameOver && <button onClick={newGame}>New Game</button>}
    </div>
  );
};

export default Board;
