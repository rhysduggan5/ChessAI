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

import { useState } from 'react'

export function Piece(props) {
  const [visible, setVisible] = useState(true)

  var imageSource = undefined;

  switch (props.piece) {
    case "p":
      imageSource = BlackPawnImage;
      break;
    case "P":
      imageSource = WhitePawnImage;
      break;
    case "r":
      imageSource = BlackRookImage;
      break;
    case "R":
      imageSource = WhiteRookImage;
      break;
    case "k":
      imageSource = BlackKingImage;
      break;
    case "K":
      imageSource = WhiteKingImage;
      break;
    case "n":
      imageSource = BlackKnightImage;
      break;
    case "N":
      imageSource = WhiteKnightImage;
      break;
    case "b":
      imageSource = BlackBishopImage;
      break;
    case "B":
      imageSource = WhiteBishopImage;
      break;
    case "q":
      imageSource = BlackQueenImage;
      break;
    case "Q":
      imageSource = WhiteQueenImage;
      break;
    default:
      imageSource = "";
      break;
  }

  return (
    <img draggable style={{
      opacity: visible ? 1 : 0
    }} onDragStart={(e) => {
      e.dataTransfer.setData('text', JSON.stringify([props.piece, props.pos, props.color]));
      e.dataTransfer.dropEffect = 'none'
      e.dataTransfer.effectAllowed = 'move'
      setVisible(false);
      props.onPieceStartDrag(props.pos)
    }} onDragEnd={(e) => {
      setVisible(true);
    }} width="50px" height="50px" src={imageSource} alt=""/>
  );
}