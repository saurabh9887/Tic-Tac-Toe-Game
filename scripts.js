const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageTextElement = document.querySelector('[data-winnig-message-text]')
const winnigMessageElement = document.getElementById('winningMessage')
const restartBtn = document.getElementById('restartButton');

const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
let circleTurn=false;
// console.log(cellElements);

const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

startGame();

restartBtn.addEventListener('click',startGame);

function startGame(){
    circleTurn = false;
    cellElements.forEach(cell=>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click',handleclick)
        cell.addEventListener('click',handleclick,{once:true});
    })
    setBoardHoverClass();
    winnigMessageElement.classList.remove('show');
}

// Things to do when the cell is beign clicked!
// place mark - done
// check for winner
// check for draw
// switch turns - 

function handleclick(e){
    const cell=e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell,currentClass);

    if(checkWin(currentClass)){
        endGame(false);
    }
    else if(isDraw()){
        endGame(true);
    }
    else{
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = 'Draw!'
    }
    else{
        winningMessageTextElement.innerText = `${circleTurn? "O's " : "X's "} Wins!`
    }
    winnigMessageElement.classList.add('show')
}

function isDraw(){
    return [...cellElements].every(cell=>{
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(CIRCLE_CLASS);
    })
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);

    if(circleTurn){
        board.classList.add(CIRCLE_CLASS);
    }
    else{
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination=>{
        return combination.every(index=>{ 
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

//combinations here is nothing but WINNING_COMBINATIONS[i];
//index here is combinations[i];

// combinations example is like [0,1,2];
// index example is like 0 from the above which is nothing but combinations[0];
// And now in 3rd return statment we are checking if all the indexs has the same class or not? If same then we are the ultimate winner of this round!