const mssql = require('mssql');
const config = require('../config/bookStoreConfig');
const { newBookValidator } = require('../validators/newBookValidator')
const { tokenVerifier } = require('../utils/tokens');
const { sendBorrowMail } = require('../utils/sendBorrowMail');
const { sendReturnMail } = require('../utils/sendReturnMail');

async function createBook(req, res) {
  const book = req.body;
  try {
    let { value } = newBookValidator(book)
    let sql = await mssql.connect(config);
    if (sql.connected) {
      let createBookResult = await sql.request()
        .input('Title', mssql.VarChar(100), value.Title)
        .input('Author', mssql.VarChar(50), value.Author)
        .input('PublicationYear', mssql.Date, value.PublicationYear)
        .execute('library.CreateBook');

      let getBooksResult = await sql.request().query('SELECT * FROM library.Books');

      console.log(createBookResult);
      console.log(getBooksResult.recordset);

      createBookResult.rowsAffected ? res.status(200).send({
        success: true,
        message: "Book created successfully"
      })
        : res.status(500).send({ success: false, message: 'An error occured. Try again!' });
    }
  } catch (error) {
    res.send(error.message);
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
    let token = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token has not been provided',
      });
    }

    token = token.split(' ')[1];
    console.log(token);

    let user = await tokenVerifier(token);
    if (user.roles === 'admin') {
    let { BookID } = req.params;
    let sql = await mssql.connect(config);

    if (sql.connected) {
      let results = sql.request()
        .input('BookID', BookID)
        .execute('library.get_book_by_id');

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
  } else {
    res.status(403).json({
      success: false,
      message: 'Unauthorized access',
    });
  }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid book ID'
    });
    if (error.message.includes('token') || error.message.includes('invalid')) {
      res.status(403).json({
        success: false,
        message: 'Log in again',
      });
    } else {
      res.status(500).send('Internal server error');
    }
  }
}

async function getAllBooks(req, res) {
  try {
    let token = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token has not been provided',
      });
    }

    token = token.split(' ')[1];
    console.log(token);

    let user = await tokenVerifier(token);
    
    if (user.roles === 'admin') {
      let sql = await mssql.connect(config);
      if (sql.connected) {
        let results = await sql.query(`SELECT * from library.Books`);
        let books = results.recordset;
        res.json({
          success: true,
          message: 'Fetched all books',
          results: books,
        });
      } else {
        res.status(500).send('Internal server error');
      }
    } else {
      res.status(403).json({
        success: false,
        message: 'Unauthorized access',
      });
    }
  } catch (error) {
    console.log(error);

    if (error.message.includes('token') || error.message.includes('invalid')) {
      res.status(403).json({
        success: false,
        message: 'Log in again',
      });
    } else {
      res.status(500).send('Internal server error');
    }
  }
}


async function getAllMembers(req, res) {
  try{
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token has not been provided',
    });
  }

  token = token.split(' ')[1];
  console.log(token);

  let user = await tokenVerifier(token);

  if (user.roles === 'admin') {
  let sql = await mssql.connect(config);
  if (sql.connected) {
    let results = await sql.query(`SELECT * from library.Members`)
    let Members = results.recordset;

    res.json({
      success: true,
      message: 'fetched all members',
      results: Members
    })
  } else {
    res.status(500).send('Internal server error')
  }
} else {
    res.status(403).json({
      success: false,
      message: 'Unauthorized access',
    });
}
  } catch(error) {
    console.log(error)

    if (error.message.includes('token') || error.message.includes('invalid')) {
      res.status(403).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).send('Internal server error');
    }
  }

}





async function getMemberByID(req, res) {
  try {
    let { MemberID } = req.params;
    let sql = await mssql.connect(config);
    if (sql.connected) {
      if (sql.connected) {
        let results = sql.request()
          .input('MemberID', MemberID)
          .execute('library.GetMemberByID');

        let member = (await results).recordset[0]

        if (member) {
          res.json({
            success: true,
            message: 'member with id ' + MemberID + ' fetched successfully',
            results: member
          })
        } else {
          res.json({
            success: false,
            message: 'MemberID does not exist'
          })
        }

      } else {
        res.status(500).send("Internal server error");
      }
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid Member ID'
    })
  }
}


// async function createMember(req, res) {
//   let sql = await mssql.connect(config);
//   if (sql.connected) {
//     const { Name, Address, ContactNumber } = req.body;
//     let request = sql.request()
//       .input("Name", Name)
//       .input("Address", Address)
//       .input("ContactNumber", ContactNumber);

//     let result = await request.execute("create_member");
//     res.json({
//       success: true,
//       message: "Member created successfully",
//       data: result.recordset,
//     });

//   }
// }

// async function returnBook(req, res) {
//   let sql = await mssql.connect(config);
//   if (sql.connected) {
//     const { MemberName, BookID } = req.body;

//     let memberQuery = await sql.request()
//       .input("MemberName", MemberName)
//       .query("SELECT MemberID FROM Members WHERE Name = @MemberName");

//     if (memberQuery.recordset.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Member not found",
//       });
//     }

//     const MemberID = memberQuery.recordset[0].MemberID;

//     let bookQuery = await sql.request()
//       .input("BookID", BookID)
//       .query("SELECT Status FROM Books WHERE BookID = @BookID");

//     if (bookQuery.recordset.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Book not found",
//       });
//     }

//     if (bookQuery.recordset[0].Status !== "Loaned") {
//       return res.status(400).json({
//         success: false,
//         message: "Book is not currently on loan",
//       });
//     }

//     let result = await sql.request()
//       .input("MemberID", MemberID)
//       .input("BookID", BookID)
//       .execute('ReturnBook');

//     res.json({
//       success: true,
//       message: "Book returned successfully",
//       data: result.recordset
//     });
//   } else {
//     res.status(500).send("Internal server error");
//   }
// }


async function BorrowBook(req, res) {
  let sql = await mssql.connect(config);
  if (sql.connected) {
    const { MemberID, BookID, LoanDate, ReturnDate } = req.body;
    let result = await sql.request()
      .input("MemberID", MemberID)
      .input("BookID", BookID)
      .input("LoanDate", LoanDate)
      .input("ReturnDate", ReturnDate)
      .output("Status", mssql.NVarChar(100))
      .execute('library.BorrowBook');

    const status = result.output.Status;
    console.log(result.recordsets[0][0]);

    if (status === 'Book borrowed successfully.') {
      const borrowedBook = result.recordsets[0][0];
      const { Email, Name, Title } = borrowedBook;
      await sendBorrowMail(Email, Name, Title, ReturnDate);
    }

    res.json({
      success: true,
      data: result.recordsets[0]
    });
  } else {
    res.status(500).send("Internal server error");
  }
}

async function returnBook(req, res) {
  const { MemberID, BookID } = req.body;
  try {
    const sql = await mssql.connect(config);

    let result = await sql.request()
    .input("MemberID", mssql.Int, MemberID)
    .input("BookID", mssql.Int, BookID)
    .output("Status", mssql.NVarChar(100))
    .execute('library.ReturnBook');

    const status = result.output.Status;

    if (status === 'Book returned successfully.') {
      const returnedBook = result.recordset[0];
      const { Email, Name, Title } = returnedBook;
      await sendReturnMail(Email, Name, Title);
    }

    res.json({
      success: true,
      status,
      data: result.recordset
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}



module.exports = {
  Home: (req, res) => {
    res.send("Book Management API")
  },
  getAllBooks, getAllMembers, getMemberByID, getAllMembers, getMemberByID, getBookByID, createBook, GetBorrowingMember, BorrowBook, returnBook
}

