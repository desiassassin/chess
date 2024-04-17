export class Block {
     constructor({ row, col, color, piece }) {
          this.row = row;
          this.col = col;
          this.color = color;
          this.piece = piece;
          this.empty = !!!piece;
          this.selected = false;
          this.droppable = false;
     }

     select() {
          this.selected = true;
     }

     unselect() {
          this.selected = false;
     }
}
