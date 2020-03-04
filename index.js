// let sheshBesh = new Backgammon();
// document.body.appendChild(sheshBesh.domComponent);
const dice = new Dice();
const diceUI = new DiceRender();
const throwDiceButtonHandler =(e)=>{
    dice.throwDice();
    diceUI.setState(dice.getDice());
}

DiceRender.prototype.throwDiceButtonHandler = throwDiceButtonHandler;
document.body.appendChild(diceUI.domComponent);


