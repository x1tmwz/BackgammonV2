
class doubleDice{
    constructor() {
        this.createComponent();
    }
    throwDice() {
        this.dice1 = Math.floor(Math.random() * 6);
        this.dice2 = Math.floor(Math.random() * 6);
    }
    getDice(){
        return [this.dice1,this.dice2];
    }
    createComponent(){
        this.domDice1 = createDom("img",{className:"dice",src:"../resources/Dice_img/dice1.png"});
        this.domDice2 = createDom("img",{className:"dice",src:"../resources/Dice_img/dice1.png"});
        this.domButton = createDom("button",{onclick:()=>{
            this.throwDice();
            this.render();
        },className:"throwButton"},"throw Dice");
        this.domComponent = createDom("div",{className:"doubleDiceCompnent"},this.domDice1,"  ",this.domDice2,"  ",this.domButton);
    }
    makeButtonDisabled(){
        this.domButton.disabled = !this.domButton.disabled;
    }

    render() {
        const imges = ["../resources/Dice_img/dice1.png",
        "../resources/Dice_img/dice2.png",
         "../resources/Dice_img/dice3.png",
          "../resources/Dice_img/dice4.png",
           "../resources/Dice_img/dice5.png",
            "../resources/Dice_img/dice6.png"];

        
        
        this.domDice1.setAttribute("src",imges[this.dice1]);
        this.domDice2.setAttribute("src",imges[this.dice2]);
    }
}


