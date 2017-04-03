var express = require('express');
var app = express();
var queryHandler = require('./pg-test_module_pool.js');

//Properties
var id = 1;
var idch = 8;
var statToIncrease = 'health_points';

var port = 8080;
query = 'SELECT player_id, character_id FROM playercharacter WHERE player_id IN (1) AND character_id IN (9)';
query = query.replace('{0}', statToIncrease);
query = query.replace('{1}', id.toString());
query = query.replace('{2}', idch.toString());

//Server
app.get('/', function(request, response){
  var responseResult;

  try {
    queryHandler.execute (query, function (result) {
      responseResult = JSON.stringify(result);
      if(result.lenght == undefined){
        console.log('depx1');
      }
      else {
        console.log('depx2');
      }
    });

  } catch (error) {
    console.error (error);
  }

  response.send(responseResult);
});

//Start listen
app.listen (port, function() {
  console.log('App start listen!');
});
