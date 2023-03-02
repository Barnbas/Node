

var express=require('express')
var jwt=require('jsonwebtoken')
const app=express()

app.get('/api',(req,res)=>
{
res.json({
    message:"welcome to the API"
})
})

app.post('/api/post', verifyToken, (req,res)=>
{
   jwt.verify(req.token, 'secretkey', (err, authData)=>
   {
    if(err)
    {
        res.sendStatus(403)
    }
    else{
        res.json({
            message:'post created',
            authData
        })
    }
   })

    
})

app.post('/api/login',(req,res)=>
{
     //mock user
     const user={
        id:1,
        username:"Barnbas",
        email:"B@gmail.com"
     }

    jwt.sign({user}, 'secretkey', { expiresIn: '50s' } ,(err,token)=>
    {
        res.json({
            token
        })
    });
})


//verifyToken

function verifyToken(req,res,next)
{
    const bearerHeader=req.headers['authorization']

    if(typeof bearerHeader!=='undefined')
    {
const bearer = bearerHeader.split(' ')

const bearerToken = bearer[1];

req.token=bearerToken;

next();

    }
    else{
        res.sendStatus(403)
    }
}
app.listen(3003,(req,res)=>
{
    console.log("Running")
})
