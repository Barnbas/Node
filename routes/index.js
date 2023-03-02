var express = require('express');
var router = express.Router();
var http1=require('../Model/createserver')
/* GET home page. */
router.get('/insert', function(req, res) 
{
    http1.data(req,res,()=>
    {

    }) 
});

module.exports = router;
