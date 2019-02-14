
const endPointBase = '/user';

class UserService {
    constructor(apiService) {
        this.apiService = apiService;
    }
    getList() {
        return this.apiService.getData(endPointBase + '/list');
    }
    add(user) {
        return this.apiService.postData(endPointBase + '/add', user);
    }
}

export default UserService;
