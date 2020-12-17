const axios = require( "axios" )
const adapter = require("axios/lib/adapters/http");

axios.defaults.adapter = adapter;

class UserAPI {

    constructor(url) {
        this.url = url
    }

    async getBasicInfo(id) {
        return axios
            .request({
                method: "GET",
                baseURL: this.url,
                url: `/user/${id}`,
                headers: { Accept: "application/json" },
            })
            .then(response => response.data)
            .catch(error => {
                throw error;
            })
    }

    async getAddress(id) {
        return axios
        .request({
            method: "GET",
            baseURL: this.url,
            url: `/user/${id}/address`,
            headers: { Accept: "application/json" },
        })
        .then(response => response.data)
    }
}

// export default new UserAPI(process.env.USER_API_BASE_URL)
module.exports = UserAPI