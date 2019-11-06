let player1name = prompt('Player 1, please enter your name', 'Player 1')
let player2name = prompt('Player 2, please enter your name', 'Player 2')
let boardsize = prompt('Please choose an even number between 4 and 10 for the size of your board', 4)

const numReg = /^(4|6|8|10)$/gm
while (!numReg.test(boardsize)) {
  boardsize = prompt('Invalid choice. Please choose an even number between 4 and 10', 4)
}

const totalBoardSize = boardsize ** 2
const player1 = {
  name: player1name,
  score: 0,
  turn: true
}
const player2 = {
  name: player2name,
  score: 0,
  turn: false
}

const cells = [{
  color,
  number,
  face,
  solved
}]

