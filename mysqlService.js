/**
 * Created by Waseem on 11/17/2016.
 */
var mysql = require('mysql');
var Q=require('q');
var pool  = mysql.createPool({
  connectionLimit : 100,
  host            : '192.168.0.21',
  user            : 'root',
  password        : '27940001',
  database        : 'gigapp',
  port:3306
});

var service ={
  query:function(query,params) {

    if (params)
      query = mysql.format(query, params);
    var deferred = Q.defer();
    pool.query(query, function (err, rows, fields) {
      console.log("Query : "+query);
      if (err){
        deferred.reject(err);
        console.log("Error : "+err.message);
        return;
      }

      console.log("Result"+ rows.length);
      deferred.resolve({query: query, rows: rows, fields: fields, params: params});
    });

    return deferred.promise;
  }
};


module.exports = service;