const AddressData = require("./address.data.js");

const data = new AddressData();

exports.getById = async (req, res) => {
    const address = await data.getById(req.params.id);
    address ? res.send(address) : res.status(404).send({message: "User address not found"})
};

exports.data = data;