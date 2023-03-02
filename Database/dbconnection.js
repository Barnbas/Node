const mysql=require('mysql')

const connection=mysql.createConnection(
{
    host:"172.17.15.100",
    user:"itguser10",
    password:"miracle@10",
    database:"babi"
})
connection.connect((err,res)=>
{

    if(err){
        console.log("failed")
    }
    else{
        console.log("succefully connected")
    }
})

module.exports=connection;