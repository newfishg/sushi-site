var CartItems = Backbone.Collection.extend({
  setTotal: function() {
    this.total = this.toJSON().reduce(function(sum, item) {
      return sum + item.price * item.quantity;
    }, 0);

    return this;
  },
  getTotal: function() { return this.total },
  setQuantity: function() {
    this.quantity = this.toJSON().reduce(function(sum, item) {
      return sum + item.quantity;
    }, 0);

    return this;
  },
  getQuantity: function() { return this.quantity },
  updateStorage: function() {
    localStorage.setItem('cart', JSON.stringify(this.toJSON()));
  },
  readStorage: function() {
    var storedCart = JSON.parse(localStorage.getItem('cart'));
    this.reset(storedCart);
    this.setTotal().setQuantity();
  },
  addItem: function(dish) {
    var item = this.findWhere({ id: dish.id }) || dish.clone();
    if (item.has('quantity')) {
      item.set('quantity', Number(item.get('quantity')) + 1);
    } else {
      item.set('quantity', 1);
      this.add(item);
    }

    this.update();
    this.trigger('cart_updated');
  },
  destroy: function(id) {
    this.remove(id);
    this.update();
    this.trigger('cart_updated');
  },
  update: function() {
    this.setTotal().setQuantity().updateStorage();
  },
  empty: function() {
    this.reset();
  },
  initialize: function() {
    this.readStorage();
    this.on('empty', this.empty);
    this.on('destroy', this.destroy);
  }
});