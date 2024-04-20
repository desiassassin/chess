export class Piece {
     constructor({ color, player }) {
          this.color = color;
          this.moved = false;
          this.player = player;
          this.opponentColor = this.color === "white" ? "black" : "white";
     }
}

export class Rook extends Piece {
     constructor({ color, player }) {
          super({ color, player });
     }

     findMoves(GRID, selectedBlock) {
          return checkStraightMoves(GRID, selectedBlock, this.opponentColor);
     }
}
export class Bishop extends Piece {
     constructor({ color, player }) {
          super({ color, player });
     }

     findMoves(GRID, selectedBlock) {
          return checkDiagonalMoves(GRID, selectedBlock, this.opponentColor);
     }
}
export class Queen extends Piece {
     constructor({ color, player }) {
          super({ color, player });
     }

     findMoves(GRID, selectedBlock) {
          return [...checkStraightMoves(GRID, selectedBlock, this.opponentColor), ...checkDiagonalMoves(GRID, selectedBlock, this.opponentColor)];
     }
}
export class King extends Piece {
     constructor({ color, player }) {
          super({ color, player });
     }
}
export class Pawn extends Piece {
     constructor({ color, player }) {
          super({ color, player });
     }

     findMoves(GRID, selectedBlock) {
          const offset = this.moved ? 0 : 1;

          const moves = [];

          if (this.player === 1) {
               // check for moves in upwards direction
               for (let row = selectedBlock.row - 1; row >= selectedBlock.row - 1 - offset; row--) {
                    const col = selectedBlock.col;
                    const block = GRID[row][col];
                    const leftDiagonalBlock = GRID[row][col - 1];
                    const righttDiagonalBlock = GRID[row][col + 1];

                    if (block.empty) {
                         moves.push([row, col]);
                         continue;
                    }

                    // check for left side diagonally
                    if (leftDiagonalBlock && leftDiagonalBlock.piece.color === this.opponentColor) {
                         moves.push([leftDiagonalBlock.row, leftDiagonalBlock.col]);
                    }
                    // check for right side diagonally
                    if (righttDiagonalBlock && righttDiagonalBlock.piece.color === this.opponentColor) {
                         moves.push([righttDiagonalBlock.row, righttDiagonalBlock.col]);
                    }

                    if (!block.empty || block.piece.color === selectedBlock.piece.color) break;
               }
          } else if (this.player === 2) {
               // check for moves in downwards direction
               for (let row = selectedBlock.row + 1; row <= selectedBlock.row + 1 + offset; row++) {
                    const col = selectedBlock.col;
                    const block = GRID[row][col];
                    const leftDiagonalBlock = GRID[row][col - 1];
                    const righttDiagonalBlock = GRID[row][col + 1];

                    if (block.empty) {
                         moves.push([row, col]);
                         continue;
                    }

                    // check for left side diagonally
                    if (leftDiagonalBlock && leftDiagonalBlock.piece.color === this.opponentColor) {
                         moves.push([leftDiagonalBlock.row, leftDiagonalBlock.col]);
                    }
                    // check for right side diagonally
                    if (righttDiagonalBlock && righttDiagonalBlock.piece.color === this.opponentColor) {
                         moves.push([righttDiagonalBlock.row, righttDiagonalBlock.col]);
                    }
                    if (!block.empty || block.piece.color === selectedBlock.piece.color) break;
               }
          }

          return moves;
     }
}
export class Knight extends Piece {
     constructor({ color, player }) {
          super({ color, player });
     }
}

function checkStraightMoves(GRID, selectedBlock, colorToCheckFor) {
     // find vertical moves
     const moves = [];

     // find moves upwards
     for (let row = selectedBlock.row - 1; row >= 0; row--) {
          const col = selectedBlock.col;

          const block = GRID[row][col];
          if (block.empty) {
               moves.push([row, col]);
               continue;
          }
          if (block.piece.color === colorToCheckFor) {
               moves.push([row, col]);
          }
          if (!block.empty || block.piece.color === selectedBlock.piece.color) break;
     }

     // find moves downwards
     for (let row = selectedBlock.row + 1; row < GRID.length; row++) {
          const col = selectedBlock.col;

          const block = GRID[row][col];

          if (block.empty) {
               moves.push([row, col]);
               continue;
          }
          if (block.piece.color === colorToCheckFor) {
               moves.push([row, col]);
          }
          if (!block.empty || block.piece.color === selectedBlock.piece.color) break;
     }

     // find moves towards left
     for (let col = selectedBlock.col - 1; col >= 0; col--) {
          const row = selectedBlock.row;

          const block = GRID[row][col];

          if (block.empty) {
               moves.push([row, col]);
               continue;
          }
          if (block.piece.color === colorToCheckFor) {
               moves.push([row, col]);
          }
          if (!block.empty || block.piece.color === selectedBlock.piece.color) break;
     }

     // find moves towards right
     for (let col = selectedBlock.col + 1; col < GRID[selectedBlock.row].length; col++) {
          const row = selectedBlock.row;

          const block = GRID[row][col];

          if (block.empty) {
               moves.push([row, col]);
               continue;
          }
          if (block.piece.color === colorToCheckFor) {
               moves.push([row, col]);
          }
          if (!block.empty || block.piece.color === selectedBlock.piece.color) break;
     }

     return moves;
}

function checkDiagonalMoves(GRID, selectedBlock, colorToCheckFor) {
     // find vertical moves
     const moves = [];

     // find moves upwards diagonally left
     for (let row = selectedBlock.row - 1; row >= 0; row--) {
          const diff = selectedBlock.row - row;
          const col = selectedBlock.col - diff;
          const block = GRID[row][col];

          if (col < 0) break;

          if (block.empty) {
               moves.push([row, col]);
               continue;
          }
          if (block.piece.color === colorToCheckFor) {
               moves.push([row, col]);
          }
          if (!block.empty || block.piece.color === selectedBlock.piece.color) break;
     }

     // find moves upwards diagonally right
     for (let row = selectedBlock.row - 1; row >= 0; row--) {
          const diff = selectedBlock.row - row;
          const col = selectedBlock.col + diff;
          const block = GRID[row][col];

          if (col > GRID[0].length - 1) break;

          if (block.empty) {
               moves.push([row, col]);
               continue;
          }
          if (block.piece.color === colorToCheckFor) {
               moves.push([row, col]);
          }
          if (!block.empty || block.piece.color === selectedBlock.piece.color) break;
     }

     // find moves downwards diagonally left
     for (let row = selectedBlock.row + 1; row < GRID.length; row++) {
          const diff = selectedBlock.row - row;
          const col = selectedBlock.col + diff;
          const block = GRID[row][col];

          if (col < 0) break;

          if (block.empty) {
               moves.push([row, col]);
               continue;
          }
          if (block.piece.color === colorToCheckFor) {
               moves.push([row, col]);
          }
          if (!block.empty || block.piece.color === selectedBlock.piece.color) break;
     }

     // find moves downwards diagonally right
     for (let row = selectedBlock.row + 1; row < GRID.length; row++) {
          const diff = selectedBlock.row - row;
          const col = selectedBlock.col - diff;
          const block = GRID[row][col];

          if (col > GRID[0].length - 1) break;

          if (block.empty) {
               moves.push([row, col]);
               continue;
          }
          if (block.piece.color === colorToCheckFor) {
               moves.push([row, col]);
          }
          if (!block.empty || block.piece.color === selectedBlock.piece.color) break;
     }

     return moves;
}
