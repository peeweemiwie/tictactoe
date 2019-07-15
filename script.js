let player1Arr = [];
let player2Arr = [];
const player1Chip = document.querySelector('.player1');
const player2Chip = document.querySelector('.player2');
const player1Icon = '<i class="material-icons">panorama_fish_eye</i>';
const player2Icon = '<i class="material-icons">close</i>';
let currentPlayer;
let currentIcon;
let currentPlayerArr;

// winning pattern
const winningPattern = [
  ['a1', 'a2', 'a3'],
  ['b1', 'b2', 'b3'],
  ['c1', 'c2', 'c3'],
  ['a1', 'b1', 'c1'],
  ['a2', 'b2', 'c2'],
  ['a3', 'b3', 'c3'],
  ['a1', 'b2', 'c3'],
  ['a3', 'b2', 'c1']
];

// initial assignment of player
const assignCurrentPlayer = () =>{
  if(currentPlayer === undefined) {
    currentPlayer = 'player1'
    currentIcon = player1Icon;
    currentPlayerArr = player1Arr;
    player1Chip.classList.add('current');
  }
}
assignCurrentPlayer();

// switch information of current player 
const togglePlayer = () => {
  if(currentPlayer === 'player1') {
    currentPlayer = 'player2';
    player1Chip.classList.remove('current');
    player2Chip.classList.add('current');
    currentIcon = player2Icon;
    currentPlayerArr = player2Arr;
  } else if (currentPlayer === 'player2') {
    currentPlayer = 'player1';
    player1Chip.classList.add('current');
    player2Chip.classList.remove('current');
    currentIcon = player1Icon;
    currentPlayerArr = player1Arr;
  }
}

// highlight cells when won
let highlighCells = array => {
  array.forEach(id => {
    document.getElementById(id).classList.add('highlight');
  })
}

const diableCells = () => {
  document.querySelectorAll('.cell').forEach(el => {
    el.disabled = true;
  })
}

// check currentPlayerArr to see if it matches with one of arrays inside winningPattern
let didWin = () => {
  for(let arr of winningPattern){
    let match = 0;
    for(let idPlayerArr of currentPlayerArr){ 
      for(let idPatternArr of arr) {
        if (idPlayerArr === idPatternArr) {
          match++;
          if(match === 3){
            diableCells();
            highlighCells(arr);
            document.querySelector('.current').classList.add('won');
            return true;
          }
        }
      } 
    }
  }
  return false;
}

// When a player clicks cell, icon ( 'O' or 'X') gets rendered
document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', e => {
    const target = e.target;
    target.insertAdjacentHTML('afterbegin', currentIcon);
    // Add clicked cell's ID to currentPlayerArr
    currentPlayerArr.push(target.id);
    // If currentPlayerArr length is grater than 3 - check to see if won
    if(currentPlayerArr.length >= 3) {
      let returnedResult = didWin();
      if (currentPlayerArr.length === 5 && !returnedResult){
        document.querySelector('.sub-title').classList.add('tied');
        document.querySelectorAll('.player').forEach(el => {
          el.classList.remove('current');
        })
      } else if (!returnedResult){
        togglePlayer();
      }
    } else {
      togglePlayer();
    }
    target.disabled = true;
  })
})

// project for pair programming
// I could like to activate 'Play again!' button which will
// 1) remove 'won!' or 'tied' badge
// 2) remove all x and O icons 
// 3) enable cell buttons
// 4) enable 'Play again!' button