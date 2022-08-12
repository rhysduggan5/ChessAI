import { BitBoard } from "bitboards";
import { positionBoards } from './BitBoards'


export default class Position {
  //Piece bitboards
  pawns = undefined;
  bishops = undefined;
  knights = undefined;
  rooks = undefined;
  queens = undefined;
  kings = undefined;

  getPawns () {
    return this.pawns;
  }

  getBishops () {
    return this.bishops;
  }

  getKnights () {
    return this.knights;
  }

  getRooks () {
    return this.rooks;
  }

  getQueens () {
    return this.queens;
  }

  getKings () {
    return this.kings;
  }

  //Color bitboards
  whitePieces = undefined;
  blackPieces = undefined;

  getWhitePieces () {
    return this.whitePieces;
  }

  getBlackPieces () {
    return this.blackPieces;
  }

  constructor(fen) {
    const fenArray = fen.split(" ");

    const boardString = fenArray[0]

    this.initialiseBoards()

    this.setPosition(boardString)
  }

  getPieces() {
    return this.whitePieces.or(this.blackPieces);
  }

  initialiseBoards() {
    this.pawns = new BitBoard([0, 0])
    this.bishops = new BitBoard([0, 0])
    this.knights = new BitBoard([0, 0])
    this.rooks = new BitBoard([0, 0])
    this.queens = new BitBoard([0, 0])
    this.kings = new BitBoard([0, 0])

    this.whitePieces = new BitBoard([0, 0])
    this.blackPieces = new BitBoard([0, 0])
  }

  setPosition(fen) {
    let i = 0;

    fen.split("").forEach((char) => {
      switch (char) {
        case "P":
          this.pawns.or(positionBoards[i], true);
          this.whitePieces.or(positionBoards[i], true);
          i++;
          break;
        case "B":
          this.bishops.or(positionBoards[i], true);
          this.whitePieces.or(positionBoards[i], true);
          i++;
          break;
        case "N":
          this.knights.or(positionBoards[i], true);
          this.whitePieces.or(positionBoards[i], true);
          i++;
          break;
        case "R":
          this.rooks.or(positionBoards[i], true);
          this.whitePieces.or(positionBoards[i], true);
          i++;
          break;
        case "Q":
          this.queens.or(positionBoards[i], true);
          this.whitePieces.or(positionBoards[i], true);
          i++;
          break;
        case "K":
          this.kings.or(positionBoards[i], true);
          this.whitePieces.or(positionBoards[i], true);
          i++;
          break;
        case "p":
          this.pawns.or(positionBoards[i], true);
          this.blackPieces.or(positionBoards[i], true);
          i++;
          break;
        case "b":
          this.bishops.or(positionBoards[i], true);
          this.blackPieces.or(positionBoards[i], true);
          i++;
          break;
        case "n":
          this.knights.or(positionBoards[i], true);
          this.blackPieces.or(positionBoards[i], true);
          i++;
          break;
        case "r":
          this.rooks.or(positionBoards[i], true);
          this.blackPieces.or(positionBoards[i], true);
          i++;
          break;
        case "q":
          this.queens.or(positionBoards[i], true);
          this.blackPieces.or(positionBoards[i], true);
          i++;
          break;
        case "k":
          this.kings.or(positionBoards[i], true);
          this.blackPieces.or(positionBoards[i], true);
          i++;
          break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
          let num = parseInt(char);
          i += num;
          break;
        default:
          break;
      }
    })
  }

  printBoards() {
    console.log("Pawns:", this.printBoard(this.pawns.toString()));
    console.log("Bishops:", this.printBoard(this.bishops.toString()));
    console.log("Knights:", this.printBoard(this.knights.toString()));
    console.log("Rooks:", this.printBoard(this.rooks.toString()));
    console.log("Queens:", this.printBoard(this.queens.toString()));
    console.log("Kings:", this.printBoard(this.kings.toString()));
    console.log("White Pieces:", this.printBoard(this.whitePieces.toString()));
    console.log("Black Pieces:", this.printBoard(this.blackPieces.toString()));
  }

  printBoard(boardString) {
    let chars = ['\n', ...boardString.split("")];

    for (let i = 1; i < 9; i++) {
      chars.splice(i * 8 + i, 0, '\n');
    }

    return chars.join().replaceAll(",", " ");
  }

}