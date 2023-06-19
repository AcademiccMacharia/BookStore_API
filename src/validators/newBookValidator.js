const {new_Book_Schema} =require('../schema/bookSchema')


function newBookValidator(body) {
    let book=new_Book_Schema.validate(body,{abortEarly: false})
    if (book.error?.details.length){
        let message=book.error.details.map(err=>err.message)

        throw new Error(message.join("\n"))
    }else{
        return book
    }
    
}

module.exports={newBookValidator}