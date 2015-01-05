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
  
  // TODO: prevent multiple injections
  
  // save _drawRow function and wrap it with code to change
  // foreground color for disabled items
  var old_drawRow = tm._drawRow;
  tm._drawRow = function (index) {
    var isDisabled = self.disabled.indexOf(this.items[index].label) !== -1;
    var oldFg = this.colors.fg;
    
    if (isDisabled) {
      this.colors.fg = self.fgi;
    }
    
    old_drawRow.call(this, index);
    
    if (isDisabled) {
      this.colors.fg = oldFg;
    }
  };
  
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
};
