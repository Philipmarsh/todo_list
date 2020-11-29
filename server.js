const express = require('express');
const path = require('path');

require('./database');
const ListIdMiddleWare = require('./list_id_middleware');
const ListItem = require('./item_model');

// Endpoints: 
// '/': react app - get
// '/items': -get -post-update -delete

const port = 8000;

const webServer = express();
webServer.use(express.static(path.join(__dirname, 'build')));
webServer.use(express.json());
webServer.use(ListIdMiddleWare);


webServer.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


webServer.get('/items', async (req, res) => {
    console.log(req.headers.listid);
    const items = await ListItem.find({ listId: req.headers.listid}).exec();
    const objToSend = {
        id: req.headers.listid,
        itemList: items
    }
    res.json(objToSend);
});


webServer.post('/items', async (req, res) => {
    const newListItem = new ListItem({ text: req.body.text, completed: false, listId: req.headers.listid });
    const response = await newListItem.save();
    res.json(response);
})


webServer.delete('/items/:itemId', async(req, res)=>{
    const id = req.params.itemId;
    try{
    let updateItem = await ListItem.findByIdAndDelete(id);
        res.json(updateItem);
    }
    catch(e){
        console.warn(e);
    }
})


webServer.patch('/items/:itemId', async (req, res) => {
    const id = req.params.itemId;
    try {
        await ListItem.findByIdAndUpdate(id, {completed: req.body.completed});
    }
    catch (e) {
        console.warn(e);
    }
    res.json(`{message: ${id} has been deleted}`);

})


webServer.listen(port, '0.0.0.0', () => {
    console.log(`server listening on 0.0.0.0:${port}`)
})