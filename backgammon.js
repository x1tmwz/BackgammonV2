class Backgammon{
    constructor(){
        this.dices = new doubleDice();
        this.createMapOfToolsOnBoard();
        this.eatenSolidersMap=[];
        this.whiteTurn = true;
        this.firstThrowOfDIce = false;
        this.createComponent();
    }
    render(){

    }
    changeTurn(){
        this.whiteTurn =!this.whiteTurn;
    }
    createComponent(){
       function createTable6x6(className){
        let table =createDom("table",{className});
        let row1 = table.insertRow(0);
        let row2 = table.insertRow(1);
        for(let i =0;i<6;i++){
            let cell1 = row1.insertCell(i);
            let cell2 = row2.insertCell(i);
            cell1.appendChild(createDom("ul"));
            cell2.appendChild(createDom("ul"));
        }
        return table;
       }
       let table1 = createTable6x6("table1");
       let table2 = createTable6x6("table2");
       let ulList = table1.getElementsByTagName("UL")
       console.log(ulList);
       for(let i = 0;i<this.mapOfTools.length;i++){
           if(this.mapOfTools[i].length !== 0){
               for(let j=0;j<this.mapOfTools[i].length;j++){
                   ulList[i].appendChild(createDom("il",{},this.mapOfTools[i][j].domComponent))
               }
           }
       }
       let boardImgDom = createDom("img",{className:"boardImg",src:"../resources/Borad_img/board.png"});
       this.domComponent = createDom("div",{className:"backgammon"},this.dices.domComponent,boardImgDom,table1,table2);
    }
    createMapOfToolsOnBoard(){
        this.mapOfTools =[];
        for(let i=0;i<24;i++){
            this.mapOfTools.push([]);
        }
        this.mapOfTools[0]=["W","W","W","W","W"];
        this.mapOfTools[4]=["R","R","R"];
        this.mapOfTools[6]=["R","R","R","R","R"];
        this.mapOfTools[11]=["W","W"];
        this.mapOfTools[12]=["R","R","R","R","R"];
        this.mapOfTools[16]=["W","W","W"];
        this.mapOfTools[18]=["W","W","W","W","W"];
        this.mapOfTools[23]=["R","R"];
        for(let i=0;i<this.mapOfTools.length;i++){
            if(this.mapOfTools[i].length !== 0){
                for(let j =0;j<(this.mapOfTools[i]).length;j++){
                    let color = this.mapOfTools[i][j];
                    let id = i*this.mapOfTools.length + j;
                    this.mapOfTools[i][j]=new Disc(color,id);
                }
            }
        }
    }
    findDiscOnMap(){

    }
    checkValidMove(){

    }
    makeMove(){

    }
    checkThereIsEatenSoliders(){

    }
    bringBackEatenSolider(){

    }
    checkBearingoff(){

    }
    checkIfThereIsWinner(){

    }
    play(){

    }
}
let t = new Backgammon();
document.body.appendChild(t.domComponent);