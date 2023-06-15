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

async function getAllBooks(req,res) {
    let sql= await mssql.connect(config);
    if(sql.connected){
        let results =await sql.query(`SELECT * from dbo.Books`)
        let books=results.recordset;
        res.json({
            success:true,
            message:'fetched all books',
            results:books
        })
    }else{
        res.status(500).send('Internal server error')
    }
    
}

async function getAllMembers(req,res) {
    let sql= await mssql.connect(config);
    if(sql.connected){
        let results =await sql.query(`SELECT * from dbo.Members`)
        let Members=results.recordset;
    
        res.json({
            success:true,
            message:'fetched all members',
            results:Members
        })
    }else{
        res.status(500).send('Internal server error')
    }
    
}



async function getMemberByID(req, res) {

    let {MemberID}=req.params;
    let sql = await mssql.connect(config);
    if( sql.connected){
         let results=await sql.query(`SELECT* from dbo.Members WHERE MemberID=${Number(MemberID)}`)

         let member=results.recordset[0]

         res.json({
            success:true,
            message:'fetched product successfully',
            results:member
         })
    }
    
}




module.exports = { 
    Home: (req, res)=> {
        res.send("Book Management API")
    },
    getAllBooks, getAllMembers, getMemberByID,getAllMembers, getMemberByID, getBookByID
}
   

