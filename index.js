

var   express = require("express");
var   app = express();
require('./utils');

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
var sqlRouter=require('./sqlRouter');

app.all("*",function(req,res,next){
  debugger;
  console.log('URL =>'+req.originalUrl);
  console.log('METHOD =>'+req.method);
  console.log('QUERY =>'+JSON.stringify(req.query));
  console.log('PARAMS =>'+JSON.stringify(req.params));
  console.log('======================================');



  var requestParams = {};
  if(req.body.doc && req.body.base)
  {
    requestParams.extend(req.body.doc);
  }else {
    requestParams.extend(req.body);
  }

  if(req.query.selector)
    requestParams.extend(JSON.parse( req.query.selector));

  var __keys = Object.keys(requestParams);

  for(var ii=0;ii<__keys.length;ii++)
  {
    if(__keys[ii].indexOf('__')==0)
    {
      delete requestParams[__keys[ii]];
    }
  }
  //requestParams.extend(req.query);
  //requestParams.extend(req.params);
  debugger;
  req.bodykeys = Object.keys(requestParams).reverse();
  req.bodyvalues =  req.bodykeys.map(function(key) {
    return requestParams[key];
  });
  req.tableName = req.originalUrl.substring(req.originalUrl.indexOf('?') || req.originalUrl.length-1,5);
  next();
});

app.use("/api", sqlRouter);




app.listen(3000,function(){
  console.log('Application listning on server');
});