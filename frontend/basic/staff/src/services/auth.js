
const endPointBase = '/auth';

class AuthService {
    constructor(apiService) {
        this.apiService = apiService;
        this.token = null;
        this.roles = [
            'ROLE_USER',
            'ROLE_MANAGER',
            'ROLE_ADMIN'
        ];
        this.authenticate();
    }
    authenticate(username, password) {
        if (username && password) {
            return this.apiService.postData(endPointBase + '/token', {
                username: username,
                password: password
            });
        } else {
            this.restoreAuthenticationFromPersistedToken();
        }
    }
    getUserDetails() {
        this.apiService.getData(endPointBase + '/details')
        .then(userDetails => {
            console.log(userDetails);
        });
    }
    setAuthenticated(token) {
        if (token) {
            this.token = token;
            this.persistToken();
            this.apiService.modifyHeaders({name: 'Authorization', value: 'Bearer ' + this.token});
            this.getUserDetails();
        }
    }
    restoreAuthenticationFromPersistedToken() {
        this.token = localStorage.getItem('token');
        if (this.token) {
            this.apiService.modifyHeaders({name: 'Authorization', value: 'Bearer ' + this.token});
            this.getUserDetails();
        }
    }
    persistToken() {
        localStorage.setItem('token', this.token);
    }
    clearToken() {
        this.token = undefined;
        localStorage.clear('token');
        this.apiService.removeHeader('Authorization');
    }
    isAuthenticated() {
        return this.token;
    }
    logout() {
        this.clearToken();
    }
}

export default AuthService;
