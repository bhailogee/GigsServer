/**
 * Created by Waseem on 11/19/2016.
 */
var express = require('express');
var router = express.Router();


router.all('*',function(req,res,next){

  res.send("Hello World");
});
module.exports = router;
