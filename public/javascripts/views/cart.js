var CartView = Backbone.View.extend({
  el: '#cart',
  events: {
    'click a.destroy': 'destroy',
    'click a.empty-cart': 'emptyCollection'
  },
  emptyCollection: function(e) {
    e.preventDefault();
    this.collection.trigger('empty');
    this.render();
  },
  destroy: function(e) {
    e.preventDefault();
    var id = +$(e.target).parent('li').attr('data-id');
    this.collection.trigger('destroy', id);
    this.render();
  },
  template: App.templates.cart,
  render: function() {
    this.$el.html(this.template({
      quantity: this.collection.getQuantity(),
      dishes: this.collection.toJSON(),
      total: this.collection.getTotal()
    }));

    if (this.collection.length === 0) {
      this.$el.hide(300);
    } else {
      this.$el.show();
    }
    this.topCountRender();
  },
  topCountRender: function() {
    $('span.count').text(App.cart.length + ' items');
  },

  initialize: function() {
    this.listenTo(this.collection, 'cart_updated', this.render)
  }
});