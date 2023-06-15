const mssql = require('mssql');
const config = require('../config/bookStoreConfig');

async function createBook(req, res) {
    const book = req.body;
    try {
        let sql = await mssql.connect(config);
        if (sql.connected) {
            let createBookResult = await sql.request()
                .input('Title', mssql.VarChar(100), book.title)
                .input('Author', mssql.VarChar(50), book.author)
                .input('PublicationYear', mssql.Date, book.publicationYear)
                .execute('library.CreateBook');
            
            let getBooksResult = await sql.request().query('SELECT * FROM library.Books');
            
            console.log(createBookResult);
            console.log(getBooksResult.recordset);
            
            res.status(200).json({
                statusCode: true,
                message: "Book created successfully",
                books: getBooksResult.recordset
            });
        }
    } catch (error) {
        console.log(error);
    }
}

async function GetBorrowingMember(req, res) {
    try {
        let sql = await mssql.connect(config);
        if (sql.connected){
            let result = await sql.request()
                .execute('library.GetBorrowingMember')
                console.log(result)

                res.status(200).json({
                    statusCode: true,
                    message: "Got members who have borrowed successfully",
                    results: result.recordsets
                })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {

    Home: (req, res) => {
        res.send("BookStore Management API")
    },
    createBook,
    GetBorrowingMember
}

