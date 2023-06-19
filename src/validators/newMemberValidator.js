const {new_Member_Schema}= require('../schema/memberSchema')


function newMemberValidator(body) {
    
    let member= new_Member_Schema.validate(body,{abortEarly:false})
    if(member.error?.details.length){
        let message=member.error.details.map(err=>err.message)
    
     throw new Error(message.join("\n"))
    }else{
       return member 
    }
   
    
   
}



module.exports={newMemberValidator}