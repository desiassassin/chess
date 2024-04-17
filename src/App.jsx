import { useEffect } from "react";
import { useState } from "react";
import { Block } from "./classes/Block";
import { Piece, Pawn, Bishop, Rook, Knight, Queen, King } from "./classes/Piece";
import { FaChessBishop, FaChessKing, FaChessKnight, FaChessPawn, FaChessQueen, FaChessRook } from "react-icons/fa";
import { FcLikePlaceholder } from "react-icons/fc";

const ROWS = 8;
const COLUMNS = 8;
const PIECE_POSITION = {
     // first row
     11: new Rook({ color: "black" }),
     12: new Knight({ color: "black" }),
     13: new Bishop({ color: "black" }),
     14: new King({ color: "black" }),
     15: new Queen({ color: "black" }),
     16: new Bishop({ color: "black" }),
     17: new Knight({ color: "black" }),
     18: new Rook({ color: "black" }),
     // second row
     21: new Pawn({ color: "black" }),
     22: new Pawn({ color: "black" }),
     23: new Pawn({ color: "black" }),
     24: new Pawn({ color: "black" }),
     25: new Pawn({ color: "black" }),
     26: new Pawn({ color: "black" }),
     27: new Pawn({ color: "black" }),
     28: new Pawn({ color: "black" }),
     // seventh row
     71: new Pawn({ color: "white" }),
     72: new Pawn({ color: "white" }),
     73: new Pawn({ color: "white" }),
     74: new Pawn({ color: "white" }),
     75: new Pawn({ color: "white" }),
     76: new Pawn({ color: "white" }),
     77: new Pawn({ color: "white" }),
     78: new Pawn({ color: "white" }),
     // eight row
     81: new Rook({ color: "white" }),
     82: new Knight({ color: "white" }),
     83: new Bishop({ color: "white" }),
     84: new Queen({ color: "white" }),
     85: new King({ color: "white" }),
     86: new Bishop({ color: "white" }),
     87: new Knight({ color: "white" }),
     88: new Rook({ color: "white" })
};

function App() {
     const [GRID, setGRID] = useState([]);

     // create grid
     useEffect(() => {
          const grid = [];

          for (let row = 1; row <= ROWS; row++) {
               grid.push([]);

               for (let col = 1; col <= COLUMNS; col++) {
                    const piece = PIECE_POSITION[`${row}${col}`];
                    const color = (row + col) % 2 ? "black" : "white";

                    grid[row - 1].push(new Block({ row, col, color, piece }));
               }
          }

          setGRID(grid);
     }, []);

     return (
          <>
               {GRID.map((row, rowIndex) => (
                    <div key={rowIndex + 1} className="row">
                         {row.map((block, blockIndex) => (
                              <div
                                   key={`${rowIndex + 1}-${blockIndex + 1}`}
                                   id={`${rowIndex + 1}-${blockIndex + 1}`}
                                   className={`block ${block.color}`}
                              >
                                   {(function () {
                                        if (block.empty) return;

                                        const props = {
                                             fill: block.piece.color,
                                             stroke: "black",
                                             strokeWidth: 10
                                        };

                                        if (block.piece instanceof Pawn) {
                                             return <FaChessPawn {...props} />;
                                        } else if (block.piece instanceof Bishop) {
                                             return <FaChessBishop {...props} />;
                                        } else if (block.piece instanceof Rook) {
                                             return <FaChessRook {...props} />;
                                        } else if (block.piece instanceof Knight) {
                                             return <FaChessKnight {...props} />;
                                        } else if (block.piece instanceof Queen) {
                                             return <FaChessQueen {...props} />;
                                        } else if (block.piece instanceof King) {
                                             return <FaChessKing {...props} />;
                                        } else {
                                             return <FcLikePlaceholder />;
                                        }
                                   })()}
                              </div>
                         ))}
                    </div>
               ))}
          </>
     );
}

export default App;
