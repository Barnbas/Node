var connection=require('../Database/dbconnection')
var jwt=require('jsonwebtoken')
var bcrypt=require('bcryptjs')

var joi = require('joi')

var check = joi.object({
    Username: joi.string().min(4).max(30).email().required(),
    Passwords: joi.string()
    .min(8)
    .max(20).required()

})

var postdata=(req,res)=>
{
    const  result = check.validate(req.body)

    if (result.error) {

         res.send(result.error.message)
    }

    let query="select * from login where Username='"+req.body.Username+"'"

//     jwt.sign({query},'secret',{expiresIn:'50s'},(err,data1)=>
// {
// res.json(data1);
// })
    connection.query(query,(err,result)=>
    {
        
        console.log(result.length);
       if(result.length)    
       {
        res.send("Data already Inserted")
       }
       
        else {
            bcrypt.hash(req.body.Passwords, 10, (err, hash) => {
            if (err) {
            return res.status(500).send({
            msg: err
            })
            }
            let query="insert into login(Username,Passwords) values('"+req.body.Username+"','"+hash+"')"
        
            connection.query(query,(err,result)=>{
                if(err){
                   res.send(err);
                }
                else{
                    res.send("Inserted Successfully")
                }
               }
            )
            
            })
            }
       
})
    }

    var Token= (req, res, next) => {
        connection.query(
          "SELECT * FROM login WHERE username = '"+req.body.Username+"'",
          (err, results) => {
                      if (err) {
               return res.status(400).send({
                msg: err,
              });
            }
            if (!results.length) {
              return res.status(401).send({
                msg: "Email or password is incorrect!",
              });
            }
             bcrypt.compare( req.body.Passwords,results[0]["Passwords"],(err, result) => {
               if (err) {
                  return res.status(401).send({
                    msg: "Email or password is incorrect!",
                  });
                }
                if (result) {
                    const user = {
                        Username: req.body.Username,
                        Passwords: req.body.Passwords,
                      };
                  const token = jwt.sign(user,"secretkey", { expiresIn: "60s" } );
                    return res.status(200).send({
                    msg: "Logged in!",token,
                  });
                }
                return res.status(401).send({
                  msg: "Username or password is incorrect!",
                });
              }
            );
          }
        );
      };

    module.exports={postdata,Token}

// var Token = (req,res) => {

    
//     connection.query("select * from login where Username  ='"+ req.body.Username +"'&& Passwords='"+ req.body.Passwords +"'", (err, result)=>

//     {
//         const data={
                
//             Username:req.body.Username,
//             Passwords:req.body.Passwords
//          }
//         if(result.length ) {
         
//             jwt.sign(data, 'secretkey', { expiresIn: '50s' } ,(error,token)=>
//             {
//                 res.send({
//                     token}
//                 )
//             });
//             }
//             else {
//                 res.send("Please provide valid user details");
//             };
//     })
    
//     }





// var check = joi.object({
//     Username: joi.string().min(4).max(10).email().required(),
//     Passwords: joi.string()
//     .min(8)
//     .max(20).required()

// })

// // var get = (req, res) => {
// //     let query1 = "Select * from login";
// //     connection.query(query1, (err, result) => {
// //         if (err) {
// //             console.log("failed")
// //         }
// //         else {
// //             res.send(result)
// //         }
// //     })
// // }

// var postdata=(req,res)=>{
//     const  result = check.validate(req.body)

//     if (result.error) {

//          res.send(result.error.message)
//     }

//     let query="insert into login (Username,Passwords) values('"+req.body.Username+"','"+req.body.Passwords+"')"
  
//     let query1 = "Select * from login";
//     connection.query(query1, (err, result) => {
//         if (err) {
//             console.log("failed")
//         }
//         else {
//             res.send(result)
//         }
//     })
   
//     // for (let i = 0; i < result.length; i++) {
//     //   var b=  check.find(req.body.Username)
//      if(req.body.Username!=b){
        
//     connection.query(query,(err,result)=>{
//         if(err){
//            res.send(err.message);
//         }
//         else{
//             res.send("Created Successfully")
//         }
//     })}
//    else{
//     res.send("not matched")
//    } 


// }





// const postdata={
//     insert:(req,res)=>{
// let query="insert into login (Username,Passwords) values('"+req.body.Username+"','"+req.body.Passwords+"')"


// check.find({Username:req.body.Username})
// .then(res=>{ 
//     if(res.length!=0){
//         return res.json({
//             data:[],
//             success:false,
//             msg:"exist"

//         })
//     }
//     else{
//         check.create(query)
//         return res.json({
//             data:[],
//             success:false,
//             msg:"Succcess"
//         })
//     }
// })
// .catch(err=>{
//     return res.json({
//         data:[],
//         success:false,
//         msg:"err"
//     })
// })
// }
// }

// module.exports= {postdata};