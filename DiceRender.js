
class DiceRender {
    constructor() {
        this.createComponent();
    }
    syncState(state) {
        this.dice = state;
        this.render();
    }
    createComponent() {
        this.dieDom1 = createDom("img", { className: "doubleDice__die", src: "../resources/Dice_img/dice1.png" });
        this.dieDom2 = createDom("img", { className: "doubleDice__die", src: "../resources/Dice_img/dice1.png" });
        this.domButton = createDom("button", {
            onclick: () => {
                this.throwDiceButtonHandler();
            }, className: "doubleDice__throwButton"
        }, "throw Dice");
        this.domComponent = createDom("div", { className: "doubleDice" }, this.dieDom1, this.dieDom2, this.domButton);
    }
    makeButtonDisabled() {
        this.domButton.disabled = !this.domButton.disabled;
    }
    render() {
        const imges = ["../resources/Dice_img/dice1.png",
            "../resources/Dice_img/dice2.png",
            "../resources/Dice_img/dice3.png",
            "../resources/Dice_img/dice4.png",
            "../resources/Dice_img/dice5.png",
            "../resources/Dice_img/dice6.png"];
        this.dieDom1.setAttribute("src", imges[this.dice[0] - 1]);
        this.dieDom2.setAttribute("src", imges[this.dice[1] - 1]);
    }
}


