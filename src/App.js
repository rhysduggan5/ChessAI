import './App.css';

import { Grid } from '@mui/material'

import { boardFromFEN, FENFromBoard, canMovePiece, useForceRender, getPossibleMoves } from './Utils'
import { baseBoardFEN } from './Constants'

import Board from './components/Board';

import React, { useState } from 'react'

function App() {
  let baseFen = baseBoardFEN.split(" ");

  const [fen, setFen] = useState(baseFen[0]);
  const [toMove, setToMove] = useState(baseFen[1]);
  const [castling, setCastling] = useState(baseFen[2].split(""));
  const [enPassentTarget, setEnPassentTarget] = useState(baseFen[3]);
  const [halfMoveClock, setHalfMoveClock] = useState(baseFen[4]);
  const [fullMoves, setFullMoves] = useState(baseFen[5]);
  const [board, setBoard] = useState(boardFromFEN(fen))

  const forceRender = useForceRender()

  const dropPiece = (e, tilePos) => {
    let data = e
      .dataTransfer
      .getData('text');

    data = JSON.parse(data)

    let newBoard = board;
    if (canMovePiece(newBoard, toMove, castling, data[1], tilePos)) {
      newBoard[data[1]].piece = "";
      newBoard[data[1]].color = "";

      //Promotion
      if (data[0].toLowerCase() === "p" && (tilePos <= 7 || tilePos >= 56)) {
        newBoard[tilePos].piece = data[2] === "b" ? "q" : "Q";
      } else {
        newBoard[tilePos].piece = data[0];
      }

      newBoard[tilePos].color = data[2];

      if (toMove === "w") {
        setToMove("b");
      } else {
        setToMove("w");
      }

      //Handle removing castling
      if (data[2] === "w") {
        if (data[0] === "K") {
          let newCastling = castling;
          newCastling[0] = "-";
          newCastling[1] = "-";
          setCastling(newCastling);

          if (data[1] === 60 && tilePos === 62) {
            newBoard[63].piece = ""
            newBoard[63].color = ""
            newBoard[61].piece = "R"
            newBoard[61].color = "w"
          } else if (data[1] === 60 && tilePos === 58) {
            newBoard[56].piece = ""
            newBoard[56].color = ""
            newBoard[59].piece = "R"
            newBoard[59].color = "w"
          }
        }
        if (data[1] === 56 && castling[1] !== "-") {
          let newCastling = castling;
          newCastling[1] = "-";
          setCastling(newCastling);
        } else if (data[1] === 63 && castling[0] !== "-") {
          let newCastling = castling;
          newCastling[0] = "-";
          setCastling(newCastling);
        }
      } else {
        if (data[0] === "k") {
          let newCastling = castling;
          newCastling[2] = "-";
          newCastling[3] = "-";
          setCastling(newCastling);

          if (data[1] === 4 && tilePos === 6) {
            newBoard[7].piece = ""
            newBoard[7].color = ""
            newBoard[5].piece = "r"
            newBoard[5].color = "b"
          } else if (data[1] === 4 && tilePos === 2) {
            newBoard[0].piece = ""
            newBoard[0].color = ""
            newBoard[3].piece = "r"
            newBoard[3].color = "b"
          }
        }
        if (data[1] === 0 && castling[3] !== "-") {
          let newCastling = castling;
          newCastling[3] = "-";
          setCastling(newCastling);
        } else if (data[1] === 7 && castling[2] !== "-") {
          let newCastling = castling;
          newCastling[2] = "-";
          setCastling(newCastling);
        }
      }
    }

    for (let i = 0; i < 64; i++) {
      newBoard[i].highlight = ""
    }

    updateBoard(newBoard);
  }

  const updateBoard = (newBoard) => {
    setBoard(newBoard);
    forceRender();
    setFen(FENFromBoard(newBoard));

    console.log(FENFromBoard(newBoard));
  }

  const onPieceStartDrag = (tileNumber) => {
    let currentBoard = board
    let availableMoves = getPossibleMoves(currentBoard, castling, tileNumber);

    console.log(availableMoves);

    availableMoves.forEach((pos) => {
      currentBoard[pos].highlight = "yes"
    })

    updateBoard(currentBoard);
  }

  const onPieceDragEnter = (_, tileNumber) => {
    let newBoard = board;

    newBoard[tileNumber].highlight = "yes"

    updateBoard(newBoard)
  }

  const onPieceDragLeave = (_, tileNumber) => {
    let newBoard = board;

    newBoard[tileNumber].highlight = ""
    
    updateBoard(newBoard)
  }

  return (
    <div className="app">
      <Grid
        container
        direction="row"
        wrap="nowrap">
        <div/>
        <Board
          item xs={4}
          dropPiece={dropPiece}
          board={board}
          onPieceStartDrag={onPieceStartDrag}
          onDragEnter={onPieceDragEnter}
          onDragLeave={onPieceDragLeave}/>
        <div/>
      </Grid>
    </div>
  );
}

export default App;
