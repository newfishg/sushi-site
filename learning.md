Backbone.Router.extend({
  //:id will match the params between 
  routes: {
    'menu/:id': 'displayMenuItem',
    'checkout': 'displayCheckout',
  },
  displayMenuItem: function(id) {
    // we can use variable id here
  } 
});
