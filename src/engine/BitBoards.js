import positionBitBoards from '../bitboards/positionBitBoards.txt';

import { BitBoard } from 'bitboards' 

export const positionBoards = []

export const preLoadBoards = async () => {
  console.log("Loading boards");
  await loadPositionBoards()
  console.log("Loaded boards");
}

const loadPositionBoards = async () => {
  if (positionBoards.length !== 0) return;

  console.log("Loading position board");

  await fetch(positionBitBoards)
    .then(r => r.text())
    .then(text => {
      const boards = text.split("\n");

      boards.forEach((text) => {
        positionBoards.push(new BitBoard(text))
      });
    });

  console.log("Loaded position board");
}
