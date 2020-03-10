



const dice = new Dice();
const diceUI = new DiceRender();
const backgammonState = new BackgammonState();
const backgammonRender = new BackgammonRender(backgammonState.getState());

const throwDiceButtonHandler =(e)=>{
    dice.throwDice();
    backgammonState.dispatch({dice:dice.getDice()})
    backgammonRender.syncState(backgammonState.getState());
}
DiceRender.prototype.throwDiceButtonHandler = throwDiceButtonHandler;



document.body.appendChild(backgammonRender.domComponent);



