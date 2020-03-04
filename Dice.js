class Dice {
    constructor() {
        this.die1 = 1;
        this.die2 = 1;
    }
    throwDice() {
        this.die1 = Math.ceil(Math.random() * 6);
        this.die2 = Math.ceil(Math.random() * 6);
    }
    resetDice() {
        this.die1 = null;
        this.die2 = null;
    }
    getDice() {
        return [this.die1,this.die2];
    }
}


