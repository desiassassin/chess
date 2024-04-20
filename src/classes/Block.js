export class Block {
     constructor({ row, col, color, piece }) {
          this.row = row;
          this.col = col;
          this.color = color; // block color
          this.piece = piece;
          this.empty = !!!piece;
          this.selected = false;
          this.droppable = false;
     }

     assignPiece(piece) {
          this.piece = piece;
          this.empty = false;
          this.piece.moved = true;
     }

     removePiece() {
          this.piece = undefined;
          this.empty = true;
     }

     select() {
          this.selected = true;
     }

     unselect() {
          this.selected = false;
     }
}
