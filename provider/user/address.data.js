
class AddressData {

    constructor() {
        this.addresses = [
            {id: 1, userId:"1", street: "St John", city: "Singapore", country: "Singapore"},
            {id: 2, userId:"2", street: "Bojol", city: "Batam", country: "Indonesia"},
        ];
    }

    async getById(userId) {
        return this.addresses.filter(address => 
            address.userId === userId
        );
    }

    async getAll() {
        return this.addresses
    }
}

module.exports = AddressData;
