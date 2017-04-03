var express = require('express');
var router = express.Router();
var dataBaseModule = require('./pg-test_module_pool.js');
/* GET users listing. */
router.get('/:userId', function(req, res, next) {
  var userid = req.params.userId;
  var queryresult='';
  query = 'SELECT "user_name", "gold" FROM "users" WHERE "user_id" IN ({0});';
  query = query.replace('{0}',userid);

   try {
     dataBaseModule.execute(query,function(result){
        queryresult = JSON.stringify(result);
        res.send(queryresult);
     });
   } catch (e) {

   }
});

module.exports = router;
