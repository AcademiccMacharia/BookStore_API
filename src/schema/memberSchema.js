const joi =require ('joi');


const new_Member_Schema=joi.object({
    Name: joi.string()
            .min(3)
            .required(),
  Address:joi.string()
             .required()
             .min(5)
             .max(30),
ContactNumber:joi.string()
               .required()
               .max(16)
               .min(16),  
  password: joi.string()
            .required()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))  ,
 confirm_password:joi.ref('password')            
}).with('password','confirm_password')
module.exports={new_Member_Schema}