var path = require('path');
var Menu = require(path.resolve(path.dirname(__dirname), 'modules/menu.js'));


/* GET home page. */
module.exports = function(router) {
  router.route('/checkout').post(function(req, res) {
    var order = req.body;
    Menu.order(order);
    res.json(order);
  });
  router.get('/', function(req, res, next) {
    res.render('index', {
      dishes: Menu.get()
    });
  });
};
