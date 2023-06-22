const  joi =require('joi')

const new_Book_Schema=joi.object({
       Title:joi.string()
                 .required(),
          Author:joi.string()
                    .required(),
           PublicationYear: joi.date()
                            .required(),    
                              
}) 

    module.exports={new_Book_Schema};