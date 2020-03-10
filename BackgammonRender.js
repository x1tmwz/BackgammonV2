class BackgammonRender {
    constructor({ locationsOfDiscs, whiteTurn, eatenDiscs, dice }) {
        this.state={
            locationsOfDiscs,
            whiteTurn,
            eatenDiscs,
            dice
        }
        this.createComponent();
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
        const eatenTable = createTable1D(1, "eatenTable");
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
        for (let i = 0; i < this.state.locationsOfDiscs.length; i++) {
            this.tdArray[i].id = i;
            if (this.state.locationsOfDiscs[i].length !== 0) {
                for (let j = 0; j < this.state.locationsOfDiscs[i].length; j++) {
                    this.tdArray[i].appendChild(this.state.locationsOfDiscs[i][j].domComponent)
                }
            }
        }
        this.dice = new DiceRender();
        this.boardImgDom = createDom("img", { className: "boardImg", src: "../resources/Borad_img/board.png" });
        this.headLineNode = createDom("h1", { className: "headline" }, "Backgammon!!");
        this.domComponent = createDom("div", { className: "backgammon" }, this.dice.domComponent, this.whosTurnNowComponent, this.headLineNode, this.boardImgDom, eatenTable, table1, table2, table3, table4);
    }
    renderChangeTurn() {
        const imges = ["../resources/Disc.img/redDisc.png", "../resources/Disc.img/whiteDisc.png"]
        this.whosTurnNowImgNode.setAttribute("src", this.state.whiteTurn ?  imges[0] : imges[1]);
    }
    renderDice(){
        this.dice.syncState(this.state.dice);
    }
    renderRowsWithDiscs(){
        shouldItRender=(oldState,newState)=>{
            if(!oldState)return false;
            for(let i=0; i<oldState.locationsOfDiscs.length;i++){
                for(let j=0;j<oldState.locationsOfDiscs[i].length;j++){
                    const oldDisc = oldState.locationsOfDiscs[i][j];
                    const newDisc = newState.locationsOfDiscs[i][j];
                    if(oldDisc.id !== newDisc.id){
                        return true;
                    }
                }
            }
            return false; 
        }
        if(shouldItRender(this.oldState,this.state)){
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
    renderEatenDiscs(){
        if (this.state.eatenDiscs.length > 0) {
            while (this.eatTdDom[0].hasChildNodes()) {
                this.eatTdDom[0].removeChild(this.eatTdDom[0].firstChild)
            }
            for (let i = 0; i < this.state.eatenDiscs.length; i++) {
                this.eatTdDom[0].appendChild(this.state.eatenDiscs.domComponent);

            }
        }

    }
    render(){
        this.renderChangeTurn();
        this.renderDice();
        this.renderRowsWithDiscs();
        this.renderEatenDiscs();
    }
    syncState(state){
        this.oldState = Object.assign({},this.state);
        this.state = Object.assign(this.state,state);
        this.render();
    }
}