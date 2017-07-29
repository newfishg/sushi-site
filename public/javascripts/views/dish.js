var DishView = Backbone.View.extend({
  tagName: 'li',
  events: {
    'click a.add_cart': 'addToCart'
  },
  template: App.templates.dish,
  render: function() {
    var id = this.model.get('id');
    this.$el.attr('data-id', id);
    this.$el.html(this.template(this.model.toJSON()));
    return this.el;
  },
  addToCart: function(e) {
    e.preventDefault();
    App.trigger('add_to_cart', this.model);
  },
  initialize: function() {
    this.model.view = this;
    this.render();
  }
});