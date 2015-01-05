var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

module.exports = function (opts) {
  return new Injector(opts || {});
};

function Injector(opts) {
  var self = this;
  self.fgi = opts.fgi || 'cyan';
  self.disabled = opts.disabled || [];
}

inherits(Injector, EventEmitter);

Injector.prototype.injectTo = function (tm) {
  var self = this;
  
  tm.disable = function (label) {
    var index;
    
    for (var i = 0; i < tm.items.length; i++) {
      if (tm.items[i].label == label) {
        index = i;
        break;
      }
    }
    
    // TODO: The label gets updated (uncomment the following
    // line to confirm this). However, the foreground color
    // does not get set.
    //tm.items[index].label = '<Updated Label>';
    
    var oldFgColor = tm.colors.fg;
    tm.colors.fg = self.fgi;
    tm._drawRow(index);
    tm.colors.fg = oldFgColor;
    
  }
  
  
  // save the onselect callback for future use. Replace
  // it with a function and route execution if the selected
  // item is not a disabled item.
  var l = tm.listeners('select');
  tm.removeAllListeners('select');
  l.forEach(function (e) {
    self.on('selectmirror', e);
  });
  tm.on('select', function (label, selected) {
    if (self.disabled.indexOf(label) == -1) {
      self.emit('selectmirror', label, selected);
    }
  });
  
  self.disabled.forEach(function (element) {
    tm.disable(element);
  });
}
