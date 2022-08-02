import BlackPawnImage from '../assets/black-pawn.svg';
import WhitePawnImage from '../assets/white-pawn.svg';

import BlackRookImage from '../assets/black-rook.svg';
import WhiteRookImage from '../assets/white-rook.svg';

import BlackQueenImage from '../assets/black-queen.svg';
import WhiteQueenImage from '../assets/white-queen.svg';

import BlackBishopImage from '../assets/black-bishop.svg';
import WhiteBishopImage from '../assets/white-bishop.svg';

import BlackKnightImage from '../assets/black-knight.svg';
import WhiteKnightImage from '../assets/white-knight.svg';

import BlackKingImage from '../assets/black-king.svg';
import WhiteKingImage from '../assets/white-king.svg';
import Draggable from 'react-draggable';

export function BlackPawn(props) {
  return (
    <Draggable>
      <img draggable="false" width="50px" height="50px" src={BlackPawnImage} alt="Black Pawn"/>
    </Draggable>
  );
}

export function WhitePawn(props) {
  return (
    <Draggable>
      <img draggable="false" width="50px" height="50px" src={WhitePawnImage} alt="White Pawn"/>
    </Draggable>
  );
}

export function BlackRook(props) {
  return (
    <Draggable>
      <img draggable="false" width="50px" height="50px" src={BlackRookImage} alt="Black Rook"/>
    </Draggable>
  );
}

export function WhiteRook(props) {
  return (
    <Draggable>
      <img draggable="false" width="50px" height="50px" src={WhiteRookImage} alt="White Rook"/>
    </Draggable>
  );
}

export function BlackQueen(props) {
  return (
    <Draggable>
      <img draggable="false" width="50px" height="50px" src={BlackQueenImage} alt="Black Queen"/>
    </Draggable>
  );
}

export function WhiteQueen(props) {
  return (
    <Draggable>
      <img draggable="false" width="50px" height="50px" src={WhiteQueenImage} alt="White Queen"/>
    </Draggable>
  );
}

export function BlackBishop(props) {
  return (
    <Draggable>
      <img draggable="false" width="50px" height="50px" src={BlackBishopImage} alt="Black Bishop"/>
    </Draggable>
  );
}

export function WhiteBishop(props) {
  return (
    <Draggable>
      <img draggable="false" width="50px" height="50px" src={WhiteBishopImage} alt="White Bishop"/>
    </Draggable>
  );
}

export function BlackKnight(props) {
  return (
    <Draggable>
      <img draggable="false" width="45px" height="45px" src={BlackKnightImage} alt="Black Knight"/>
    </Draggable>
  );
}

export function WhiteKnight(props) {
  return (
    <Draggable>
      <img draggable="false" width="50px" height="50px" src={WhiteKnightImage} alt="White Knight"/>
    </Draggable>
  );
}

export function BlackKing(props) {
  return (
    <Draggable>
      <img draggable="false" width="50px" height="50px" src={BlackKingImage} alt="Black King"/>
    </Draggable>
  );
}

export function WhiteKing(props) {
  return (
    <Draggable>
      <img draggable="false" width="50px" height="50px" src={WhiteKingImage} alt="White King"/>
    </Draggable>
  );
}