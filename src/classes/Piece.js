export class Piece {
     constructor({ color }) {
          this.color = color;
     }

     discardInvalidMoves(GRID, moves) {
          const validMoves = [];

          for (const move of moves) {
               const row = move[0] - 1;
               const col = move[1] - 1;
               const colorToCheckFor = this.color === "white" ? "black" : "white";
               const block = GRID[row][col];

               if (block.empty || block.piece.color === colorToCheckFor) {
                    validMoves.push(move);
               }
          }

          return validMoves;
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
          for (let row = selectedBlock.row - 2; row > 0; row--) {
               const col = selectedBlock.col;

               const block = GRID[row][col - 1];
               if (block.empty) {
                    moves.push([row + 1, col]);
                    continue;
               }
               if (block.piece.color === colorToCheckFor) {
                    moves.push([row + 1, col]);
               }
               if (!block.empty || block.piece.color === selectedBlock.piece.color) break;
          }

          // find moves downwards
          for (let row = selectedBlock.row; row < GRID.length; row++) {
               const col = selectedBlock.col;

               const block = GRID[row][col - 1];

               if (block.empty) {
                    moves.push([row + 1, col]);
                    continue;
               }
               if (block.piece.color === colorToCheckFor) {
                    moves.push([row + 1, col]);
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
