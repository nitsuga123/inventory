var express = require('express');
var router = express.Router();
var dataBaseModule = require('./pg-test_module_pool.js');
/* GET home page. */
router.get('/:userId', function(req, res, next) {
  var userid = req.params.userId;
  var queryresult='';
  query = 'SELECT "gold" FROM "users" WHERE "user_id" IN ({0});';
  query = query.replace('{0}',userid);

   try {
     dataBaseModule.execute(query,function(result){
        queryresult = JSON.stringify(result);
        console.log(JSON.stringify(result));

        var responseConsole = 'El usuario {0} tiene {1}  de oro';
        responseConsole = responseConsole.replace('{0}', userid);
        responseConsole = responseConsole.replace('{1}', result[0].gold);
        res.send(responseConsole);
     });
   } catch (e) {

   }
});


router.post('/:userId',function(req, res, next){
  var userid = req.params.userId;
  var itemid=req.body.item_id;
  var oro='';
  var costo='';
  var amount='';
  var orofinal='';
  query = 'SELECT "gold" FROM "users" WHERE "user_id" IN ({0});';
  query = query.replace('{0}',userid);

   try {
     dataBaseModule.execute(query,function(result){
        oro = result[0].gold;
        query= 'SELECT "cost" FROM "items" WHERE "item_id" IN ({0});';
        query = query.replace('{0}',itemid);
        try {
          dataBaseModule.execute(query,function(result){
             costo = result[0].cost;
             if(oro >= costo){
                query = 'SELECT "amount" FROM "inventory" WHERE "user_id" IN ({0}) AND "item_id" IN ({1});';
                query = query.replace('{0}',userid);
                query = query.replace('{1}',itemid);
                    try {
                      dataBaseModule.execute(query,function(result){
                         amount = result[0].amount;
                         amount=JSON.stringify(amount+1);
                               query = 'UPDATE inventory SET amount = {0} WHERE user_id IN ({1}) AND item_id IN ({2});';
                               query = query.replace('{0}',amount);
                               query = query.replace('{1}',userid);
                               query = query.replace('{2}',itemid);
                                     try {
                                       dataBaseModule.execute(query,function(result){
                                           query = 'UPDATE users SET gold = {0} WHERE user_id IN ({1});';
                                           orofinal = oro - costo;
                                           query = query.replace('{0}',orofinal);
                                           query = query.replace('{1}',userid);
                                                 try {
                                                   dataBaseModule.execute(query,function(result){
                                                   });
                                                }catch (e) {

                                                }
                                       });
                                      }catch (e) {

                                      }
                      });
                     }catch (e) {

                     }

                res.send('se compro exitosamente el item');
               }else{
                res.send('no tiene suficiente oro para comprar el item');
               }
          });
        } catch (e) {

        }
     });


   } catch (e) {

   }

   });


module.exports = router;
