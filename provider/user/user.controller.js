const UserData = require("./user.data.js");

const data = new UserData();

exports.getById = async (req, res) => {
    const user = await data.getById(req.params.id);
    user ? res.send(user) : res.status(404).send({message: "User not found"})
};

exports.data = data;