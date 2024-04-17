import { useEffect } from "react";
import { useState } from "react";
import { Block } from "./classes/Block";
import { Piece, Rook } from "./classes/Piece";

const ROWS = 8;
const COLUMNS = 8;
const PIECE_POSITION = {
     11: Rook
};

function App() {
     const [GRID, setGRID] = useState([]);

     // create grid
     useEffect(() => {
          const grid = [];
          // create rows
          for (let row = 1; row <= ROWS; row++) {
               grid.push([]);

               for (let col = 1; col <= COLUMNS; col++) {
                    let piece;

                    // this is an instance of the chess piece
                    const toBePiece = PIECE_POSITION[`${row}${col}`];

                    if (toBePiece) piece = new toBePiece();

                    const color = (row + col) % 2 ? "black" : "white";

                    grid[row - 1].push(new Block({ row, col, color, piece }));
               }
          }

          setGRID(grid);
     }, []);

     console.log(GRID);

     return (
          <>
               {GRID.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                         {row.map((block, blockIndex) => (
                              <div key={blockIndex} className={`block ${block.color}`}></div>
                         ))}
                    </div>
               ))}
          </>
     );
}

export default App;
