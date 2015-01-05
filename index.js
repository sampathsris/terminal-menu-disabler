var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

module.exports = function (tm, opts) {
  return new Injector(tm, opts || {});
};

function Injector(tm, opts) {
  var self = this,
      old_add = tm.add,
      old__drawRow = tm._drawRow,
      old_on = tm.on;
  
  self.fgi = opts.fgi || 'cyan';
  self.disabled = opts.disabled || [];
  
  tm.add = function (label, cb) {
    old_add.call(this, label, cb);
    var enabled = self.disabled.indexOf(label) === -1;
    this.items[this.items.length - 1].enabled = enabled;
  }
  
  tm._drawRow = function (index) {
    var isDisabled = !this.items[index].enabled;
    var oldFg = this.colors.fg;
    
    if (isDisabled) {
      this.colors.fg = self.fgi;
    }
    
    old__drawRow.call(this, index);
    
    if (isDisabled) {
      this.colors.fg = oldFg;
    }
  };
  
  // save the onselect callback for future use. Replace
  // it with a function and route execution if the selected
  // item is not a disabled item.
  tm.on('select', function (label, selected) {
    if (self.disabled.indexOf(label) == -1) {
      self.emit('selectmirror', label, selected);
    }
  });
  
  tm.on = function (type, listener) {
    if (type === 'select') {
      self.on('selectmirror', listener);
    } else {
      old_on.call(this, type, listener);
    }
  }
}

inherits(Injector, EventEmitter);
