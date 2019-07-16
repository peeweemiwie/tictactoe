let player1Arr = [];
let player2Arr = [];
const player1Chip = document.querySelector('.player1');
const player2Chip = document.querySelector('.player2');
const subtitle = document.querySelector('.header .sub-title');
const player1Icon = '<i class="material-icons">panorama_fish_eye</i>';
const player2Icon = '<i class="material-icons">close</i>';
let currentPlayer;
let currentIcon;
let currentPlayerArr;
let gameResult;

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

// set disabled states on cells - true / false
const diabledCells = status => {
  document.querySelectorAll('.cell').forEach(el => {
    el.disabled = status;
  })
}

// set disabled states on cells - true / false
const disabledReplayBtn = status => {
  document.querySelector('.replay').disabled = status;
}

const removeClassName = (elem, className) => {
  document.querySelectorAll(elem).forEach(el => {
    el.classList.remove(className);
  })
}

// initial assignment of a player
const init = () =>{
  disabledReplayBtn(true);
  currentPlayer = 'player1';
  currentIcon = player1Icon;
  currentPlayerArr = player1Arr;
  player1Chip.classList.add('current');
}
init();

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

// highlight cells when won and remove when replay
let highlighCells = (array, method)=> {
  array.forEach(id => {
    if(method === 'add'){
      document.getElementById(id).classList.add('highlight');
    }else if(method === 'remove'){
      document.getElementById(id).classList.remove('highlight');
    }
  })
}


// check currentPlayerArr to see if it matches with one of arrays inside winningPattern
// if won - returns an array from winningPattern else returns false
let didWin = () => {
  for(let arr of winningPattern){
    let match = 0;
    for(let idPlayerArr of currentPlayerArr){ 
      for(let idPatternArr of arr) {
        if (idPlayerArr === idPatternArr) {
          match++;
          if(match === 3){
            // returns an array from winningPattern to indicate which cells are to get highlighted
            return arr;
          }
        }
      } 
    }
  }
  return false;
}

// evaluate returned value from didWin
// provide instruction what to do when won/tied/keep playing
const evaluateResult = () => {
  const array = didWin();
  if (!array){ 
    // game result: tied
    if(currentPlayerArr.length === 5){
      subtitle.classList.add('tied');
      removeClassName('.player', 'current');
      disabledReplayBtn(false);  
    // Hasn't won/lost yet. keep playing
    } else {
      togglePlayer();
    }
  // game result: won! 
  } else {
    diabledCells(true);
    highlighCells(array, 'add');
    document.querySelector('.current').classList.add('won');
    disabledReplayBtn(false);
  }
}

document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', e => {
    const target = e.target;
    // icon ( 'O' or 'X') gets inserted
    target.insertAdjacentHTML('afterbegin', currentIcon);

    // Clicked cell's ID gets push to currentPlayerArr
    currentPlayerArr.push(target.id);

    // If currentPlayerArr length is grater than 3 - check to see if won
    if(currentPlayerArr.length >= 3) {
      evaluateResult();
    } else {
      togglePlayer();
    }

    // once cell is selected player can no longer click the cell 
    target.disabled = true;
  })
})

// To do list for pair programming
// I could like to add feature to 'Play again!' button which will:
// 1) remove 'won!' or 'tied' badge
// 2) remove all x and O icons 
// 3) enable cell buttons
// 4) enable 'Play again!' button

// const clearCells = ()=> {
//   gameResult = didWin();
//   document.querySelectorAll('.cell').forEach(cell => {
//     while (cell.firstChild) {
//       cell.removeChild(cell.firstChild);
//     }
//     if(gameResult){
//       highlighCells(gameResult, 'remove');
//     }   
//     diabledCells(false);
//   })
// }

// // remove 'won!' or 'tied' badge
// const removeResultBadge = () => {
//   document.querySelectorAll('.player').forEach(el => {
//     if(el.classList.contains('won')){
//       el.classList.remove('won')
//     }
//   })
  
//   if(subtitle.classList.contains('tied')){
//     subtitle.classList.remove('tied');
//   }
// }

// document.querySelector('.replay').addEventListener('click', ()=>{
//   clearCells();
//   removeResultBadge();
//   gameResult = undefined;
//   currentPlayer = undefined;
//   player1Arr = [];
//   player2Arr = [];
//   currentPlayerArr = [];
//   init();
// })