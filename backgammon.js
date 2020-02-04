class Backgammon {
    constructor() {
        this.doubleDiceDom = new doubleDice();
        this.createMapOfDiscsOnBoard();
        this.eatenSoliders = [];
        this.whiteTurn = true;
        this.createComponent();
        this.setDragId =this.setDragId.bind(this);
        this.getDiceScore();
    }
    getDiceScore(){
        let diceNumbser = this.doubleDiceDom.getDice();
        if(diceNumbser[0]){
            if (diceNumbser[0] === diceNumbser[1]) {
                if(!this.diceThrowScroe)this.diceThrowScroe = [diceNumbser[0], diceNumbser[0], diceNumbser[0], diceNumbser[0]];
            }
            else {
                if(!this.diceThrowScroe)this.diceThrowScroe = [diceNumbser[0], diceNumbser[1]];
            }
        }
    }
    removeDiceScroe(from, to) {
        let dice = Math.abs(to - from.x);
        let index = this.diceThrowScroe.indexOf(dice);
        this.diceThrowScroe = this.diceThrowScroe.slice(0,index).concat(this.diceThrowScroe.slice(index+1));
        
    }
    render() {
        for (let i = 0; i < this.tdArray.length; i++) {
            while(this.tdArray[i].hasChildNodes()){
                this.tdArray[i].removeChild(this.tdArray[i].firstChild);
            }
        }
        for (let i = 0; i < this.locationsOfDiscs.length; i++) {
            for (let j = 0; j < this.locationsOfDiscs[i].length; j++) {
                this.tdArray[i].appendChild(this.locationsOfDiscs[i][j].domComponent)
            }
        }
        if(this.eatenSoliders.length > 0){
           
            while(this.eatTdDom.hasChildNodes()){
                this.eatTdDom.removeChild(this.eatTdDom.firstChild)
            }
            
            for (let i = 0; i<this.eatenSoliders.length; i++) {
                this.eatTdDom.appendChild(this.eatenSoliders[i].domComponent);

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
        let eatenTable = createTable1D(1,"eatenTable");
        this.eatTdDom = Array.from(eatenTable.getElementsByTagName("td"));
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
            this.tdArray[i].id = i;
            if (this.locationsOfDiscs[i].length !== 0) {
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
        for (let i = 0; i < this.locationsOfDiscs.length; i++) {
            if (this.locationsOfDiscs[i].length !== 0) {
                for (let j = 0; j < this.locationsOfDiscs[i].length; j++) {
                    if (this.locationsOfDiscs[i][j].id == id) {
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
            if (this.locationsOfDiscs[i].length !== 0) {
                if ((this.locationsOfDiscs[i][0]).color === color) {
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
        if(this.whiteTurn){
            if(this.locationsOfDiscs[from.x][from.y].color == "R"){
               
                return new ErrorObj(true,"you take disc with wrong color");
            }
        }
        else{
            if(this.locationsOfDiscs[from.x][from.y].color == "W") return new ErrorObj(true,"you take disc with wrong color");
        }
        let absoluteDelta = Math.abs(to - from.x);
        if (absoluteDelta === 0) return new ErrorObj(true, "you need to move the disc from is row");
        let diceNumberMatchToDelta = false;
        for (let dice of dices) {
            if (absoluteDelta === dice) {
                diceNumberMatchToDelta = true;
            }
        }
        if (diceNumberMatchToDelta) {
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
                    this.locationsOfDiscs[from.x] = this.locationsOfDiscs[from.x].slice(0,from.y).concat(this.locationsOfDiscs[from.x].slice(from.y+1));
                }
                else if (this.locationsOfDiscs[to].length === 1) {
                    this.eatenSoliders.push(this.locationsOfDiscs[to][0]);
                    this.locationsOfDiscs[to] = [];
                    this.locationsOfDiscs[to].push(disc);
                    this.locationsOfDiscs[from.x] = this.locationsOfDiscs[from.x].slice(0,from.y).concat(this.locationsOfDiscs[from.x].slice(from.y+1));
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
        for (let index = 0; index < this.eatenSoliders; index++) {
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
            this.eatenSoliders = this.eatenSoliders.slice(0, discIndex).concat(discIndex+1);
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
        for (let i = 0; i < this.locationsOfDiscs.length; i++) {
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
    setDragId(ev){
        this.dragId = ev.target.id;
    }
    playWhenDropDone(ev){
        ev.preventDefault();
        let to = ev.target.id;
        let {isThereAnyRedSolider,isThereAnyWhiteSolider} = this.checkIfThereIsWinner();
        if(!isThereAnyRedSolider){
            alert("the winner is Red");
            return;
        }
        if(!isThereAnyWhiteSolider){
            alert("the winner is White");
            return;
        }
        this.getDiceScore();
        if(!this.diceThrowScroe || this.diceThrowScroe.length == 0){
            alert("please throw the dice to start");
        }
        else{
            if(!this.checkIfAnySoliderOfMineCanMoveBaseOnMyDiceNumber()){
                console.log("cant do anything");
                this.diceThrowScroe = null;
                this.doubleDiceDom.resetDice();
                this.doubleDiceDom.makeButtonDisabled();
                this.changeTurn();
                return;
            }
            if(this.checkIfThereIsEatenSolidersOfMyColor()){
                console.log("eatensolider found");
                let index = this.findEatenDisc(id);
                this.bringBackEatenSolider(index,to,this.diceThrowScroe);
                return;
            }
            let from = this.findDiscLocation(this.dragId);
            this.makeMove(from,to,this.diceThrowScroe);
            console.log(this.diceThrowScroe);
            if(this.diceThrowScroe.length == 0){
                this.diceThrowScroe = null;
                this.doubleDiceDom.resetDice();
                this.doubleDiceDom.makeButtonDisabled();
                this.changeTurn();
            }
        }
        return;

    }
}
let t = new Backgammon();
let alldiscs = t.domComponent.querySelectorAll(".Disc");
let allcells = t.domComponent.querySelectorAll("td");

for(let i = 0;i<alldiscs.length;i++){
    alldiscs[i].addEventListener("drag",t.setDragId.bind(t));
}
for(let i = 0;i<allcells.length;i++){
    allcells[i].addEventListener("drop",t.playWhenDropDone.bind(t));
    allcells[i].addEventListener("dragover",(ev)=>{ev.preventDefault();})
}
document.body.appendChild(t.domComponent);