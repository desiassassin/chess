export class Piece {
     constructor({ color }) {
          this.color = color;
          this.moved = false;
     }
}

export class Rook extends Piece {
     constructor({ color }) {
          super({ color });
     }

     findMoves(GRID, selectedBlock) {
          const colorToCheckFor = this.color === "white" ? "black" : "white";

          // find vertical moves
          const moves = [];

          // find moves upwards
          for (let row = selectedBlock.row - 1; row > 0; row--) {
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
}
export class Bishop extends Piece {
     constructor({ color }) {
          super({ color });
     }
}
export class Queen extends Piece {
     constructor({ color }) {
          super({ color });
     }
}
export class King extends Piece {
     constructor({ color }) {
          super({ color });
     }
}
export class Pawn extends Piece {
     constructor({ color }) {
          super({ color });
     }
}
export class Knight extends Piece {
     constructor({ color }) {
          super({ color });
     }
}
