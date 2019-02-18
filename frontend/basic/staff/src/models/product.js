class Product {
    constructor() {
        this.id = null;
        this.name = '';
        this.image = null;
        this.thumbnail = null;
    }
    map(productObj) {
        for (let field in productObj) {
            if (this[field] !== undefined) {
                this[field] = productObj[field];
            }
        }
        return this;
    }
}

export default Product;