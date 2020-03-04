class BackgammonState {
    constructor(){
        this.state={
            dice:[],
            discLoactionsArray:[]
        }
    }
    dispatch(action){
        Object.assign(this.state,action);
    }
    getState(){
        return this.state;
    }
}