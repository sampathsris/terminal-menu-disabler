var menu = require('terminal-menu')({
  width: 30,
  x: 2,
  y: 2
});
var disabler = require('../')({
  disabled: [
    'Self Distruct'
  ]
});

menu.reset();
menu.write('MARVIN\'S TODO LIST\n');
menu.write('-----------------------------\n');

menu.add('Complain');
menu.add('Whine');
menu.add('Do Nothing');
menu.add('Self Distruct');

menu.write('-----------------------------\n');
menu.add('EXIT');

menu.on('select', function (label) {
  menu.close();
  console.log('Marvin will ' + label.toLowerCase() + ' now!');
});
menu.createStream().pipe(process.stdout);

disabler.injectTo(menu);
