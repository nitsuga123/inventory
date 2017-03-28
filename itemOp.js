var pg = require('pg');
var Client = new pg.Client();


function EditarCantidad(cantidad){

  Client.connect(function(err){
     if(err) throw err;

     client.query("INSERT INTO inventario(amount) values($1)",[cantidad], function (err,result){
           if (err) throw err;


     });

  });

}
