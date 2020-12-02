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
    try {
        const items = await ListItem.find({ listId: req.headers.listid }).exec();
        const objToSend = {
            id: req.headers.listid,
            itemList: items
        }
        res.json(objToSend);
    } catch (e) {
        res.status(400);
    }
});


webServer.post('/items', async (req, res) => {
    try {
        const newListItem = new ListItem({ text: req.body.text, completed: false, listId: req.headers.listid });
        const response = await newListItem.save();
        res.status(201);
        res.json(response);
    }
    catch (e) {
        console.warn(e);
        res.status(400);
    }
})


webServer.delete('/items/:itemId', async (req, res) => {
    const id = req.params.itemId;
    try {
        await ListItem.findByIdAndDelete(id);
        res.json(`{message: ${id} has been deleted}`);
    }
    catch (e) {
        console.warn(e);
        res.status(400);
    }
})


webServer.patch('/items/:itemId', async (req, res) => {
    const id = req.params.itemId;
    try {
        await ListItem.findByIdAndUpdate(id, { completed: req.body.completed });
        res.status(200)
    }

    catch (e) {
        res.status(400);
        console.warn(e);
    }
})


webServer.listen(port, () => {
    console.log(`server listening on port ${port}`)
})