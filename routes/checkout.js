var path = require('path');
var Menu = require(path.resolve(path.dirname(__dirname), 'modules/menu.js'));


/* GET checkout page. */
module.exports = function(router) {
  router.get('/checkout', function(req, res, next) {
    res.render('checkout', {
      dishes: Menu.get()
    });
  });
};
