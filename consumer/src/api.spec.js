import UserAPI from "./api"
import nock from "nock"

describe("Common API testing", () => {

    describe("when I call the User service to retrieve a specific user", () => {
        describe("and there is a user in the DB with id of 1", () => {

            test("get user basic profile with id 1", async () => {
                const user = {
                    id: "1",
                    firstname: "John", 
                    lastname: "Doe"
                }

                const api = new UserAPI(process.env.USER_API_BASE_URL)
                nock(api.url)
                    .get('/user/1')
                    .reply(200, user,  {'Access-Control-Allow-Origin': '*'})
                const response = await api.getBasicInfo("1")
                expect(response).toEqual(user)
            })
        })
    })
})