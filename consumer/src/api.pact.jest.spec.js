
const UserAPI = require ("./api")
const { pactWith } = require("jest-pact")
const { Matchers } = require("@pact-foundation/pact")

const { like }  = Matchers

const USER_DATA = {
    id: "1", 
    firstname: "John", 
    lastname: "Doe"
}

pactWith({consumer: "DemoConsumer", provider: "DemoProvider"}, provider => {
    
    describe("Jest Pact Adapter testing", () => {

        describe("when I call the User service to retrieve a specific user", () => {
            describe("and there is a user in the DB with id of 1", () => {
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

                beforeEach( () => {
                    return provider.addInteraction({
                        state: "I have a specific user",
                        ...userRequest,
                        willRespondWith: userSuccessResponse
                    })
                })

                it("returns user 1 basic info", async () => {
                    const api = new UserAPI(provider.mockService.baseUrl)
                    const userBasicInfo = await api.getBasicInfo(USER_DATA.id)                   
                    expect(userBasicInfo).toEqual(USER_DATA)
                })
            })
        })
    })
})