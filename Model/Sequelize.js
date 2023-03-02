// const {Sequelize , DataTypes} = require('sequelize')
// const sequelize= new Sequelize(
//     'babi',
//  'itguser10',
//  'miracle@10',
//   {
//     host: '172.17.15.100',
//     dialect: 'mysql'
//   }
// )
// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
//  }).catch((error) => {
//     console.error('Unable to connect to the database: ', error);
//  });

//  const Book = sequelize.define("Empdata", {
//     id: {
//       type: DataTypes.INTEGER,
//      primaryKey:true
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     phno: {
//       type: DataTypes.INTEGER
//     },
//     address: {
//       type: DataTypes.STRING,
//     }
//  });

//  sequelize.sync().then(() => {
//     console.log('Empdata table created successfully!');
//  }).catch((error) => {
//     console.error('Unable to create table : ', error);
//  });

//  Book.create({
//     id: 5 ,
//     name: " chinna ",
//     phno: "63256",
//     address: "palli"
// }).then(res => {
//     console.log(res)
// }).catch((error) => {
//     console.error('Failed to create a new record : ', error);
// });


// Book.findAll().then(res => {
//     console.log(res)
// }).catch((error) => {
//     console.error('Failed to retrieve data : ', error);
// });


// Book.destroy({
//     where: {
//       id: 1
//     }
// }).then(() => {
//     console.log("Successfully deleted record.")
// }).catch((error) => {
//     console.error('Failed to delete record : ', error);
// });




const Sequelize = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');
const async = require('hbs/lib/async');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb', parameterLimit: 1000000 }));

var sequelize = new Sequelize('babi', 'itguser10', 'miracle@10',{
    host: '172.17.15.100',
    dialect:'mysql' 
});

const users = sequelize.define('Empdata', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    name: Sequelize.STRING,
    phno: Sequelize.STRING,
    address: Sequelize.STRING
});
 
sequelize.sync().then(() => {
    console.log('Empdata table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 sequelize.sync({force:true}).then(async()=>
 {
    for(let i=1;i<=10;i++)
    {
        const user={
            id:`user${i}`
        }
        await users.findAll(user) 
    }

})

app.post('/insert', async function (request, response) {
    return await users.create({
        id: request.body.id,
        name: request.body.name,
        phno: request.body.phno,
        address: request.body.address
    }).then(function (users) {
        if (users) {
            response.send(users);
        } else {
            // console.log(error);
            response.status(400).send('Error in insert new record');
        }
    });
});
app.get('/get',async function (request, response) {
    return await users.findAll({
    }).then(function (users) {
        if (users) {
            response.send(users);
        } else {
            response.status(400).send('Error in insert new record');
        }
    });
});
app.get('/getdata',async function (request, response) {
    var page=request.Sequelize;
    var size=request.Sequelize
    return await users.findAll({
        offset:size,
        limit:page * size
    }).then(function (users) {
        if (users) {
            response.send(users);
        } else {
            response.status(400).send('Error in insert new record');
        }
    });
});
app.put('/update', async function (request, response) {
    return await users.update({
        id: request.body.id,
        name: request.body.name,
        phno: request.body.phno,
        address: request.body.address
    },
    {
        where:{id:request.body.id}
    }).then(function (users) {
        if  (users) {
            response.send(users);
        } else {
        
            response.status(400).send('Error in insert new record');
        }
    });
});
app.delete('/delete',async function (request, response) {
    return await users.destroy({
     where:{id:request.body.id}
    }).then(() => {
       response.send("deleted")
     }).catch((error) => {
        console.error('Unable to create table : ', error);
     });
 
})
app.listen(3001, function () {
    console.log('Express server is listening on port 3001');
});

