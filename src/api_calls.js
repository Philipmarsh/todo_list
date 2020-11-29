const axios = require('axios');

async function makeGetCall(localId) {
    try {
        let axios_object = {
            method: 'get',
            url: "/items",
        }
        if(localId) axios_object.headers = { 'listid': localId };
        
        const response = await axios(axios_object);    
        return response;
    }
    catch (e) {
        console.warn(e);
    }
    
}

async function makePostCall(textString, localId) {
    try {
        
        const response = await axios({
            method: 'post',
            url: "/items",
            headers: { 'listid': localId },
            data: {'text': textString }
        });
        
        return response;
    }
    catch (e) {
        console.warn(e);
    }

}

async function makeUpdateCall(completed, localId, id) {
    try {

        const response = await axios({
            method: 'patch',
            url: `/items/${id}`,
            headers: { 'listid': localId },
            data: { 'completed': completed }
        });

        return response;
    }
    catch (e) {
        console.warn(e);
    }

}


async function makeDeleteCall(id) {
    try {
        const response = await axios({
            method: 'delete',
            url: `/items/${id}`,
            headers: { 'listid': 'xbrmev' },
        });
        console.log(response);
        return response;
    }
    catch (e) {
        console.log(e);
    }

}
export {makeGetCall, makePostCall, makeUpdateCall, makeDeleteCall}