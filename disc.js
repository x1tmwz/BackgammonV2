class Disc{
    constructor(color,id){
        this.id = id;
        this.setColor(color);
        this.createComponent();
    }
    setColor(color){
        if(color === "W" || color==="R"){
            this.color = color;
        }
        else{
            throw new Error(`you can enter only "R" for red disc or "W" for white disc`);
        }
    }
    createComponent(){
        const imges=["../resources/Disc.img/redDisc.png","../resources/Disc.img/whiteDisc.png"]
        this.domComponent = createDom("img",{
            src:this.color=="R"?imges[0]:imges[1],
            className:"Disc",
            id:this.id,
            draggable:"true",
            ondrag:(e)=>{
                return this.id;
            }
        });
    }
}

  
  
