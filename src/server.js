const bodyParser = require('body-parser');
const express = require('express');

const mongoose = require('mongoose');
const Post = require('./post');

const STATUS_USER_ERROR = 422;

const server = express();
// to enable parsing of json bodies for post requests

server.use(bodyParser.json());

// TODO: write your route handlers here
server.get('/accepted-answer/:soID', (req, res) => {
   Post.findOne({ soID: req.params.soID })
   .exec((err, post) => {
     if (err) {
       res.status(STATUS_USER_ERROR);
       res.json({ 'No accepted post': err });
       return;
     }
     Post.findOne({ soID: post.acceptedAnswerID })
     .exec((error, p) => {
       if (error || post.acceptedAnswerID === null) {
         res.status(STATUS_USER_ERROR);
         res.json('No accepted answer');
         return;
       }
       res.json(p);
     });
   });
 });

module.exports = { server };
