const app = require('express')();
const cors = require('cors');
const routes = require('./user/user.routes');

require('dotenv').config()
const port = process.env.PORT;

const init = () => {
    app.use(cors());
    app.use(routes);
    return app.listen(port, () => console.log(`Provider API listening on port ${port}...`));
};

init();