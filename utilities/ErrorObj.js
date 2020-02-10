
class ValidtionObj {
    constructor(error, message) {
        this.error = error;
        this.message = message;

    }

}
const message = { empty: "empty", join: "join to empty row", eat: "eat" };
const errorMessage = {
    invalidDirection: "you need to move to the opposite direction",
    invalidMove: "you need to move your disc by the size of your dice number",
    invalidColor:"you take disc with wrong color",
    invalidPlace:"you cant put your disc there",
    
    
}
