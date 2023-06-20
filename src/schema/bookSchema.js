const  joi =require('joi')
// .extend(require('@joi/date'));

const new_Book_Schema=joi.object({
       Title:joi.string()
                 .required(),
          Author:joi.string()
                    .required(),
           PublicationYear: joi.date()
                            .required(),    
                              
}) 


//  const borrow_Book_Schema=joi.object({
//        BookID:joi.number()
//               .required()
//  })
    module.exports={new_Book_Schema};