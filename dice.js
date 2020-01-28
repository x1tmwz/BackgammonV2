
const d =".."
class Dices {
    constructor() {
        this.domDice1 = document.createElement("img")
        this.domDice2 = document.createElement("img")
        this.domDice1.setAttribute("class","dice1");
        this.domDice2.setAttribute("class","dice2");
        this.domDice1.setAttribute("src","../resources/Dice_img/dice1.png");
        this.domDice2.setAttribute("src","../resources/Dice_img/dice1.png");
        this.domButton= document.createElement("button");
        this.domButton.setAttribute("class","throw");
        this.domButton.innerHTML ="throw dice";
        this.domButton.addEventListener("click",()=>{
            this.throwDice();
            this.render();
        })
        this.dice1 = 1;
        this.dice2 = 1;
    }
    throwDice() {
        this.dice1 = Math.floor(Math.random() * 6);
        this.dice2 = Math.floor(Math.random() * 6);
        if (this.dice1 === this.dice2) {
            return [this.dice1, this.dice1, this.dice1,this.dice1];
        }
        return [this.dice1, this.dice2];
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
let r = new Dices(); 
let body =document.querySelector(".myMain");
body.appendChild(r.domDice1);
body.appendChild(r.domDice2);
body.appendChild(r.domButton);


