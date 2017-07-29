var DishesView = Backbone.View.extend({
  tagName: 'ul',
  render: function() {
    this.collection.each(this.renderDish.bind(this));
  },
  renderDish: function(dish) {
    var dishView = new DishView({
      model: dish
    });
    
    this.$el.append(dishView.el);
  },
  initialize: function() {
    this.$el.attr('id', 'items');
    this.render();
  }
});