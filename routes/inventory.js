var express = require('express');
var router = express.Router();
var dataBaseModule = require('./pg-test_module_pool.js');
var bodyparser = require ('body-parser');
/* GET users listing. */

var query = '';
router.get('/:userId', function(req, res, next) {
  var userid = req.params.userId;
  var queryresult='';
  query = 'SELECT user_id, inventory.item_id, inventory.amount FROM user INNER JOIN inventory ON inventory.user_id = user_id WHERE user_id IN ({0});';
  query = query.replace('{0}',userid);

   try {
     dataBaseModule.execute(query,function(result){
        queryresult = JSON.stringify(result);
        console.log(JSON.stringify(result));

        res.send(result);
     });
   } catch (e) {

   }

});

router.post('/:userId',function(req, res, next){
  var userid = req.params.userId;
  var queryresult='';
  //body
  var itemid=req.body.item_id;
  var amount =req.body.amount;
  query = 'UPDATE inventory SET amount = {0} WHERE user_id IN ({1}) AND item_id IN ({2});';
  query = query.replace('{0}',amount);
  query = query.replace('{1}',userid);
  query = query.replace('{2}',itemid);

  try {
       dataBaseModule.execute(query,function(result){
        res.send('se ha actualizado el inventorio');
    });
  } catch (e) {

  }
});

module.exports = router;
