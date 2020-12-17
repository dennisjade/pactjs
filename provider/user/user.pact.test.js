require('dotenv').config()

const { Verifier } = require('@pact-foundation/pact');
const userController = require("./user.controller")
const path = require('path');

// Setup provider server to verify
const app = require('express')();
app.use(require('./user.routes'));
const server = app.listen(process.env.PORT);

describe("Pact Verification", () => {
    it("validates the expectations of UserService", () => {
        const opts = {
            logLevel: "INFO",
            providerBaseUrl: `http://localhost:${process.env.PORT}`,
            provider: "DemoProvider",
            providerVersion: "1.0.0",
            pactUrls: [
                path.resolve(__dirname, '../../consumer/pacts/democonsumer-demoprovider.json')
            ],
            stateHandlers: {
                "user with id 2 does not exist": () => {
                    userController.data.users = new Map()
                }
            }
        };

        return new Verifier(opts).verifyProvider().then(output => {
            console.log('Verified successfully: ', output);
        }).catch(error => { 
            console.log('Verification failed: ', error)
        }).finally(() => {
            server.close();
        });
    })
});