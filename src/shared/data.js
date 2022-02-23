import { mockData } from './mockData.js';

const getData = async function() { 
    const headers = { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    const data = fetch('data.json', {headers: headers})
                    .then(response=>checkResponse(response))
                    .then(data => {return data});
    return data;
}

const checkResponse = function(response) { 
    if(response.status != 200) throw Error(response.statusText);       
    let data = response.json().then(data => { 
        if(!data) {
            console.error('No data found ...');
            return [];
        }
        if(typeof data != 'object') return [];
        return data.data;
    }); 
    return data;
}

export const data = {
    getData,
    mockData
};