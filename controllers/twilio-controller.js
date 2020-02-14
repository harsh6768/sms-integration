const db=require('../modules/database/mysqlDb');

let getTwilioKeys=(req,res)=>{
     
    return new Promise(async(resolve,reject)=>{

        let query=`select account_sid,auth_token,from_number from twilio_keys`;

        db.queryAsync(query)
        .then(result=>resolve(result))
        .catch(err=>reject(err))
    });
    
}

let sendSmsByTwilio=async(req,res)=>{

    return new Promise(async(resolve,reject)=>{
        const {to_number}=req.body;

        console.log(to_number);
    
        let twilioKeys=await getTwilioKeys();
        
        console.log(twilioKeys);

        if(twilioKeys && twilioKeys.length>0){
       
             let twilioData={
                 account_sid:twilioKeys[0].account_sid,
                 auth_token: twilioKeys[0].auth_token,
                 from_number: twilioKeys[0].from_number,
             }
    
             console.log(twilioData);
             //twilio client
             let twilioClient=require('twilio')(twilioData.account_sid,twilioData.auth_token);
             let otp='0000';
    
             //send sms
             twilioClient.messages.create({

                from: twilioData.from_number,
                to: to_number,
                body: `Your one time otp is ${otp} `
                 
             })
             .then(messages=>{
    
                console.log(messages);
                resolve(res.send({
                    "status":200,
                    "message":"Sms sent successfully!",
                    "data":messages
                }))

             })
             .catch(err=>{
                reject(res.send({
                    "status":500,
                    "message":err.message
                }))
             });
        }else{

            reject(res.send({
                "status":500,
                "message":"Failed to fetch twilio details ",
            }))
        }

    })
    
}

module.exports={
    getTwilioKeys,
    sendSmsByTwilio
}