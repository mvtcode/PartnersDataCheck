'use strict';
const logger = require('tracer').colorConsole();
let express = require('express');
let router = express.Router();
let Comments = require('../models/Comments');

let selectLastList = (cb) => {
  Comments.find({})
  .sort({created_at: -1})
  .limit(20)
  .select('comment')
  .exec((err, list)=>{
    cb(err, list);
  });
};

router.get('/', function(req, res, next) {
  selectLastList((err, list)=>{
    res.render('index', { title: 'Partners Data Check', list: list || [] });
  });
});

router.post('/', function(req, res, next) {
  let txt = req.body.txt.replace(/\</g,'&lt;').replace(/\>/g,'&gt;');
  let comments = new Comments({
    comment: txt
  });
  comments.save((err, reply)=>{
    if(err){
      res.status(500).json({error: 1000, message: 'save db error'});
      logger.error(err);
    }
    else{
      selectLastList((err, list)=>{
        res.json({
          error: 0,
          message: 'done',
          list: list
        });
      });
    }
  });
});

router.post('/search', function(req, res, next) {
  let key = req.body.key.replace(/\</g,'&lt;').replace(/\>/g,'&gt;');
  res.json({
    key: key,
    error: 0,
    message: 'done',
    list: []
  });
});

module.exports = router;
