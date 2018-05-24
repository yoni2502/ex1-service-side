const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const Book = require('./mongo/Book.js');

function startService(){
  app.use(express.static("."));

  app.get("/", (req,res) => {
    res.redirect('/api');
  });

  app.get("/api", (req,res) => {
    res.sendFile(path.join(__dirname + '/API/index.html'));
  });

  app.get('/getAllBooks', (req,res) => {
    Book.find()
      .then(function(doc){
        res.json(doc);
      });
  });

  app.post('/getBookByID/:id', (req,res) => {
    let _id = req.params.id;
    Book.find({_id})
      .then(function(doc){
        if(doc.length){
          res.json(doc);
        } else {
          res.json({
            status: "failed",
            error: "id not found"
          })
        }
      });
  });

  app.get('/getBookByLang/:lang', (req,res) => {
    let lang = (req.params.lang).toLowerCase();
    Book.find({
      'trans.lang': lang
    })
      .then(function(doc){
          res.json(doc);
      });
  });

  app.get('/getBookByLangAndMaximumPages/:lang/:pages', (req,res) => {
    let lang = (req.params.lang).toLowerCase();
    let pages = req.params.pages;
    //only books which has translation to lang and also has maximum pages
    Book.find({
      pages : {$lte : pages},
      'trans.lang': lang
    })
      .then(function(doc){
          res.json(doc);
      });
  });

  http.createServer(app).listen(process.env.PORT || 3000);
  console.log("listening on localhost:3000");
}

module.exports = {
  startService
}
