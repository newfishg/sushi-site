var IndexView = Backbone.View.extend({
  el: 'body',
  template: App.templates.index,
  render: function() {
    this.$el.html(this.template);
  },
  initialize: function() {
    this.render();
  }
});