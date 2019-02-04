
class AuthService {
    constructor() {
        this.authenticated = false;
    }
    isAuthenticated() {
        return this.authenticated;
    }
    logout() {
        this.authenticated = false;
    }
}

export default AuthService;
