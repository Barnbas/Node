var connection = require('../Database/dbconnection')
var joi = require('joi')

var check = joi.object({
    Firstname: joi.string().min(4).max(10).message("please enter valid fname").required(),
    Lastname: joi.string().min(4).max(10).required(),
    Phno: joi.number().integer().min(10).required(),
    Email: joi.string().email().min(4).max(10).required()
})



var get = (req, res) => {
    let query1 = "Select * from Employe";
    connection.query(query1, (err, result) => {
        if (err) {
            console.log("failed")
        }
        else {
            res.send(result)
        }
    })
}

var post = (req, res) => {
    const  result = check.validate(req.body)

    if (result.error) {

         res.send(result.error.message)
    }

    let query = "insert into Employe(Firstname,Lastname,Phno,Email) values('" + req.body.Firstname + "','" + req.body.Lastname + "','" + req.body.Phno + "','" + req.body.Email + "')"
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send("inserted")
        }
    })
}

var put = (req, res) => {
    let query2 = "update Employe set Lastname='" + req.body.Lastname + "',Phno='" + req.body.Phno + "',Email='" + req.body.Email + "' where Firstname='" + req.body.Firstname + "'"
    connection.query(query2, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {                                          
            res.send("Updated")
        }
    })
}

var del = (req, res) => {
    let query = "delete from Employe where Firstname='" + req.body.Firstname + "'"
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send("Deleted")
        }
    })
}

module.exports = { get, post, put, del };

