const mssql = require('mssql');
const config = require('../config/bookStoreConfig');

module.exports = {

    Home: (req, res) => {
        res.send("BookStore Management API")
    }
}
