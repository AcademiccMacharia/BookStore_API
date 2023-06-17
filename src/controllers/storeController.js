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
    if (sql.connected) {
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

async function getBookByID(req, res) {
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

async function getAllBooks(req, res) {
  let sql = await mssql.connect(config);
  if (sql.connected) {
    let results = await sql.query(`SELECT * from dbo.Books`)
    let books = results.recordset;
    res.json({
      success: true,
      message: 'fetched all books',
      results: books
    })
  } else {
    res.status(500).send('Internal server error')
  }

}

async function getAllMembers(req, res) {
  let sql = await mssql.connect(config);
  if (sql.connected) {
    let results = await sql.query(`SELECT * from dbo.Members`)
    let Members = results.recordset;

    res.json({
      success: true,
      message: 'fetched all members',
      results: Members
    })
  } else {
    res.status(500).send('Internal server error')
  }

}



async function getMemberByID(req, res) {

  let { MemberID } = req.params;
  let sql = await mssql.connect(config);
  if (sql.connected) {
    let results = await sql.query(`SELECT* from dbo.Members WHERE MemberID=${Number(MemberID)}`)

    let member = results.recordset[0]

    res.json({
      success: true,
      message: 'fetched product successfully',
      results: member
    })
  }

}

async function createMember(req, res) {
  let sql = await mssql.connect(config);
  if (sql.connected) {
    const { Name, Address, ContactNumber } = req.body;
    let request = sql.request()
      .input("Name", Name)
      .input("Address", Address)
      .input("ContactNumber", ContactNumber);

    let result = await request.execute("create_member");
    res.json({
      success: true,
      message: "Member created successfully",
      data: result.recordset,
    });
  }
}

async function returnBook(req, res) {
  let sql = await mssql.connect(config);
  if (sql.connected) {
    const { MemberName, BookID } = req.body;

    let memberQuery = await sql.request()
      .input("MemberName", MemberName)
      .query("SELECT MemberID FROM Members WHERE Name = @MemberName");

    if (memberQuery.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    const MemberID = memberQuery.recordset[0].MemberID;

    let bookQuery = await sql.request()
      .input("BookID", BookID)
      .query("SELECT Status FROM Books WHERE BookID = @BookID");

    if (bookQuery.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (bookQuery.recordset[0].Status !== "Loaned") {
      return res.status(400).json({
        success: false,
        message: "Book is not currently on loan",
      });
    }

    let result = await sql.request()
      .input("MemberID", MemberID)
      .input("BookID", BookID)
      .execute('ReturnBook');

    res.json({
      success: true,
      message: "Book returned successfully",
      data: result.recordset
    });
  } else {
    res.status(500).send("Internal server error");
  }
}




module.exports = {
  Home: (req, res) => {
    res.send("Book Management API")
  },
  getAllBooks, getAllMembers, getMemberByID, getAllMembers, getMemberByID, getBookByID, createMember, createBook,
  GetBorrowingMember, returnBook
}

