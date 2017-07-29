var CheckoutView = Backbone.View.extend({
  attributes: {
    id: 'checkout'
  },
  events: {
    'click i.fa': 'quantityModifier',
    'click a.cancel-order': 'emptyCart',
    submit: 'orderMenu'
  },
  template: App.templates.checkout,
  orderTransform: function() {
    var result = {};
    for (var i = 0; i < this.collection.length; i++) {
      result[this.collection.toJSON()[i].name] = this.collection.toJSON()[i].quantity;
    }
    return result;
  },
  orderMenu: function(e) {
    e.preventDefault();
    var $f = this.$('form');

    $.ajax({
      url: $f.attr('action'),
      type: $f.attr('method'),
      data: this.orderTransform(),
      success: function(json) {
        App.cart.reset();
        router.navigate('/', { trigger: true });
      }
    })
  },
  emptyCart: function() {
    App.cart.reset();
  },
  quantityModifier: function(e) {
    console.log('here');
    var $e = $(e.target);

    var id = $e.parents('tr').attr('data-id');
    var currentItem = this.collection.get(id);
    var currentQuantity = currentItem.get('quantity');
    if ($e.hasClass('fa-minus')) {
      currentQuantity = (currentQuantity === 0) ? 0 : (currentQuantity - 1)
      currentItem.set('quantity', currentQuantity);
    } else {
      currentQuantity += 1;
    }
    this.updateSubQuantity(currentItem, $e, currentQuantity);
    this.updateTotal();
  },

  updateSubQuantity: function(item, $target, quantity) {
    item.set('quantity', quantity);
    this.collection.set(item, {remove: false });
    $target.parents('tr').find('p').text(quantity);
  },
  updateTotal: function() {
    this.collection.setTotal();
    var total = this.collection.getTotal();
    $('.total').text('$' + total.toFixed(2));
  },
  render: function() {
    this.$el.html(this.template({
      dishes: this.collection.toJSON(),
      quantity: this.collection.getQuantity(),
      total: this.collection.getTotal()
    }));
    $('#cart').hide();
    $('#content').html(this.el);
  },
  initialize: function() {
    this.render();
  }
});