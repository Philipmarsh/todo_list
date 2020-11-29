
//checks to see if id has already been assigned, if so creates a new id.
// If I were to continue this project I would make another document on
// the database and replace this array by putting ids on the database.
const ids = [];

function createNewListId(){
    const letters='abcdefghijklmnopqrstuvwxyz';
    let id = '';
    for(i=0; i<6;i++){
    id += letters[Math.floor(Math.random()*26)];
    }
    if(id in ids){
        return createNewListId();
    }
    ids.push(id);
    return id;
}

function ListIdMiddelware(req, res, next){
    
    if(!req.headers.listid){
        req.headers.listid = createNewListId(); 
        console.log(req.headers.listid);
    }
    next();
}

module.exports = ListIdMiddelware;