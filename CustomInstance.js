const axios = require('axios')


class CustomInstance {
    constructor(config) {
        return axios.create(config)
    }
}

module.exports = CustomInstance
