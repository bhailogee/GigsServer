/**
 * Created by Waseem on 11/17/2016.
 */
var express = require('express');
var router = express.Router();
var mysql = require('./mysqlService');



router.post('*',function(req,res,next){

  debugger;
  console.log('post');
  console.log('URL =>'+req.originalUrl);
  console.log('METHOD =>'+req.method);
  console.log('QUERY =>'+JSON.stringify(req.query));
  console.log('PARAMS =>'+JSON.stringify(req.params));



  var sqlInsertUpdate = "INSERT INTO " + req.tableName + " (" + req.bodykeys.toString() + ")" +
    "VALUES (" + '\'' + req.bodyvalues.join('\',\'') + '\'' + ") " +
    "ON DUPLICATE KEY UPDATE ";

  for(var ii=0;ii<req.bodykeys.length;ii++)
  {
    sqlInsertUpdate += req.bodykeys[ii]+ "= VALUES(" + req.bodykeys[ii] + "),";
  }
  /*sqlInsertUpdate=sqlInsertUpdate.replace(',_id', '');*/
  sqlInsertUpdate=sqlInsertUpdate.replace('_id= VALUES(_id),', '').replace(/,\s*$/, "");
    /*
    req.bodykeys.reduce(function (acc, ele, ind) {
      return ele + "= VALUES(" + ele + ")," + acc;
    }).replace(',_id', '');*/

  mysql.query(sqlInsertUpdate).then(function(data){
    res.send(data.rows);
  });
});

router.get('*',function(req,res,next){

  debugger;
  console.log('get');
  console.log('URL =>'+req.originalUrl);
  console.log('METHOD =>'+req.method);
  console.log('QUERY =>'+JSON.stringify(req.query));
  console.log('PARAMS =>'+JSON.stringify(req.params));


  var sqlSelect = "SELECT * from " + req.tableName;

  var whereClause ="";

  for(var ii=0;ii<req.bodykeys.length;ii++)
  {
    whereClause += req.bodykeys[ii]+ " = '"+req.bodyvalues[ii]+ '\' and ';
  }
  if(whereClause.length>0) {
    sqlSelect = sqlSelect + " Where " + whereClause;
  }


  sqlSelect=sqlSelect.replace(/and\s*$/, "");

  /*  req.bodykeys.reduce(function (acc, key, ind) {
      debugger;
      return key + "= '" + req.bodyvalues[ind] + '\','
    }).replace(/,\s*$/, "");*/

  mysql.query(sqlSelect).then(function(data){
    res.send(data.rows);
  });
});

router.patch('*',function(req,res,next){

  debugger;
  console.log('patch');
  console.log('URL =>'+req.originalUrl);
  console.log('METHOD =>'+req.method);
  console.log('QUERY =>'+JSON.stringify(req.query));
  console.log('PARAMS =>'+JSON.stringify(req.params));


  var sqlInsertUpdate = "INSERT INTO " + req.tableName + " (" + req.bodykeys.toString() + ")" +
    "VALUES (" + '\'' + req.bodyvalues.join('\',\'') + '\'' + ") " +
    "ON DUPLICATE KEY UPDATE ";

  for(var ii=0;ii<req.bodykeys.length;ii++)
  {
    sqlInsertUpdate += req.bodykeys[ii]+ "= VALUES(" + req.bodykeys[ii] + "),";
  }
  sqlInsertUpdate=sqlInsertUpdate.replace('_id= VALUES(_id),', '').replace(/,\s*$/, "");
   /* req.bodykeys.reduce(function (acc, ele, ind) {
      return ele + "= VALUES(" + ele + ")," + acc;
    }).replace(',_id', '');*/

  mysql.query(sqlInsertUpdate).then(function(data){
    res.send(data.rows);
  });
});

router.delete('*',function(req,res,next){

  debugger;
  console.log('delete');
  console.log('URL =>'+req.originalUrl);
  console.log('METHOD =>'+req.method);
  console.log('QUERY =>'+JSON.stringify(req.query));
  console.log('PARAMS =>'+JSON.stringify(req.params));


  var sqlDelete = "DELETE from " + req.tableName + " Where ";

  for(var ii=0;ii<req.bodykeys.length;ii++)
  {
    sqlDelete += req.bodykeys[ii]+ " = '"+req.bodyvalues[ii]+ '\',';
  }
  sqlDelete=sqlDelete.replace(/,\s*$/, "");

   /* req.bodykeys.reduce(function (acc, key, ind) {
      return key + "= '" + req.bodyvalues[ind] + '\','
    }).replace(/,\s*$/, "");*/
  mysql.query(sqlDelete).then(function(data){
    res.send(data.rows);
  });
});


module.exports = router;
