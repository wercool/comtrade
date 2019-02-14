class User {
    constructor() {
        this.id = null;
        this.username = '';
        this.password = '';
        this.personName = '';
        this.roles = ['ROLE_USER'];
    }
    map(userObj) {
        for (let field in userObj) {
            if (this[field] !== undefined) {
                this[field] = userObj[field];
            }
        }
        return this;
    }
}

export default User;