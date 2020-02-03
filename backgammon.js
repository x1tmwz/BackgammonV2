class Backgammon {
    constructor() {
        this.doubleDiceDom = new doubleDice();
        this.createMapOfDiscsOnBoard();
        this.eatenSoliders = [];
        this.whiteTurn = true;
        this.createComponent();
       
    }
    
    getDiceScore(){
        this.diceThrowScroe = this.doubleDiceDom.getDice();
        if(diceNumbsers){
            if (diceNumbsers[0] === diceNumbsers[1]) {
                this.diceThrowScroe = [diceNumbsers[0], diceNumbsers[0], diceNumbsers[0], diceNumbsers[0]];
            }
            else {
                this.diceThrowScroe = [diceNumbsers[0], diceNumbsers[1]];
            }
        }
       
    }
    removeDiceScroe(from, to) {
        let dice = Math.abs(to - from.x);
        let index = this.diceThrowScroe.indexOf(dice);
        this.diceThrowScroe = this.diceThrowScroe.slice(0, index).concat(index);
    }
    render() {
        for (let i = 0; i < this.tdArray.length; i++) {
            if (this.tdArray[i].childNodes.length !== 0) {
                for (let j = 0; j < this.tdArray[i].childNodes.length; j++) {
                    this.tdArray[i].removeChild(this.tdArray.childNodes[j]);
                }
            }
        }
        for (let i = 0; i < this.locationsOfDiscs.length; i++) {
            if (this.locationsOfDiscs[i].length !== 0) {
                for (let j = 0; j < this.locationsOfDiscs[i].length; j++) {
                    this.tdArray[i].appendChild(this.locationsOfDiscs[i][j].domComponent)
                }
            }
            for (let i = 0; i < this.eatTableDom.length; i++) {
                this.eatTableDom[i].removeChild(this.eatTableDom.childNodes[j]);
            }
            for (let i = 0; this.eatenSoliders.length; i++) {
                this.eatTableDom[i].appendChild(this.eatenSoliders[i].domComponent);

            }
        }

    }
    changeTurn() {
        this.whiteTurn = !this.whiteTurn;
    }
    createComponent() {
        function createTable1D(size, className) {
            let table = createDom("table", { className });
            let row = table.insertRow(0);
            for (let i = 0; i < size; i++) {
                let cell = row.insertCell(i);
            }
            return table;
        }
        let eatenTable = createTable1D(1, "eatenTable");
        this.eatTableDom = Array.from(eatenTable.getElementsByTagName("td"));
        let table1 = createTable1D(6, "table1");
        let table2 = createTable1D(6, "table2");
        let table3 = createTable1D(6, "table3");
        let table4 = createTable1D(6, "table4");
        let tdOftable1 = Array.from(table1.getElementsByTagName("td"));
        let tdOftable2 = Array.from(table2.getElementsByTagName("td"));
        let tdOftable3 = Array.from(table3.getElementsByTagName("td"));
        let tdOftable4 = Array.from(table4.getElementsByTagName("td"));
        this.tdArray = tdOftable2.concat(tdOftable1, tdOftable3.reverse(), tdOftable4.reverse());
        for (let i = 0; i < this.locationsOfDiscs.length; i++) {
            if (this.locationsOfDiscs[i].length !== 0) {
                this.tdArray[i].addEventListener("dragend",this.playWhenDrop);
                this.tdArray[i].addEventListener("dragover",(ev)=>{ev.preventDefault()});
                this.tdArray[i].id = i;
                for (let j = 0; j < this.locationsOfDiscs[i].length; j++) {
                    this.tdArray[i].appendChild(this.locationsOfDiscs[i][j].domComponent)
                }
            }
        }
        let boardImgDom = createDom("img", { className: "boardImg", src: "../resources/Borad_img/board.png" });
        this.domComponent = createDom("div", { className: "backgammon" }, this.doubleDiceDom.domComponent, boardImgDom, eatenTable, table1, table2, table3, table4);
    }
    createMapOfDiscsOnBoard() {
        this.locationsOfDiscs = [];
        for (let i = 0; i < 24; i++) {
            this.locationsOfDiscs.push([]);
        }
        this.locationsOfDiscs[0] = ["R", "R"];
        this.locationsOfDiscs[5] = ["W", "W", "W", "W", "W"];
        this.locationsOfDiscs[7] = ["W", "W", "W"];
        this.locationsOfDiscs[11] = ["R", "R", "R", "R", "R"];
        this.locationsOfDiscs[12] = ["W", "W", "W", "W", "W"];
        this.locationsOfDiscs[16] = ["R", "R", "R"];
        this.locationsOfDiscs[18] = ["R", "R", "R", "R", "R"];
        this.locationsOfDiscs[23] = ["W", "W"];
        for (let i = 0; i < this.locationsOfDiscs.length; i++) {
            if (this.locationsOfDiscs[i].length !== 0) {
                for (let j = 0; j < (this.locationsOfDiscs[i]).length; j++) {
                    let color = this.locationsOfDiscs[i][j];
                    let id = i * this.locationsOfDiscs.length + j;
                    this.locationsOfDiscs[i][j] = new Disc(color, id);
                }
            }
        }
    }
    findDiscLocation(id) {
        for (let i = 0; i < this.locationsOfDiscs; i++) {
            if (this.locationsOfDiscs[i].length !== 0) {
                for (let j = 0; j < this.locationsOfDiscs[i].length; j++) {
                    if (this.locationsOfDiscs[i][j].id === id) {
                        return { x: i, y: j };
                    }
                }
            }
        }
        return null;


    }
    checkIfAnySoliderOfMineCanMoveBaseOnMyDiceNumber() {
        let color = "W";
        if (!this.whiteTurn) {
            color = "R";
        }
        for (let i = 0; i < this.locationsOfDiscs.length; i++) {
            if (this.locationsOfDiscs[i] !== 0) {
                if (this.locationsOfDiscs[i][0].color === color) {
                    for (let j = 0; j < this.locationsOfDiscs.length; j++) {

                        let validObj = this.checkValidMove({ x: i, y: 0 }, j, this.diceThrowScroe)
                        if (!(validObj.valid)) {
                            return true;
                        }

                    }

                }
            }

        }
        return false;
    }
    checkValidMove(from, to, dices) {
        let absoluteDelta = Math.abs(to - from.x);
        if (absoluteDelta === 0) return new ErrorObj(true, "you need to move the disc from is row");
        let diceNumberMatchToMoveLength = false;
        for (let dice of dices) {
            if (absoluteDelta === dice) {
                diceNumberMatchToDelta = true;
            }
        }
        if (diceNumberMatchToMoveLength) {
            let disc = this.locationsOfDiscs[from.x][from.y];
            let toRow = this.locationsOfDiscs[to];
            let delta = to - from.x;
            if (disc.color === "R" && delta < 0) {
                return new ErrorObj(true, "you need to move to the opposite direction");
            }
            if (disc.color === "W" && delta > 0) {
                return new ErrorObj(true, "you need to move to the opposite direction");
            }
            if (toRow.length == 0) {
                return new ErrorObj(false, "");
            }
            if (toRow.length > 0 && toRow[0].color === disc.color) {
                return new ErrorObj(false, "");
            }
            if (toRow.length == 1 && toRow[0].color !== disc.color) {
                return new ErrorObj(false, "");
            }
        }
        return new ErrorObj(true, "you need to move your disc by the size of your dice number");
    }
    makeMove(from, to, dices) {
        if (this.checkBearingoff()) {
            if (this.validBearingOff(from, dices)) {
                this.locationsOfDiscs[from.x] = this.locationsOfDiscs[from.x].slice(1);
                this.removeDiceScroe(from, to);
                this.render();
            }
        }
        else {
            let validObj = this.checkValidMove(from, to, dices);
            if (!validObj.error) {
                let disc = this.locationsOfDiscs[from.x][from.y];

                if (this.locationsOfDiscs[to].length !== 1) {
                    this.locationsOfDiscs[to].push(disc);
                    this.locationsOfDiscs[from.x] = this.locationsOfDiscs[from.x].slice(1);
                }
                else if (this.locationsOfDiscs[to].length === 1) {
                    this.eatenSoliders.push(this.locationsOfDiscs[to][0]);
                    this.locationsOfDiscs[to] = [];
                    this.locationsOfDiscs[to].push(disc);
                    this.locationsOfDiscs[from.x] = this.locationsOfDiscs[from.x].slice(1);
                }
                this.removeDiceScroe(from, to);
                this.render();
            }
            else {
                alert(validObj.message);
            }

        }


    }
    findEatenDisc(id){
        for(let i =0;i < this.eatenSoliders.length;i++){
            if(this.eatenSoliders[i].id == id){
                return i;
            }
        }
        throw new Error("there is a problem in your check function of eaten solidr");
    }
    checkIfThereIsEatenSolidersOfMyColor() {
        let color = "W";
        if (!this.whiteTurn) {
            color = "R";
        }
        for (let index = 0; i < this.eatenSoliders; index++) {
            if (this.eatenSoliders[index].color === color) {
                return true;
            }
        }
        return false;

    }
    checkValidBringBackEatenSolider(discIndex, to, dices) {
        if (to > 5 || to < 18) return new ErrorObj(true, "you cant put your solider there");
        let from = 0;
        if (this.eatenSoliders[discIndex].color = "W") {
            from = 23;
        }
        let absoluteDelta = Math.abs(to - from);
        let diceNumberMatchToMoveLength = false;
        for (let dice of dices) {
            if (absoluteDelta === dice) {
                diceNumberMatchToDelta = true;
            }
        }
        if (diceNumberMatchToMoveLength) {
            let toRow = this.locationsOfDiscs[to];
            let delta = to - from;
            if (this.eatenSoliders[discIndex].color === "R" && delta > 0) {
                return new ErrorObj(true, "you need to move to the opposite direction");
            }
            if (this.eatenSoliders[discIndex].color === "W" && delta < 0) {
                return new ErrorObj(true, "you need to move to the opposite direction");
            }
            if (toRow.length == 0) {
                return new ErrorObj(false, "");
            }
            if (toRow.length > 0 && toRow[0].color === this.eatenSoliders[discIndex].color) {
                return new ErrorObj(false, "");
            }
            if (toRow.length == 1 && toRow[0].color !== this.eatenSoliders[discIndex].color) {
                return new ErrorObj(false, "");
            }
        }
        return new ErrorObj(true, "you need to move your disc by the size of your dice number");
    }
    bringBackEatenSolider(discIndex, to, dices) {
        let validObj = checkValidBringBackEatenSolider(discIndex, to, dices);
        if (!validObj.error) {
            let disc = this.eatenSoliders[discIndex];
            this.locationsOfDiscs[to].push(disc);
            this.eatenSoliders = this.eatenSoliders.slice(0, discIndex).concat(discIndex);
            this.render();
        }
        else {
            alert(validObj.message);
        }
    }
    checkBearingoff() {
        let sum = 0;
        if (this.whiteTurn) {
            for (let i = 23; i >= 18; i--) {
                sum += this.locationsOfDiscs[i].length
            }
        }
        else {
            for (let i = 0; i <= 5; i++) {
                sum += this.locationsOfDiscs[i].length
            }
        }
        if (sum == 15) return true;
        else return false;


    }
    validBearingOff(from, dices) {
        let diceNumberMatchToMoveLength = false;
        color = "W";
        if (!this.whiteTurn) color = "R";
        for (let dice of dices) {
            if (color == "W" && from.x - dice < 0) {
                return true;
            }
            if (color == "R" && from.x + dice > 23) {
                return true;
            }
        }
        return false;
    }
    checkIfThereIsWinner() {
        let isThereAnyWhiteSolider = false;
        let isThereAnyRedSolider = false;
        for (let i = 0; i < this.locationsOfDiscs; i++) {
            if (this.locationsOfDiscs[i].length !== 0) {
                for (let j = 0; j < this.locationsOfDiscs[i].length; j++) {
                    let disc = this.locationsOfDiscs[i][j];
                    if (disc.color === "W") {
                        isThereAnyWhiteSolider = true;
                    }
                    if (disc.color === "R") {
                        isThereAnyRedSolider = true;
                    }
                }
            }
        }
        return { isThereAnyWhiteSolider, isThereAnyRedSolider };


    }
    playWhenDrop(ev){
        ev.preventDefault();
        console.log("onDrop");
        let to = event.target.id;
       /* let obj = this.checkIfThereIsWinner();
        let {isThereAnyRedSolider,isThereAnyWhiteSolider}= obj;
        if(!isThereAnyRedSolider){
            alert("the winner is Red");
            return;
        }
        if(!isThereAnyWhiteSolider){
            alert("the winner is White");
            return;
        }*/
        
        console.log(to);
        if(!this.diceThrowScroe || this.diceThrowScroe.length == 0){
            alert("please throw the dice to start");
        }
        else{
            this.doubleDiceDom.makeButtonDisabled();
            if(!this.checkIfAnySoliderOfMineCanMoveBaseOnMyDiceNumber()){
                this.diceThrowScroe = null;
                this.doubleDiceDom.makeButtonDisabled();
                this.changeTurn();
                return;
            }
            if(this.checkIfThereIsEatenSolidersOfMyColor()){
                let index = this.findEatenDisc(id);
                this.bringBackEatenSolider(index,to,this.diceThrowScroe);
                return;
            }
            let from = this.findDiscLocation(id);
            this.makeMove(from,to,this.diceThrowScroe);
        }
        return;



    }
}
let t = new Backgammon();
document.body.appendChild(t.domComponent);