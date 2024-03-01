const Screen = require("./screen");
const Cursor = require("./cursor");
const Command = require("./command")

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('w', 'move up', this.cursor.up);
    Screen.addCommand('d', 'move right', this.cursor.right);
    Screen.addCommand('s', 'move down', this.cursor.down);
    Screen.addCommand('a', 'move left', this.cursor.left);
    Screen.addCommand('o', 'Place O', this.moveO);
    Screen.addCommand('x', 'Place X', this.moveX);
    Screen.render();
  }

  moveX =() =>{
    if(this.grid[this.cursor.row][this.cursor.col] === ' '){
      Screen.setGrid(this.cursor.row,this.cursor.col,'X')
      this.grid[this.cursor.row][this.cursor.col] = 'X'
      Screen.render()
    }else console.log("Cann't replace")
    this.checkWinner()
  }

  moveO =() =>{
    if(this.grid[this.cursor.row][this.cursor.col] === ' '){
      Screen.setGrid(this.cursor.row,this.cursor.col,'O')
      this.grid[this.cursor.row][this.cursor.col] = 'O'
      Screen.render()
    }else console.log("Cann't replace")
    this.checkWinner()
  }

  checkWinner =() => {
    if((ConnectFour.checkWin(this.grid))==='T'||(ConnectFour.checkWin(this.grid))==='X'||(ConnectFour.checkWin(this.grid))==='O'){
      let winner = ConnectFour.checkWin(this.grid)
      ConnectFour.endGame(winner)
    }
  }
  static checkWin(grid) {
    let value = 'T'
    //diagonal downward check
    for(let i=0; i<grid.length-3; i++) {
      if(grid[i][i] !== " "){
        if((grid[i][i] === grid[i+1][i+1])&&(grid[i][i] === grid[i+2][i+2])&&(grid[i][i] === grid[i+3][i+3])) return grid[i][i]
      }
    }
    //diagonal upwards check
    for(let i=grid.length-1; i>2; i--) {
      for(let j=0;j<grid[i].length; j++) {
        if(grid[i][j] !==" "){
          if((grid[i][j] === grid[i-1][j+1])&&(grid[i][j] === grid[i-2][j+2])&&(grid[i][j] === grid[i-3][j+3])) return grid[i][j]
        }
      }
    }
    //horizontal check
    for(let i=0; i<grid.length; i++) {
      for(let j=0;j<grid[i].length; j++) {
        if(grid[i][j] !== " ") {
          if((grid[i][j] === grid[i][j+1])&&(grid[i][j+1] === grid[i][j+2]) && (grid[i][j+1] === grid[i][j+3])) return grid[i][j]
        }
      }
    }
    //vertical check
    for(let j=0;j<grid[0].length; j++) {
      for(let i=0; i<grid.length-3; i++) {
        if(grid[i][j] !== " ") {
          if((grid[i][j] === grid[i+1][j])&&(grid[i][j] === grid[i+2][j])&&(grid[i][j] === grid[i+3][j])) return grid[i][j]
        }
      }
    }
    for(let i=0; i<grid.length; i++) {
      for(let j=0;j<grid[i].length; j++) {
        if(grid[i][j] === " ") return false
      }
    }
    console.log(grid)
    return value
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = ConnectFour;
