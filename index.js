
module.exports = function (opts) {
  return new Injector(opts || {});
};

function Injector(opts) {
  var self = this;
  self.fgi = opts.fgi || 'cyan';
  self.disabled = opts.disabled || [];
}

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
    
    // TODO: save the onselect callback for future use. Replace
    // it with a function and route execution if the selected
    // item is not a disabled item.
  }
  
  this.disabled.forEach(function (element) {
    tm.disable(element);
  });
}
