var dao = require ('./model.js')

var query = "SELECT first_name from actor WHERE first_name LIKE 'S%'";
try {
  dao.execute (query, function (result) {
    console.log (JSON.stringify(result));
  });
} catch (err) {
  console.error (err);
}
console.log ("OK");

----------------
var pg = require('pg');

var config = {
  user: 'halzate93', //env var: PGUSER
  database: 'dvd', //env var: PGDATABASE
  password: 'postgres', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432 //env var: PGPORT
};

function execute (query, onCompleted) {
  var client = new pg.Client(config);
  client.connect(function (err) {
    if (err) throw err;

    client.query(query, function (err, result) {
      if (err) throw err;

      onCompleted (result);

      client.end(function (err) {
        if (err) throw err;
      });
    });
  });
}

module.exports.execute = execute;
