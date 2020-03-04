// let sheshBesh = new Backgammon();
// document.body.appendChild(sheshBesh.domComponent);
const backgammonState = new BackgammonState();
const dice = new Dice();
const diceUI = new DiceRender();
const throwDiceButtonHandler =(e)=>{
    dice.throwDice();
    backgammonState.dispatch({dice:dice.getDice()})
    diceUI.setState(dice.getDice());
    console.log(backgammonState.getState());
}

DiceRender.prototype.throwDiceButtonHandler = throwDiceButtonHandler;
document.body.appendChild(diceUI.domComponent);


