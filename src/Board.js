import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols:5,
    chanceLightStartsOn: 0.25
  }
  constructor(props) {
    super(props);
    this.state ={
      hasWon: false,
      board: this.createBoard()
    }

    // TODO: set initial state
  }


  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for(let i=0;i<this.props.nrows;i++)
    {
      let row = [];
      for(let j=0;j<this.props.ncols;j++)
      {
        row.push(Math.random() < this.props.chanceLightStartsOn)
      }
      board.push(row)
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    console.log('Flipping', coord);
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    flipCell(y,x);
    flipCell(y,x-1);
    flipCell(y-1,x);
    flipCell(y+1,x);
    flipCell(y,x+1);
    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won
    let hasWon =  board.every(row=> row.every(cell => !cell))
    this.setState({board: board, hasWon:hasWon});
  }


  /** Render game board or winning message. */

  render() {
    if(this.state.hasWon)
    {
      return(
        <div className="Board-title">
          <div className="winner">
            <span className="neon-orange">YOU</span>
            <span className="neon-blue">WIN!!</span>  
          </div>

        </div>
      )
    }
    let tblBoard = []
    for(let i=0;i<this.props.nrows;i++)
    {
      let row = [];
      for(let j=0;j<this.props.ncols;j++){
        let cord = `${i}-${j}`
      row.push(< Cell key={cord} isLit={this.state.board[i][j]} flipCellsAroundMe = {()=> this.flipCellsAround(cord)}/>)
      }
      tblBoard.push(<tr key={i}>{row}</tr>)
    }
    // if the game is won, just show a winning msg & render nothing else

    // TODO
    return(
      <div>
        <div className="neon-orange">Lights</div>
        <div className="neon-blue">Out</div>
        <table className="Board">
          <tbody> {tblBoard} </tbody>
        </table>
      </div>
    ) 

    // make table board

    // TODO
  }
}


export default Board;
