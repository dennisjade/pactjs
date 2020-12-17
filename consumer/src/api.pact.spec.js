
import path from 'path'
import {Pact, Matchers} from '@pact-foundation/pact'
import UserAPI from './api'

const { like } = Matchers

const USER_DATA = {
    id: "1", 
    firstname: "John", 
    lastname: "Doe"
}

const provider = new Pact({
    consumer: 'DemoConsumer',
    provider: 'DemoProvider',
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    logLevel: "warn",
    dir: path.resolve(process.cwd(), 'pacts'),
});

describe("Pact testing", () => {

    beforeAll(() => provider.setup());   // start the mock server; call once
    afterEach(() => provider.verify());  // verifies the interaction to ensure expectations are correct; call once per test
    afterAll(() => provider.finalize()); // records the interactins into the pact file and shutsdown

    describe("when I call the User service", () => {
        describe("and call all the users" , () => {
            test("get all users", async () => {
                await provider.addInteraction({ 
                    state: "all users", 
                    uponReceiving: "a request"
                })
            })
        })

        describe("and there is a user with id of 1", () => {
            test("get user 1 basic profile data", async () => {
                const userSuccessResponse = { 
                    status: 200,
                    body: USER_DATA
                }

                const userRequest = {
                    uponReceiving: "a request for user with given Id", 
                    withRequest: {
                        method: "GET",
                        // path: term({ generate: '/user/1', matcher: '/user/[0-9]+' })
                        path: like("/user/1")
                    },
                    headers: {
                        Accept: "application/json"
                    }
                }

                await provider.addInteraction({
                    state: "I have a specific user",
                    ...userRequest,
                    willRespondWith: userSuccessResponse
                })

                const api = new UserAPI(provider.mockService.baseUrl)
                const userBasicInfo = await api.getBasicInfo(USER_DATA.id)    

                expect(userBasicInfo).toStrictEqual(USER_DATA)
            })
        })

        describe("and there is no user with the id of 2", () => {
            test("user 2 does not exist", async () => {
                await provider.addInteraction({
                    state: "user with id 2 does not exist",
                    uponReceiving: "get user basic profile with id 2", 
                    withRequest: {
                        method: "GET",
                        path: "/user/2"
                    },
                    willRespondWith: {
                        status: 404
                    }
                })

                const api = new UserAPI(provider.mockService.baseUrl)
                await expect(api.getBasicInfo("2")).rejects.toThrow("Request failed with status code 404")
            })
        })
    })
})