const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoURI = require('./config').mongoURI;

const Query = require('./models/Query');
var cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(mongoURI)
.then(()=>{
    console.log('connected to database');
})
.catch((err)=>console.log(err));
app.options('/', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
app.get('/', (req, res)=>{
    res.json({status: 'successful'})
});
app.post('/', (req, res)=>{
    Query.create( req.body )
    .then(query => {
        res.json({
            status: 'successful',
            query
        });
    })
    .catch(err => {
        res.json({
            status: 'unsuccessful'
        })
    })
})

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server running at port ${port}`);
})