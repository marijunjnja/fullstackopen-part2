let player1name = prompt("Player 1, please enter your name", "Player 1")
let player2name = prompt("Player 2, please enter your name", "Player 2")
let boardsize = prompt("Please choose an even number between 4 and 10 for the size of your board", 4)

const oddNumber = (number) => number % 2

while(isNaN(boardsize) || boardsize < 4 || boardsize > 10 || oddNumber(boardsize)) {
  boardsize = prompt('Invalid choice. Please choose an even number between 4 and 10', 4)
}

const totalBoardSize = boardsize ** 2
let currentPlayerTurn = player1name
let player1score = 0
let player2score = 0

document.write(`<table><tr><td><table border='1'><tr><td id='player1name' border='1' style='width:75px; text-align:right'></td></tr></table></td><td id='player1score' style='width:25px; text-align:left;'></td><td style='width:100px;'></td><td><table border='1'><tr><td id='player2name' style='width:75px; text-align:right;'></td></tr></table></td><td id='player2score' style='width:25px;text-align:left;'></td></tr></table>`)

const updateInnerHTML = (name) => {
  document.getElementById(`${name}`).innerHTML = name
}

updateInnerHTML('player1name')
updateInnerHTML('player1score')
updateInnerHTML('player2name')
updateInnerHTML('player2score')
document.write('<br><br><br><br>')

// const is immutable but the values inside a const array can be changed
const cells = []
const pieces = []
const openCards = []
const solved = 'solved'
const piece = []

const createPiece = (color) => {
  piece = [numberCreation, color]
  pushPiece(piece)
}

const pushPiece = (piece) => {
  pieces.push(piece)
  pieces.push(piece)
  if (pieces.length >= totalBoardSize) break
}

while (pieces.length < totalBoardSize) {
  for (let numberCreation = 1; numberCreation <= 4; numberCreation++) {
    createPiece('red')
    createPiece('yellow')
    createPiece('green')
    createPiece('blue')
    createPiece('orange')
    createPiece('purple')
    createPiece('gray')
    createPiece('maroon')
    createPiece('lime')
    createPiece('white')
  }
}

const alertWinner = (winner) => {
  alert(`Congratulation ${winner}, you win!`)
}

const removeEvent = (element) => {
  document.getElementById(`${element}`).removeEventListener('click', element)
}

const addEvent = (element) => {
  document.getElementById(`${element}`).addEventListener('click', element)
}

const doubleFor = (extraFeatures) => {
  for (let boardIterator1 = 0; boardIterator1 < boardsize; boardIterator1++) {
    for (let boardIterator2 = 0; boardIterator2 < boardsize; boardIterator2++) {
      let cellID = `${boardIterator1}${boardIterator2}`
      extraFeatures
    }
  }
}

const removeCellFlip = (cellID) => {
  document.getElementById(cellID).removeEventListener('click', flipCell)
}

const addCellFlip = (cellID) => {
  document.getElementById(cellID).addEventListener('click', flipCell)
}

const matchCards = () => {
  if (currentPlayerTurn === player1name) {
    player1score -= -1
    updateInnerHTML(player1score)
  } else {
    player2score -= -1
    updateInnerHTML(player2score)
  }
  let firstID = openCards[0][0]
  let secondID = openCards[1][0]

  let extraFeatures = () => {
    if (cellID === firstID || cellID === secondID) {
      removeCellFlip(cellID)
      document.getElementById(cellID).id = solved
    }
  }
  doubleFor(extraFeatures)
}

const dontMatch = () => {
  let extraFeatures = () => {
    if (document.getElementById(cellID) != null) {
      removeCellFlip(cellID)
    }
  }
  doubleFor(extraFeatures)

  document.getElementById('nextTurn').style.backgroundColor = 'red'
}

const checkGameOver = () => {
  if ((player1score + player2score) === (totalBoardSize / 2)) {
    player1score > player2score 
      ? alertWinner(player1name)
      : player2score > player1score 
        ? alertWinner(player2name)
        : alert("It's a tie game, congratulations everyone!")

    removeEvent(nextTurn)
    removeEvent(concedeGame)
  }
}

const twoFlipped = (openCards) => {
  if (openCards.length === 2) {
    if (openCards[0][1][0][0] === openCards[1][1][0][0] 
    && openCards[0][1][0][1] === openCards[1][1][0][1]) {
      matchCards()
    } else {
      dontMatch()
    }
    checkGameOver()
  }
}

const flipCell = () => {
  if (this.style.backgroundColor === 'black') {
    for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
      if (cells[cellIndex][0] === this.id) {
        this.style.backgroundColor = cells[cellIndex][1][0][1]
        this.innerHTML = cells[cellIndex][1][0][0]
        openCards.push(cells[cellIndex])
        twoFlipped(openCards)
      }
    }
  } else {
    this.style.backgroundColor = 'black'
    this.innerHTML = ''
  }
}

document.write('<table>')
for (let boardCreator1 = 0; boardCreator1 < boardsize; boardCreator1++) {
  document.write('<tr>')
  for (let boardCreator2 = 0; boardCreator2 < boardsize; boardCreator2++) {
    let cellID = `${boardCreator1}${boardCreator2}`
    document.write("<td id='cell' style='width:50px; height:50px; text-align:center; font-size:27px; font-weight:bold; background-color:black;'></td>")
    document.getElementById('cell').id = cellID
    let cellPiece = pieces.splice(Math.floor(Math.random()*pieces.length), 1)
    newCell = [cellID, cellPiece]
    cells.push(newCell)
    addCellFlip(cellID)
  }
  document.write('</tr>')
}
document.write('</table>')
document.write('<br><br><br><br>')

document.write('<table><tr><td><table border="1"><tr><td>Current Player</td></tr></table></td><td><table border="1"><tr><td id="nextTurn">Next Turn</td></tr></table></td><td style="width:50px;"></td><td><table border="1"><tr><td id="concedeGame">Concede Game</td></tr></table></td></tr></table>')

const nextTurn = () => {
  let extraFeatures = () => {
    if (document.getElementById(cellID) != null) {
      document.getElementById(cellID).innerHTML = ''
      document.getElementById(cellID).style.backgroundColor = 'black'
      addCellFlip(cellID)
    }
  }
  doubleFor(extraFeatures)
  
  currentPlayerTurn = currentPlayerTurn === player1name
    ? player2name : player1name
  updateInnerHTML(currentPlayerTurn)
  document.getElementById('nextTurn').style.backgroundColor = 'white'
}

const concedeGame = () => {
  currentPlayerTurn === player1name
    ? alertWinner(player2name)
    : alertWinner(player1name)

  let extraFeatures = () => {
    if (document.getElementById(cellID) != null) {
      removeCellFlip(cellID)
    }
  }
  doubleFor(extraFeatures)
  removeEvent(nextTurn)
  removeEvent(concedeGame)
}

addEvent(nextTurn)
addEvent(concedeGame)
updateInnerHTML(currentPlayerTurn)