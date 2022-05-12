import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function App() {
  
/**
 * Square is a function that returns a button element with a className of square and an onClick event
 * that calls the onClick function passed in as a prop.
 * @param props - This is the object that contains all the properties that are passed to the component.
 * @returns A button with a class of square and an onClick event that calls the onClick function in the
 * props.
 */
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

/* Returning a Square component. */
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  /**
   * It returns a div with three child divs, each of which contains three Square components.
   * @returns The renderSquare function is being returned.
   */
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

/* This is the constructor for the Game class. It is initializing the state of the Game class. */
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  /**
   * If the square is not empty or if there is a winner, return. Otherwise, set the square to X or O,
   * depending on the value of xIsNext, and update the history and stepNumber states.
   * @param i - The index of the square that was clicked.
   * @returns the squares array with the value of the square that was clicked.
   */
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  /**
   * The jumpTo() function takes a step as an argument and sets the state of the stepNumber and xIsNext
   * to the step and the remainder of the step divided by 2, respectively.
   * @param step - The step number we want to jump to.
   */
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  
  /* Rendering the game board. */
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    /* Setting the status of the game. If there is a winner, it will display the winner. If there is no
    winner, it will display the next player. */
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

/* Rendering the Game component to the DOM. */
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

/**
 * If any of the winning combinations are true, return the winner (X or O).
 * @param squares - an array of 9 squares
 * @returns The winner of the game.
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  /* Checking to see if any of the winning combinations are true. If they are, it will return the
  winner (X or O). */
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

}

export default App;
