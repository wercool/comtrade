
const endPointBase = '/public';

class PublicService {
    constructor(apiService) {
        this.apiService = apiService;
    }
    ping() {
        return this.apiService.getData(endPointBase + '/ping');
    }
}

export default PublicService;
