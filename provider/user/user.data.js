const User = require('./user');

class UserData {

    constructor() {
        this.users = new Map([
            ["1", new User("1", "John", "Doe")],
            ["2", new User("2", "Maria", "Lee")],
        ]);
    }

    async getById(id) {
        return this.users.get(id);
    }

    async getAll() {
        return [...this.users.values()]
    }
}

module.exports = UserData;
