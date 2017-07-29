var path = require('path');
var fs = require('fs');
var file_path = path.resolve(path.dirname(__dirname), 'data/data.json');
var order_file_path = path.resolve(path.dirname(__dirname), 'data/order.json');

module.exports = {
  __readFile: function() {
    return JSON.parse(fs.readFileSync(file_path, 'utf8'));
  },

  get: function() {
    return this.__readFile().data;
  },

  order: function(data) {
    fs.writeFileSync(order_file_path, JSON.stringify({
      data: data
    }), 'utf8');
  }

};