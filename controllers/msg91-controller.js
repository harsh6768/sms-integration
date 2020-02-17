let db=require('../modules/database/mysqlDb');

let getMsg91Keys=(req,res)=>{

    return new Promise(async(resolve,reject)=>{

       let query=`select auth_key,sender_id from msg91_keys`;

       db.queryAsync(query)
       .then(result=>resolve(result))
       .catch(err=>reject(err));

    })

}

let sendOtpByMSG91=(req,res)=>{

    return new Promise(async(resolve,reject)=>{

        const {to_number}=req.body;

        let msg91Keys=await getMsg91Keys();

        console.log(msg91Keys);

        if(msg91Keys && msg91Keys.length>0){
            
            let msg91Data={
                auth_key: msg91Keys[0].auth_key,
                sender_id: msg91Keys[0].sender_id
            }
            let SendOtp=require('sendotp');
            //msg91 auth key
            let sendOtp=new SendOtp(msg91Data.auth_key); 
            let otp='1234'
            //send Otp
            sendOtp.send(to_number,msg91Data.sender_id,otp,(err,data)=>{
                if(err){
                    reject(res.send({
                        "status":500,
                        "message":err.message
                    }))
                }
                resolve(res.send({
                    "status":200,
                    "message":"Otp sent successfully!",
                    "data":data
                }))
            });
        }
    })
}
let retrySendOtpByMsg91=(req,res)=>{

    return new Promise(async(resolve,reject)=>{


        let msg91Keys=await getMsg91Keys();

        console.log(msg91Keys);

        if(msg91Keys && msg91Keys.length>0){
            
            let msg91Data={
                auth_key: msg91Keys[0].auth_key,
            }
            let SendOtp=require('sendotp');
            //msg91 auth key
            let sendOtp=new SendOtp(msg91Data.auth_key); 
            

            //In sendOtp.retry() set retryVoice false if you want to retry otp via text,
            //default value is true
            sendOtp.retry(to_number,false,(err,data)=>{
                if(err){
                    reject(res.send({
                        "status":500,
                        "message":err.message
                    }))
                }
                resolve(res.send({
                    "status":200,
                    "message":"Otp sent successfully!",
                    "data":data
                }))
            });
        }

    })
}

let verifyOtpByMsg91=(req,res)=>{

    
    return new Promise(async(resolve,reject)=>{

        const {otp}=req.body;
        
        let msg91Keys=await getMsg91Keys();

        console.log(msg91Keys);

        if(msg91Keys && msg91Keys.length>0){
            
            let msg91Data={
                auth_key: msg91Keys[0].auth_key,
            }
            let SendOtp=require('sendotp');
            //msg91 auth key
            let sendOtp=new SendOtp(msg91Data.auth_key); 
            //send Otp
            sendOtp.verify(to_number,otp,(err,data)=>{
                
                console.log(data);
                
                if(err){
                    reject(res.send({
                        "status":500,
                        "message":err.message
                    }))
                }else if(data.type=='success'){
                    resolve(res.send({
                        "status":200,
                        "message":"Otp verified successfully!",
                        "data":data
                    }))
                }else if(data.type=='error'){
                    resolve(res.send({
                        "status":200,
                        "message":"Otp verification failed",
                        "data":data
                    }))
                }
                
            });
        }

    })

}

// let sendEmailByMsg91=(req,res)=>{

//     return new Promise(async(resolve,reject)=>{

//         const {email}=req.body;



//     })
// }
module.exports={

    getMsg91Keys,
    sendOtpByMSG91,
    retrySendOtpByMsg91,
    verifyOtpByMsg91

}