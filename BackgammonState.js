class BackgammonState {
    constructor(){
        this.state={
            dice:[],
            locationsOfDiscs:[],
            whiteTure:true,
            eatenDiscs:[]
        }
    }
    dispatch(action){
        Object.assign(this.state,action);
    }
    getState(){
        return this.state;
    }
}