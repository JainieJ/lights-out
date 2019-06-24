import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  };
  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
    this.flipCellsAround = this.flipCellsAround.bind(this);
    this.createBoard = this.createBoard.bind(this);
    this.makeTable = this.makeTable.bind(this);
  }

  createBoard() {
    let board = [];
    for (let i = 0; i < this.props.nrows; i++) {
      let rows = Array.from({ length: this.props.nrows }, element => {
        return Math.random() < this.props.chanceLightStartsOn;
      });
      board.push(rows);
    }
    return board;
  }

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = [...this.state.board];
    //turning the coordinate string to a number
    let [y, x] = coord.split("-").map(Number);
    //changing true ti false and vice versa
    flipCell(y, x);
    flipCell(y - 1, x);
    flipCell(y, x + 1);
    flipCell(y + 1, x);
    flipCell(y, x - 1);
    //the game is won when there are no true values on x and y axes
    let hasWon = board.every(row => {
      return row.every(col => col !== true);
    });

    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    this.setState({ board, hasWon });
  }

  makeTable() {
    return (
      <tbody>
        {this.state.board.map((r, idxRow) => (
          <tr key={idxRow}>
            {r.map((c, idxCol) => (
              <Cell
                key={`${idxRow}-${idxCol}`}
                id={`${idxRow}-${idxCol}`}
                isLit={c}
                flipCellsAroundMe={this.flipCellsAround}
              />
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  /** Render game board or winning message. */

  render() {
    return this.state.hasWon ? (
      <div className="Board-title">
        <div className="winner">
          <span className="neon-orange">YOU</span>
          <span className="neon-blue">WIN!</span>
        </div>
      </div>
    ) : (
      <div>
        <div className="Board-title">
          <div className="neon-orange">Lights</div>
          <div className="neon-blue">Out</div>
        </div>
        <table className="Board">{this.makeTable()}</table>
      </div>
    );
  }
}

export default Board;
