
class Backgammon {
    constructor() {
        this.DiceDom = new doubleDice();
        this.createDiscLocationsArray();
        this.eatenSoliders = [];
        this.whiteTurn = true;
        this.createComponent();
        this.getMovesCount();
        this.playedDiscsIdArray = [];
        this.redDiscAmount = 15;
        this.whiteDiscAmount = 15;
        this.setGameFunctionality();
        
    }
    getMovesCount() {
        let dice = this.DiceDom.getDice();
        if (dice[0]) {
            if (dice[0] === dice[1]) {
                if (!this.diceResult) this.diceResult = [dice[0], dice[0], dice[0], dice[0]];
            }
            else {
                if (!this.diceResult) this.diceResult = [dice[0], dice[1]];
            }
        }
    }
    removeDiceResult(from, to) {
        let dice = Math.abs(to - from);
        let index = this.diceResult.indexOf(dice);
        this.diceResult = this.diceResult.slice(0, index).concat(this.diceResult.slice(index + 1));

    }
    render() {
        for (let i = 0; i < this.tdArray.length; i++) {
            while (this.tdArray[i].hasChildNodes()) {
                this.tdArray[i].removeChild(this.tdArray[i].firstChild);
            }
        }
        for (let i = 0; i < this.locationsOfDiscs.length; i++) {
            for (let j = 0; j < this.locationsOfDiscs[i].length; j++) {
                if(j == 6)break;
                this.tdArray[i].appendChild(this.locationsOfDiscs[i][j].domComponent);
            }
        }
        if (this.eatenSoliders.length > 0) {

            while (this.eatTdDom[0].hasChildNodes()) {
                this.eatTdDom[0].removeChild(this.eatTdDom[0].firstChild)
            }
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
        this.headLineNode = createDom("h1",{className:"headline"},"Backgammon!!");
        this.domComponent = createDom("div", { className: "backgammon" }, this.DiceDom.domComponent, this.whosTurnNowComponent,this.headLineNode ,this.boardImgDom,eatenTable, table1, table2, table3, table4);
    }
    createDiscLocationsArray() {
        this.locationsOfDiscs = [];
        for (let i = 0; i < 24; i++) {
            this.locationsOfDiscs.push([]);
        }
        this.locationsOfDiscs[0] = ["R", "R"];
        this.locationsOfDiscs[5] = ["W", "W", "W", "W", "W"];
        this.locationsOfDiscs[7] = ["W", "W", "W"];
        this.locationsOfDiscs[11] = ["R", "R", "R", "R", "R"];
        this.locationsOfDiscs[12] = ["W", "W", "W", "W", "W"];
        this.locationsOfDiscs[16] = ["R", "R", "R"]
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
                        let validObj = this.checkValidMove({ x: i, y: 0 }, j, this.diceResult)
                        if (!(validObj.valid)) {
                            return true;
                        }

                    }

                }
            }

        }
        return false;
    }
    checkIfIcanBringDiscBaseOnDiceResult(dice) {
        if (dice.length !== 2) {
            dice = [dice[0]];
        }
        let locationBaseOnDice;
        let isThereValidRow = false;
        let from;
        let myColor;
        let oppositeColor;
        if (this.whiteTurn) {
            from = 23;
            locationBaseOnDice = dice.map(dice => from - (dice-1))
            myColor = "W"
            oppositeColor = "R"
        }
        else {
            from = 0;
            locationBaseOnDice = dice.map(dice => from + (dice -1))
            myColor = "R"
            oppositeColor = "W"
        }
        for (let i = 0; i < locationBaseOnDice.length; i++) {
            let location = locationBaseOnDice[i];
            if (this.locationsOfDiscs[location].length == 0) {
                isThereValidRow = true;
                break;
            }
            if (this.locationsOfDiscs[location].length > 0 && this.locationsOfDiscs[location][0].color == myColor) {
                isThereValidRow = true;
                break;
            }
            if (this.locationsOfDiscs[location].length == 1 && this.locationsOfDiscs[location][0].color == oppositeColor) {
                isThereValidRow = true;
                break;
            }
        }
        return isThereValidRow;
    }
    checkValidMove(from, to, dices) {
        if (this.whiteTurn) {
            if (this.locationsOfDiscs[from.x][from.y].color == "R") {
                return new ValidtionObj(true, errorMessage.invalidColor);
            }
        }
        else {
            if (this.locationsOfDiscs[from.x][from.y].color == "W") return new ValidtionObj(true, errorMessage.invalidColor);
        }
        let absoluteDelta = Math.abs(to - from.x);
        if (absoluteDelta === 0) return new ValidtionObj(true, errorMessage.invalidMove);
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
                return new ValidtionObj(true, errorMessage.invalidDirection);
            }
            if (disc.color === "W" && delta > 0) {
                return new ValidtionObj(true, errorMessage.invalidDirection);
            }
            if (toRow.length == 0) {
                return new ValidtionObj(false, message.empty);
            }
            if (toRow.length >= 1 && toRow[0].color === disc.color) {
                return new ValidtionObj(false, message.join);
            }
            if (toRow.length === 1 && toRow[0].color !== disc.color) {
                return new ValidtionObj(false, message.eat);
            }
        }
        return new ValidtionObj(true, errorMessage.invalidMove);
    }
    makeMove(from, to, dices) {
        let validObj = this.checkValidMove(from, to, dices);
        if (!validObj.error) {
            let disc = this.locationsOfDiscs[from.x][from.y];
            this.playedDiscsIdArray.push(disc.id);
            switch (validObj.message) {
                case message.empty:
                    this.locationsOfDiscs[to].push(disc);
                    this.locationsOfDiscs[from.x] = this.locationsOfDiscs[from.x].slice(0, from.y).concat(this.locationsOfDiscs[from.x].slice(from.y + 1));
                    break;
                case message.join:
                    this.locationsOfDiscs[to].push(disc);
                    this.locationsOfDiscs[from.x] = this.locationsOfDiscs[from.x].slice(0, from.y).concat(this.locationsOfDiscs[from.x].slice(from.y + 1));
                    break;
                case message.eat:
                    this.eatenSoliders.push(this.locationsOfDiscs[to][0]);
                    this.locationsOfDiscs[to] = [];
                    this.locationsOfDiscs[to].push(disc);
                    this.locationsOfDiscs[from.x] = this.locationsOfDiscs[from.x].slice(0, from.y).concat(this.locationsOfDiscs[from.x].slice(from.y + 1));
                    break;
            }
            this.removeDiceResult(from.x, to);
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
        let color = this.whiteTurn ? "W" : "R";
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
            if (to < 18) return new ValidtionObj(true, errorMessage.invalidPlace);
            from = 23;
            toAdaptor--;
        }
        else {
            if (to > 5) return new ValidtionObj(true, errorMessage.invalidPlace);
            from = 0;
            toAdaptor++;
        }
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
                return new ValidtionObj(false, message.empty);
            }
            if (toRow.length >= 1 && toRow[0].color === this.eatenSoliders[discIndex].color) {
                return new ValidtionObj(false, message.join);
            }
            if (toRow.length == 1 && toRow[0].color !== this.eatenSoliders[discIndex].color) {
                return new ValidtionObj(false, message.eat);
            }
        }
        return new ValidtionObj(true, errorMessage.invalidMove);
    }
    bringBackEatenSolider(discIndex, to, dices) {
        let validObj = this.checkValidBringBackEatenSolider(discIndex, to, dices);
        if (!validObj.error) {
            let disc = this.eatenSoliders[discIndex];
            switch (validObj.message) {
                case message.empty:
                    this.locationsOfDiscs[to].push(disc);
                    this.eatenSoliders = this.eatenSoliders.slice(0, discIndex).concat(this.eatenSoliders.slice(discIndex + 1));
                    break;
                case message.join:
                    this.locationsOfDiscs[to].push(disc);
                    this.eatenSoliders = this.eatenSoliders.slice(0, discIndex).concat(this.eatenSoliders.slice(discIndex + 1));
                    break;
                case message.eat:
                    let eatenDisc = this.locationsOfDiscs[to][0];
                    this.locationsOfDiscs[to] = [];
                    this.locationsOfDiscs[to].push(disc);
                    this.eatenSoliders = this.eatenSoliders.slice(0, discIndex).concat(this.eatenSoliders.slice(discIndex + 1));
                    this.eatenSoliders.push(eatenDisc);
                    break;
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
            this.removeDiceResult(from, toAdaptor);
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
    validBearingOff(from, dice) {
        let diceMatchResults = [];
        let thereIsAMatch = false;
        let discAlreadyPlayed = this.playedDiscsIdArray.some((id) => id === this.locationsOfDiscs[from.x][from.y].id);
        let discStillInGame = this.whiteTurn ? this.whiteDiscAmount : this.redDiscAmount;
        if (discAlreadyPlayed && discStillInGame > 1) {
            alert("you cant bearingOff in two moves");
            return false
        }
        for (let die of dice) {
            if (this.whiteTurn) {
                if (from.x - die < 0) {
                    diceMatchResults.push(die);
                    thereIsAMatch = true;
                }
            }
            else if (from.x + die > 23) {
                diceMatchResults.push(die);
                thereIsAMatch = true;
            }
        }
        if (thereIsAMatch) {
            console.log(diceMatchResults);
            let minResult = Math.min(...diceMatchResults);
            let index = dice.indexOf(minResult);
            this.diceResult = this.diceResult.slice(0, index).concat(this.diceResult.slice(index + 1));
        }
        return thereIsAMatch;
    }
    bearingOff(ev) {
        ev.preventDefault();
        if (this.checkIfDropOutSideOfBoardImg(ev)) {
            if (this.checkBearingoff() && !this.checkIfThereIsEatenSolidersOfMyColor()) {
                this.getMovesCount();
                if (!this.diceResult || this.diceResult.length == 0) {
                    alert("please throw the dice to start");
                }
                else {
                    const from = this.findDiscLocation(this.dragId);
                    if (this.validBearingOff(from, this.diceResult)) {
                        console.log("enter");
                        this.locationsOfDiscs[from.x] = this.locationsOfDiscs[from.x].slice(1);
                        this.render();
                        if (this.diceResult.length == 0) {
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
        this.redDiscAmount = 0;
        this.whiteDiscAmount = 0;
        for (let i = 0; i < this.locationsOfDiscs.length; i++) {
            for (let j = 0; j < this.locationsOfDiscs[i].length; j++) {
                let disc = this.locationsOfDiscs[i][j];
                if (disc.color === "W") {
                    isThereAnyWhiteSolider = true;
                    this.whiteDiscAmount++;
                }
                if (disc.color === "R") {
                    isThereAnyRedSolider = true;
                    this.redDiscAmount++;
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
        this.diceResult = null;
        this.playedDiscsIdArray = [];
        this.DiceDom.resetDice();
        this.DiceDom.makeButtonDisabled();
        this.changeTurn();

    }
    play(ev) {
        ev.preventDefault();
        let to = ev.target.id;
        if (this.checkIfThereIsWinner()) return;
        this.getMovesCount();
        if (!this.diceResult || this.diceResult.length == 0) {
            alert("please throw the dice to start");
        }
        else {
            if (this.checkIfThereIsEatenSolidersOfMyColor()) {
                if (!this.checkIfIcanBringDiscBaseOnDiceResult(this.diceResult)) {
                    alert("you cant bring back your disc")
                    this.turnDone();
                    return;
                }
                const index = this.findEatenDisc(this.dragId);
                if (index === undefined) {
                    alert("you need to bring back your eaten solider before you do move");
                    return;
                }
                this.bringBackEatenSolider(index, to, this.diceResult);
                if (this.diceResult.length == 0) {
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
            this.makeMove(from, to, this.diceResult);
            if (this.diceResult.length == 0) {
                this.turnDone();
            }
        }
        return;
    }
    setGameFunctionality() {
        let allDiscComponents = this.domComponent.querySelectorAll(".Disc");
        let allCellComponents = this.domComponent.querySelectorAll("td");
        for (let i = 0; i < allDiscComponents.length; i++) {
            allDiscComponents[i].addEventListener("drag", this.setDragId.bind(this));
        }
        for (let i = 0; i < allCellComponents.length; i++) {
            allCellComponents[i].addEventListener("drop", this.play.bind(this));
            allCellComponents[i].addEventListener("dragover", (ev) => { ev.preventDefault(); })
        }
        document.body.addEventListener("drop",this.bearingOff.bind(this));
        document.body.addEventListener("dragover", (ev) => { ev.preventDefault(); });
    }
}

