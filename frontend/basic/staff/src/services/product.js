
const endPointBase = '/product';

class ProductService {
    constructor(apiService) {
        this.apiService = apiService;
    }
    getList() {
        return this.apiService.getData(endPointBase + '/list');
    }
    add(product) {
        return this.apiService.postData(endPointBase + '/add', product);
    }
}

export default ProductService;
