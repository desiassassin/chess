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
     "00": new Rook({ color: "black", player: 2 }),
     "01": new Knight({ color: "black", player: 2 }),
     "02": new Bishop({ color: "black", player: 2 }),
     "03": new Queen({ color: "black", player: 2 }),
     "04": new King({ color: "black", player: 2 }),
     "05": new Bishop({ color: "black", player: 2 }),
     "06": new Knight({ color: "black", player: 2 }),
     "07": new Rook({ color: "black", player: 2 }),
     // second row
     10: new Pawn({ color: "black", player: 2 }),
     11: new Pawn({ color: "black", player: 2 }),
     12: new Pawn({ color: "black", player: 2 }),
     13: new Pawn({ color: "black", player: 2 }),
     14: new Pawn({ color: "black", player: 2 }),
     15: new Pawn({ color: "black", player: 2 }),
     16: new Pawn({ color: "black", player: 2 }),
     17: new Pawn({ color: "black", player: 2 }),
     // seventh row
     60: new Pawn({ color: "white", player: 1 }),
     61: new Pawn({ color: "white", player: 1 }),
     62: new Pawn({ color: "white", player: 1 }),
     63: new Pawn({ color: "white", player: 1 }),
     64: new Pawn({ color: "white", player: 1 }),
     65: new Pawn({ color: "white", player: 1 }),
     66: new Pawn({ color: "white", player: 1 }),
     67: new Pawn({ color: "white", player: 1 }),
     // eight row
     70: new Rook({ color: "white", player: 1 }),
     71: new Knight({ color: "white", player: 1 }),
     72: new Bishop({ color: "white", player: 1 }),
     73: new Queen({ color: "white", player: 1 }),
     74: new King({ color: "white", player: 1 }),
     75: new Bishop({ color: "white", player: 1 }),
     76: new Knight({ color: "white", player: 1 }),
     47: new Rook({ color: "white", player: 1 })
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
          // moving piece logic goes here
          const [row, col] = event.currentTarget.id.split("-").map(Number);
          const nextBlock = GRID[row][col];

          // do nothing if the next block is not droppable and is not the same block
          if (!nextBlock.droppable && row !== selectedBlock.row && col !== selectedBlock.col) return;

          /* move selected block to next block */
          if (nextBlock.droppable) {
               nextBlock.assignPiece(selectedBlock.piece);
               selectedBlock.removePiece();
          }

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
