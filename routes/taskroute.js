var db=require('../Model/Task')

var express = require('express');
var router = express.Router();


router.post('/insert', (req,res)=>
{
    db.postdata(req,res,function(postdata)
    {
    
    })
})

router.post('/token', (req,res)=>
{
    db.Token(req,res,function(Token)
    {
    
    })
})

// router.post('/token',(req,res)=>
// {
//     db.Token(req,res,function(Token)
//     {

//     })
// })
module.exports = router;