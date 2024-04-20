import { useEffect } from "react";
import { useState } from "react";
import { Block } from "./classes/Block";
import { Piece, Pawn, Bishop, Rook, Knight, Queen, King } from "./classes/Piece";
import { FaChessBishop, FaChessKing, FaChessKnight, FaChessPawn, FaChessQueen, FaChessRook } from "react-icons/fa";
import { FcLikePlaceholder } from "react-icons/fc";
import { combineClasses } from "./utils/utils";

const ROWS = 8;
const COLUMNS = 8;
const PIECE_POSITION = {
     // first row
     "00": new Rook({ color: "black" }),
     "01": new Knight({ color: "black" }),
     "02": new Bishop({ color: "black" }),
     "03": new Queen({ color: "black" }),
     "04": new King({ color: "black" }),
     "05": new Bishop({ color: "black" }),
     "06": new Knight({ color: "black" }),
     "07": new Rook({ color: "black" }),
     // second row
     10: new Pawn({ color: "black" }),
     11: new Pawn({ color: "black" }),
     12: new Pawn({ color: "black" }),
     13: new Pawn({ color: "black" }),
     14: new Pawn({ color: "black" }),
     15: new Pawn({ color: "black" }),
     16: new Pawn({ color: "black" }),
     17: new Pawn({ color: "black" }),
     // seventh row
     60: new Pawn({ color: "white" }),
     61: new Pawn({ color: "white" }),
     62: new Pawn({ color: "white" }),
     63: new Pawn({ color: "white" }),
     64: new Pawn({ color: "white" }),
     65: new Pawn({ color: "white" }),
     66: new Pawn({ color: "white" }),
     67: new Pawn({ color: "white" }),
     // eight row
     70: new Rook({ color: "white" }),
     71: new Knight({ color: "white" }),
     72: new Bishop({ color: "white" }),
     73: new Queen({ color: "white" }),
     74: new King({ color: "white" }),
     75: new Bishop({ color: "white" }),
     76: new Knight({ color: "white" }),
     77: new Rook({ color: "white" })
};

function App() {
     const [GRID, setGRID] = useState([]);
     const [selectedBlock, setSelectedBlock] = useState(null);

     function handlePieceSelect(event) {
          const [row, col] = event.currentTarget.id.split("-");
          const block = GRID[row][col];

          // don't do anything if the block is empty
          if (block.empty) return;

          // set this block as selected and store it as selected block
          block.select();
          setSelectedBlock(block);
     }

     function handlePieceDrop(event) {
          // set the already selected block as unselected
          selectedBlock.unselect();
          setSelectedBlock(null);
     }

     // create grid
     useEffect(() => {
          const grid = [];

          for (let row = 0; row < ROWS; row++) {
               grid.push([]);

               for (let col = 0; col < COLUMNS; col++) {
                    const piece = PIECE_POSITION[`${row}${col}`];
                    const color = (row + col) % 2 ? "black" : "white";

                    grid[row].push(new Block({ row, col, color, piece }));
               }
          }

          setGRID(grid);
     }, []);

     // run this everytime player selects a piece
     useEffect(() => {
          // clear possible paths when a block is unselected
          if (!selectedBlock) {
               setGRID((previousGrid) => {
                    for (const row of previousGrid) {
                         for (const block of row) {
                              block.droppable = false;
                         }
                    }

                    return [...previousGrid];
               });
          }

          // show possible paths when a block is selected
          if (selectedBlock && !selectedBlock.empty) {
               const moves = selectedBlock.piece.findMoves(GRID, selectedBlock);

               setGRID((previousGrid) => {
                    for (const [row, col] of moves) {
                         previousGrid[row][col].droppable = true;
                    }

                    return [...previousGrid];
               });
          }
     }, [selectedBlock]);

     return (
          <>
               {GRID.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                         {row.map((block, blockIndex) => (
                              <div
                                   key={`${rowIndex}-${blockIndex}`}
                                   id={`${rowIndex}-${blockIndex}`}
                                   className={combineClasses(
                                        "block",
                                        block.color,
                                        block.selected && "selected",
                                        block.droppable && "droppable",
                                        !block.empty && block.droppable && "kill"
                                   )}
                                   onClick={selectedBlock ? handlePieceDrop : handlePieceSelect}
                              >
                                   {(function () {
                                        if (block.empty) return;

                                        const props = {
                                             fill: block.piece.color,
                                             stroke: "black",
                                             strokeWidth: 5
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
