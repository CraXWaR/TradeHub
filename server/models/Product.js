export default class Product {
    constructor(id, user_id, title, description, price, image, created_at) {
        this.id = id;
        this.user_id = user_id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.image = image;
        this.created_at = created_at;
    }
}
