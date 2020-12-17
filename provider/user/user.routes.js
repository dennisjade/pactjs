const router = require('express').Router();
const controllerUser = require('./user.controller');
const controllerAddress = require('./address.controller');

router.get("/user/:id", controllerUser.getById);
router.get("/user/:id/address", controllerAddress.getById);

module.exports = router;