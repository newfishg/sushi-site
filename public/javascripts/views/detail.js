var ItemDetailView = Backbone.View.extend({
  attributes: {
    id: 'item_details'
  },
  events: {
    'click a.add_cart': 'addToCart'
  },
  addToCart: function(e) {
    e.preventDefault();
    App.trigger('add_to_cart', this.model);
  },
  template: App.templates.detail,
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    $('#content').html(this.el);
  },
  initialize: function() {
    this.model.view = this;
  }
});