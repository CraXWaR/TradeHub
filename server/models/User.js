export default class User {
    constructor(id, name, email, password, role, created_at) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.created_at = created_at;
    }
}
