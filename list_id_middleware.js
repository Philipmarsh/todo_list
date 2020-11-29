
const ids = [];

function createNewListId(){
    const letters='abcdefghijklmnopqrstuvwxyz';
    let id = '';
    for(i=0; i<6;i++){
    id += letters[Math.floor(Math.random()*26)];
    }
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