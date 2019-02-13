
class APIService {
    constructor() {
        this.headers = {
            'Content-Type': 'application/json'
        };
    }
    getAPIURL() {
        return process.env.REACT_APP_API_URL;
    }
    handleErrors(response) {
        if (!response.ok) {
            return Promise.reject(response);
        }
        return response;
    }
    modifyHeaders(header) {
        this.headers[header.name] = header.value;
    }
    removeHeader(headerName) {
        delete this.headers[headerName];
    }
    getData(endPointPath) {
        let endPointURL = this.getAPIURL() + endPointPath;
        return fetch(endPointURL, {
            method: 'GET',
            cache: 'no-cache',
            headers: this.headers
        })
        .then(this.handleErrors)
        .then(response => response.json());
    }
    postData(endPointPath, data) {
        let endPointURL = this.getAPIURL() + endPointPath;
        return fetch(endPointURL, {
            method: 'POST',
            cache: 'no-cache',
            headers: this.headers,
            body: JSON.stringify(data)
        })
        .then(this.handleErrors)
        .then(response => response.json());
    }
}

export default APIService;
