const mssql = require('mssql');
const config = require('../config/bookStoreConfig');

async function getBookbyID(req, res) {
    try {
      let { BookID } = req.params;
      let sql = await mssql.connect(config);
      
      if (sql.connected) {
        let results = sql.request()
          .input('BookID', BookID)
          .execute('get_book_by_id');
        
        let book = (await results).recordset[0];
        
        if (book) {
          res.json({
            success: true,
            message: 'Book with id ' + BookID + ' fetched successfully',
            data: book
          });
        } else {
          res.status(404).json({
            success: false,
            message: 'Book with id ' + BookID + ' not found'
          });
        }
      } else {
        res.status(500).send("Internal server error");
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Invalid book ID'
      });
    }
  }
  

module.exports = {

    Home: (req, res) => {
        res.send("BookStore Management API")
    },
    getBookbyID
}
