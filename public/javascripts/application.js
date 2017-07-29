var App = {
  templates: JST,

  indexView: function() {
    this.renderMenu();
    this.cartView.render();
    window.scrollTo(0, 0);
  },
  renderMenu: function() {
    this.menuView = new DishesView({
      collection: this.items
    });

    this.$content = $('#content');
    this.$content.html(this.menuView.el);
  },
  bindEvent: function() {
    _.extend(this, Backbone.Events);
    this.on('add_to_cart', this.cart.addItem.bind(this.cart));
  },
  createCart: function() {
    this.cart = new CartItems();
    this.cartView = new CartView({
      collection: this.cart
    });
  },
  renderItemDetail: function(id) {
    var item = this.items.get(id);
    this.detailView = new ItemDetailView({
      model: item
    });
    this.detailView.render();
    this.cartView.render();
  },
  renderCheckout: function() {
    this.checkoutView = new CheckoutView({
      collection: this.cart
    });
  },
  init: function(dishes) {
    this.items = new Dishes(dishes);
    this.indexPage = new IndexView();
    this.createCart();
    this.bindEvent();
  }
};


Handlebars.registerHelper('format_price', function(price) {
  return (+price).toFixed(2);
});

Handlebars.registerHelper('capitalize', function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
});

Handlebars.registerHelper('prevID', function(id) {
  var id = Number(id);
  var length = App.items.length;
  if (id === 1) {
    return length;
  } else {
    return id - 1;
  }
});

Handlebars.registerHelper('nextID', function(id) {
  var id = Number(id);
  var length = App.items.length;
  if (id === length) {
    return 1;
  } else {
    return id + 1;
  }
});