require('dotenv').config()

const { Verifier } = require('@pact-foundation/pact');
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
            pactBrokerUrl: process.env.PACT_BROKER_URL || "http://localhost:8000",
            pactBrokerUsername: process.env.PACT_BROKER_USERNAME || "pact_workshop",
            pactBrokerPassword: process.env.PACT_BROKER_PASSWORD || "pact_workshop",
            publishVerificationResult: true
        };

        return new Verifier(opts).verifyProvider()
            .then(output => {
                console.log('Verification successful:', output);
            })
            .catch(error => { 
                console.log('Verification error:', error)
            })
            .finally(() => {
                server.close();
            });
    })
});