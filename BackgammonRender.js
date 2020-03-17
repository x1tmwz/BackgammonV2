class BackgammonRender {
    constructor({ locationsOfDiscs, whiteTurn, eatenDiscs, dice }) {
        this.state = {
            locationsOfDiscs,
            whiteTurn,
            eatenDiscs,
            dice
        }
        this.createComponent();
    }
    createComponent() {
        //utills funcs
         
        function createTable1D(size, className) {
            let table = createDom("table", { className });
            let row = table.insertRow(0);
            for (let i = 0; i < size; i++) {
                let cell = row.insertCell(i);
            }
            return table;
        }
        function createRowDiv(size, rowClassName, coulmnClassName) {
            let rowDiv = createDom("div", { className: rowClassName });
            for (let i = 0; i < size; i++) {
                let row = createDom("div", { className: coulmnClassName });
                rowDiv.appendChild(row);
            }
            return rowDiv;
        }
        function boardRowToArrayOfColumns(rowUpLeft,rowUpRight,rowDownLeft,rowDownRight){
            const columnsUpLeft = rowUpLeft.toA
            
            
        } 
        //header
        this.whosTurnNowImgNode = createDom("img", { className: "turnViewImg", src: "../resources/Disc.img/whiteDisc.png" });
        this.whosTurnNowComponent = createDom("div", { className: "header__turnComponent" }, "Current turn:", this.whosTurnNowImgNode);
        this.dice = new DiceRender();
        const title = createDom("h1", { className: "header__title" }, "B a c k g a m m o n");
        this.titleDom = createDom("div", { className: "header__title__block" }, title);
        const HeaderBody = createDom("div", { className: "header__body" }, this.dice.domComponent, this.whosTurnNowComponent);
        const Header = createDom("div", { className: "header" },
            title,
            HeaderBody
        );

        //body
        const upperRowLeft = createRowDiv(6, "row__upper", "column__upper");
        const upperRowRight = createRowDiv(6, "row__upper", "column__upper");
        const downRowLeft = createRowDiv(6, "row__Down", "column__Down");;
        const downRowRight = createRowDiv(6, "row__Down", "column__Down");
        // const boardUpperPart = createDom('div', { className: 'board__upperPart' }, upperRowLeft, upperRowRight);
        // const boardDownPart = createDom('div',{className:'board__downPart'},downRowLeft,downRowRight);
        // const board =createDom('div',{className:'board'},boardUpperPart,boardDownPart);

        const eatenRow =createDom('div',{className:'board__eatenRow'});
        const boardLeftPart = createDom('div', { className: 'board__leftPart' }, upperRowLeft, downRowLeft);
        const boardRightPart = createDom('div',{className:'board__rightPart'},upperRowRight,downRowRight);
        const board =createDom('div',{className:'board'},boardLeftPart,eatenRow,boardRightPart);
        const Body = createDom("div", { className: "backgammon__body" }, board);


        this.domComponent = createDom("div", { className: "backgammon" }, Header, Body);



        // const eatenTable = createTable1D(1, "eatenTable");
        // this.eatTdDom = Array.from(eatenTable.getElementsByTagName("td"));
        // let table1 = createTable1D(6, "table1");
        // let table2 = createTable1D(6, "table2");
        // let table3 = createTable1D(6, "table3");
        // let table4 = createTable1D(6, "table4");
        // let tdOftable1 = Array.from(table1.getElementsByTagName("td"));
        // let tdOftable2 = Array.from(table2.getElementsByTagName("td"));
        // let tdOftable3 = Array.from(table3.getElementsByTagName("td"));
        // let tdOftable4 = Array.from(table4.getElementsByTagName("td"));
        // this.tdArray = tdOftable2.concat(tdOftable1, tdOftable3.reverse(), tdOftable4.reverse());
        // for (let i = 0; i < this.state.locationsOfDiscs.length; i++) {
        //     this.tdArray[i].id = i;
        //     if (this.state.locationsOfDiscs[i].length !== 0) {
        //         for (let j = 0; j < this.state.locationsOfDiscs[i].length; j++) {
        //             this.tdArray[i].appendChild(this.state.locationsOfDiscs[i][j].domComponent)
        //         }
        //     }
        // }



        // this.domComponent = createDom("div", { className: "backgammon" }, this.dice.domComponent, this.whosTurnNowComponent, this.headLineNode, this.boardImgDom, eatenTable, table1, table2, table3, table4);
    }
    renderChangeTurn() {
        const imges = ["../resources/Disc.img/redDisc.png", "../resources/Disc.img/whiteDisc.png"]
        this.whosTurnNowImgNode.setAttribute("src", this.state.whiteTurn ? imges[0] : imges[1]);
    }
    renderDice() {
        this.dice.syncState(this.state.dice);
    }
    renderRowsWithDiscs() {
        const shouldItRender = (oldState, newState) => {
            if (!oldState) return false;
            for (let i = 0; i < oldState.locationsOfDiscs.length; i++) {
                for (let j = 0; j < oldState.locationsOfDiscs[i].length; j++) {
                    const oldDisc = oldState.locationsOfDiscs[i][j];
                    const newDisc = newState.locationsOfDiscs[i][j];
                    if (oldDisc.id !== newDisc.id) {
                        return true;
                    }
                }
            }
            return false;
        }
        if (shouldItRender(this.oldState, this.state)) {
            for (let i = 0; i < this.tdArray.length; i++) {
                while (this.tdArray[i].hasChildNodes()) {
                    this.tdArray[i].removeChild(this.tdArray[i].firstChild);
                }
            }
            for (let i = 0; i < this.state.locationsOfDiscs.length; i++) {
                for (let j = 0; j < this.state.locationsOfDiscs[i].length; j++) {
                    if (j == 6) break;
                    this.tdArray[i].appendChild(this.state.locationsOfDiscs[i][j].domComponent);
                }
            }
        }
    }
    renderEatenDiscs() {
        if (this.state.eatenDiscs.length > 0) {
            while (this.eatTdDom[0].hasChildNodes()) {
                this.eatTdDom[0].removeChild(this.eatTdDom[0].firstChild)
            }
            for (let i = 0; i < this.state.eatenDiscs.length; i++) {
                this.eatTdDom[0].appendChild(this.state.eatenDiscs.domComponent);

            }
        }

    }
    render() {
        this.renderChangeTurn();
        this.renderDice();
        this.renderRowsWithDiscs();
        this.renderEatenDiscs();
    }
    syncState(state) {
        this.oldState = Object.assign({}, this.state);
        this.state = Object.assign(this.state, state);
        this.render();
    }
}