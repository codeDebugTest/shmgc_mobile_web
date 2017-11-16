import fetch from 'isomorphic-fetch'

const httpRequest = (url, options) => {
    console.log('------>>>> ' + url);
    return fetch(url, options).then(
        response => {
            var jsonData = response.json();
            console.dir(jsonData);
            console.log('<<<<----- ');
            return jsonData;
        }
    ).catch(
        error => console.log(error)
    )
};

const getQueryString = (params) => {
    return Object.keys(params).map((key) => key + '=' + params[key]).join('&');
}

const httpRequestFactory = (url, method, params, header) => {
    const options = {
        method: method
    };

    if (method === 'get' || method === 'delete') {
        url += '?' + getQueryString(params);
        options.header = header || {'Accept': 'application/json'};
    } else { // 'POST', 'PUT'
        options.header = header || {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        options.body = JSON.stringify(params);
    }
    return httpRequest(url, options);
};

const http = ['get', 'post', 'put', 'delete'].reduce(function (obj, method) {
    obj[method] = (url, params, header) => {
        return httpRequestFactory(url, method, params, header);
    };
    return obj;
}, {});

export default http;

