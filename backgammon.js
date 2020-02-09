class Backgammon {
    constructor() {
        this.doubleDiceDom = new doubleDice();
        this.createMapOfDiscsOnBoard();
        this.eatenSoliders = [];
        this.whiteTurn = true;
        this.createComponent();
        this.setDragId = this.setDragId.bind(this);
        this.getDiceScore();
    }
    getDiceScore() {
        let diceNumbser = this.doubleDiceDom.getDice();
        if (diceNumbser[0]) {
            if (diceNumbser[0] === diceNumbser[1]) {
                if (!this.diceThrowScroe) this.diceThrowScroe = [diceNumbser[0], diceNumbser[0], diceNumbser[0], diceNumbser[0]];
            }
            else {
                if (!this.diceThrowScroe) this.diceThrowScroe = [diceNumbser[0], diceNumbser[1]];
            }
        }
    }
    removeDiceScroe(from, to) {
        let dice = Math.abs(to - from);
        let index = this.diceThrowScroe.indexOf(dice);
        this.diceThrowScroe = this.diceThrowScroe.slice(0, index).concat(this.diceThrowScroe.slice(index + 1));

    }
    render() {
        for (let i = 0; i < this.tdArray.length; i++) {
            while (this.tdArray[i].hasChildNodes()) {
                this.tdArray[i].removeChild(this.tdArray[i].firstChild);
            }
        }
        for (let i = 0; i < this.locationsOfDiscs.length; i++) {
            for (let j = 0; j < this.locationsOfDiscs[i].length; j++) {
                this.tdArray[i].appendChild(this.locationsOfDiscs[i][j].domComponent)
            }
        }
        if (this.eatenSoliders.length > 0) {

            while (this.eatTdDom[0].hasChildNodes()) {
                this.eatTdDom[0].removeChild(this.eatTdDom[0].firstChild)
            }
            console.log(this.eatenSoliders);
            for (let i = 0; i < this.eatenSoliders.length; i++) {
                this.eatTdDom[0].appendChild(this.eatenSoliders[i].domComponent);

            }
        }
    }
    changeTurn() {
        this.whiteTurn = !this.whiteTurn;
        this.renderChangeTurn();
    }
    renderChangeTurn() {
        const imges = ["../resources/Disc.img/redDisc.png", "../resources/Disc.img/whiteDisc.png"]
        this.whosTurnNowImgNode.setAttribute("src", this.whiteTurn ? imges[1] : imges[0]);
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
        this.whosTurnNowImgNode = createDom("img", { className: "turnViewImg", src: "../resources/Disc.img/whiteDisc.png" });
        this.whosTurnNowComponent = createDom("div", { className: "turnViewComponent" }, "Current turn:", this.whosTurnNowImgNode);
        let eatenTable = createTable1D(1, "eatenTable");
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
        this.boardImgDom = createDom("img", { className: "boardImg", src: "../resources/Borad_img/board.png" });
        this.domComponent = createDom("div", { className: "backgammon" }, this.doubleDiceDom.domComponent, this.whosTurnNowComponent, this.boardImgDom, eatenTable, table1, table2, table3, table4);

    }
    createMapOfDiscsOnBoard() {
        this.locationsOfDiscs = [];
        for (let i = 0; i < 24; i++) {
            this.locationsOfDiscs.push([]);
        }
        this.locationsOfDiscs[5] = ["W", "W", "W", "W", "W"];
        this.locationsOfDiscs[18] = ["R", "R", "R", "R", "R"];
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
    checkIfIcanBringDiscBaseOnDiceResult(dices) {
        let locationBaseOnDice;
        if (dices.length === 2) {
            locationBaseOnDice = dices.slice(0);
        }
        else {
            locationBaseOnDice = [dices[0]];
        }
        let isThereValidRow = false;
        let from;
        let myColor;
        let oppositeColor;
        if (this.whiteTurn) {
            from = 0;
            locationBaseOnDice.map((dice) => from + (dice - 1))
            myColor = "W"
            oppositeColor = "R"
        }
        else {
            from = 23;
            locationBaseOnDice.map((dice) => from - (dice - 1))
            myColor = "R"
            oppositeColor = "W"
        }
        for (let i = 0; i < locationBaseOnDice.length; i++) {
            let location = locationBaseOnDice[i];
            if (this.locationsOfDiscs[location].length == 0) {
                isThereValidRow = true;
            }
            if (this.locationsOfDiscs[location].length > 0 && this.locationsOfDiscs[location][0].color == myColor) {
                isThereValidRow = true;
            }
            if (this.locationsOfDiscs[location].length == 1 && this.locationsOfDiscs[location][0].color == oppositeColor) {
                isThereValidRow = true;
            }
        }
        return isThereValidRow;
    }
    checkValidMove(from, to, dices) {
        if (this.whiteTurn) {
            if (this.locationsOfDiscs[from.x][from.y].color == "R") {
                return new ErrorObj(true, "you take disc with wrong color");
            }
        }
        else {
            if (this.locationsOfDiscs[from.x][from.y].color == "W") return new ErrorObj(true, "you take disc with wrong color");
        }
        let message = "you need to move your disc by the size of your dice number";
        let absoluteDelta = Math.abs(to - from.x);
        if (absoluteDelta === 0) return new ErrorObj(true, "you need to move the disc from is row");
        let diceNumberMatchToDelta = false;
        for (let dice of dices) {
            if (absoluteDelta === dice) {
                diceNumberMatchToDelta = true;
                break;
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
            message = "please check again where you moved your disc"
        }
        return new ErrorObj(true, message);
    }
    makeMove(from, to, dices) {
        let validObj = this.checkValidMove(from, to, dices);
        if (!validObj.error) {
            let disc = this.locationsOfDiscs[from.x][from.y];
            if (this.locationsOfDiscs[to].length === 0) {
                this.locationsOfDiscs[to].push(disc);
                this.locationsOfDiscs[from.x] = this.locationsOfDiscs[from.x].slice(0, from.y).concat(this.locationsOfDiscs[from.x].slice(from.y + 1));
            }
            else if (this.locationsOfDiscs[to].length >= 1 && this.locationsOfDiscs[to][0].color === disc.color) {
                this.locationsOfDiscs[to].push(disc);
                this.locationsOfDiscs[from.x] = this.locationsOfDiscs[from.x].slice(0, from.y).concat(this.locationsOfDiscs[from.x].slice(from.y + 1));
            }
            else if (this.locationsOfDiscs[to].length === 1 && this.locationsOfDiscs[to][0].color !== disc.color) {
                this.eatenSoliders.push(this.locationsOfDiscs[to][0]);
                this.locationsOfDiscs[to] = [];
                this.locationsOfDiscs[to].push(disc);
                this.locationsOfDiscs[from.x] = this.locationsOfDiscs[from.x].slice(0, from.y).concat(this.locationsOfDiscs[from.x].slice(from.y + 1));
            }
            this.removeDiceScroe(from.x, to);
            this.render();
        }
        else {
            alert(validObj.message);
        }
    }
    findEatenDisc(id) {
        for (let i = 0; i < this.eatenSoliders.length; i++) {
            if (this.eatenSoliders[i].id == id) {
                return i;
            }
        }
    }
    checkIfThereIsEatenSolidersOfMyColor() {
        let color = "W";
        if (!this.whiteTurn) {
            color = "R";
        }
        for (let index = 0; index < this.eatenSoliders.length; index++) {
            if (this.eatenSoliders[index].color === color) {
                return true;
            }
        }
        return false;

    }
    checkValidBringBackEatenSolider(discIndex, to, dices) {
        let from;
        let toAdaptor = Number(to);
        if (this.whiteTurn) {
            if (to < 18) return new ErrorObj(true, "you cant put your disc there");
            from = 23;
            toAdaptor--;
        }
        else {
            if (to > 5) return new ErrorObj(true, "you cant put your disc there");
            from = 0;
            toAdaptor++;
        }
        let message = "you need to move your disc by the size of your dice number";
        let absoluteDelta = Math.abs(toAdaptor - from);
        let diceNumberMatchToDelta = false;
        for (let dice of dices) {
            if (absoluteDelta === dice) {
                diceNumberMatchToDelta = true;
                break;
            }
        }
        if (diceNumberMatchToDelta) {
            let toRow = this.locationsOfDiscs[to];
            if (toRow.length == 0) {
                return new ErrorObj(false, "");
            }
            if (toRow.length > 0 && toRow[0].color === this.eatenSoliders[discIndex].color) {
                return new ErrorObj(false, "");
            }
            if (toRow.length == 1 && toRow[0].color !== this.eatenSoliders[discIndex].color) {
                return new ErrorObj(false, "");
            }
            message = "check again the place that you want to enter the disc";
        }
        return new ErrorObj(true, message);
    }
    bringBackEatenSolider(discIndex, to, dices) {
        let validObj = this.checkValidBringBackEatenSolider(discIndex, to, dices);
        if (!validObj.error) {
            let disc = this.eatenSoliders[discIndex];
            if (this.locationsOfDiscs[to].length === 0) {
                this.locationsOfDiscs[to].push(disc);
                this.eatenSoliders = this.eatenSoliders.slice(0, discIndex).concat(this.eatenSoliders.slice(discIndex + 1));
            }
            else if (this.locationsOfDiscs[to].length >= 1 && this.locationsOfDiscs[to][0].color === disc.color) {
                this.locationsOfDiscs[to].push(disc);
                this.eatenSoliders = this.eatenSoliders.slice(0, discIndex).concat(this.eatenSoliders.slice(discIndex + 1));
            }
            else if (this.locationsOfDiscs[to].length === 1 && this.locationsOfDiscs[to][0].color !== disc.color) {
                let eatenDisc = this.locationsOfDiscs[to][0];
                this.locationsOfDiscs[to] = [];
                this.locationsOfDiscs[to].push(disc);
                this.eatenSoliders = this.eatenSoliders.slice(0, discIndex).concat(this.eatenSoliders.slice(discIndex + 1));
                this.eatenSoliders.push(eatenDisc);
            }
            let from;
            let toAdaptor = Number(to);
            if (this.whiteTurn) {
                from = 23;
                toAdaptor--;
            }
            else {
                from = 0;
                toAdaptor++;
            }
            this.removeDiceScroe(from, toAdaptor);
            this.render();

        }
        else {
            alert(validObj.message);
        }
    }
    checkBearingoff() {
        let isThereDiscInMyColor = false;
        let from;
        let to;
        let myColor;
        if (this.whiteTurn) {
            from = 6;
            to = 23;
            myColor = "W";
        }
        else {
            from = 0;
            to = 17;
            myColor = "R";
        }
        for (; from <= to; from++) {
            if (this.locationsOfDiscs[from].length !== 0) {
                if (this.locationsOfDiscs[from][0].color === myColor) {
                    isThereDiscInMyColor = true;
                    break;
                }
            }
        }
        return isThereDiscInMyColor ? false : true;
    }
    validBearingOff(from, dices) {
        let diceMatchResults = [];
        let thereIsAMatch = false;
        let thereIsRegularMove = false;
        for (let dice of dices) {
            if (this.whiteTurn) {
                if (from.x - dice < 0) {
                    diceMatchResults.push(dice);
                    thereIsAMatch = true;
                }
                else {
                    thereIsRegularMove = true;
                }
            }
            else {
                if (from.x + dice > 23) {
                    diceMatchResults.push(dice);
                    thereIsAMatch = true;
                }
                else{
                    thereIsRegularMove = true;
                }

            }
        }
        if (thereIsRegularMove) return false;
        if (thereIsAMatch) {
            console.log(diceMatchResults);
            let minResult = Math.min(...diceMatchResults);
            let index = dices.indexOf(minResult);
            this.diceThrowScroe = this.diceThrowScroe.slice(0, index).concat(this.diceThrowScroe.slice(index + 1));
        }
        return thereIsAMatch;
    }
    bearingOff(ev) {
        ev.preventDefault();
        if (this.checkIfDropOutSideOfBoardImg(ev)) {
            if (this.checkBearingoff()) {
                this.getDiceScore();
                if (!this.diceThrowScroe || this.diceThrowScroe.length == 0) {
                    alert("please throw the dice to start");
                }
                else {
                    const from = this.findDiscLocation(this.dragId);
                    if (this.validBearingOff(from, this.diceThrowScroe)) {
                        console.log("enter");
                        this.locationsOfDiscs[from.x] = this.locationsOfDiscs[from.x].slice(1);
                        this.render();
                        if (this.diceThrowScroe.length == 0) {
                            this.turnDone();
                        }
                        if (this.checkIfThereIsWinner()) return;
                        return;
                    }
                }
            }
        }
    }
    checkIfDropOutSideOfBoardImg(e) {
        let x = e.x;
        let y = e.y;
        let imgX = this.boardImgDom.x, imgY = this.boardImgDom.y,
            imgSizeLeft = this.boardImgDom.offsetWidth + imgX, imgSizeDown = this.boardImgDom.offsetHeight + imgY;
        if ((imgX <= x && x <= imgSizeLeft) && (imgY <= y && y <= imgSizeDown)) {
            return false
        }
        else {
            return true;
        }
    }
    checkIfThereIsWinner() {
        let isThereAnyWhiteSolider = false;
        let isThereAnyRedSolider = false;
        let winner = false;
        for (let i = 0; i < this.locationsOfDiscs.length; i++) {
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
        if (!isThereAnyRedSolider) {
            alert("the winner is Red");
            winner = true;
        }
        if (!isThereAnyWhiteSolider) {
            alert("the winner is White");
            winner = true;
        }
        return winner;
    }
    setDragId(ev) {
        this.dragId = ev.target.id;
    }
    turnDone() {
        this.diceThrowScroe = null;
        this.doubleDiceDom.resetDice();
        this.doubleDiceDom.makeButtonDisabled();
        this.changeTurn();

    }
    playWhenDropDone(ev) {
        ev.preventDefault();
        let to = ev.target.id;
        if (this.checkIfThereIsWinner()) return;
        this.getDiceScore();
        if (!this.diceThrowScroe || this.diceThrowScroe.length == 0) {
            alert("please throw the dice to start");
        }
        else {
            if (this.checkIfThereIsEatenSolidersOfMyColor()) {
                if (!this.checkIfIcanBringDiscBaseOnDiceResult(this.diceThrowScroe)) {
                    alert("you cant bring back your disc")
                    this.turnDone();
                    return;
                }
                const index = this.findEatenDisc(this.dragId);
                if (index === undefined) {
                    alert("you need to bring back your eaten solider before you do move");
                    return;
                }
                this.bringBackEatenSolider(index, to, this.diceThrowScroe);
                if (this.diceThrowScroe.length == 0) {
                    this.turnDone();
                }
                return;
            }
            if (!this.checkIfAnySoliderOfMineCanMoveBaseOnMyDiceNumber()) {
                alert("sorry yo cant move at all switching turn")
                this.turnDone();
                return;
            }
            const from = this.findDiscLocation(this.dragId);
            if (from === undefined) {
                alert("you didnt take the right disc");
                return;
            }
            this.makeMove(from, to, this.diceThrowScroe);
            if (this.diceThrowScroe.length == 0) {
                this.turnDone();
            }
        }
        return;
    }
}
let t = new Backgammon();
let alldiscs = t.domComponent.querySelectorAll(".Disc");
let allcells = t.domComponent.querySelectorAll("td");

for (let i = 0; i < alldiscs.length; i++) {
    alldiscs[i].addEventListener("drag", t.setDragId.bind(t));
}
for (let i = 0; i < allcells.length; i++) {
    allcells[i].addEventListener("drop", t.playWhenDropDone.bind(t));
    allcells[i].addEventListener("dragover", (ev) => { ev.preventDefault(); })
}
document.body.addEventListener("drop", t.bearingOff.bind(t));
document.body.addEventListener("dragover", (ev) => { ev.preventDefault(); });
document.body.appendChild(t.domComponent);