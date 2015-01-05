var menu = require('terminal-menu')({
  width: 30,
  x: 2,
  y: 2
});
var disabler = require('../')(menu, {
  // uncomment following line to make forground
  // color of disabled menu items red
  // fgi: 'red',
  disabled: [
    // you can have a list of labels to be disabled
    // at startup here.
  ]
});

var sd = 'Self Distruct',
    esd = 'Enable \'Self Distruct\' (!)';

menu.reset();
menu.write('MARVIN\'S TODO LIST\n');
menu.write('-----------------------------\n');

menu.add('Complain');
menu.add('Whine');
menu.add('Do Nothing');
menu.add(sd);

menu.write('-----------------------------\n');
menu.add(esd);
menu.add('EXIT');

menu.on('select', function (label) {
  if (label === esd) {
    menu.enableMenu(sd);
    menu.disableMenu(esd);
  } else {
    menu.close();
    console.log('Marvin will ' + label.toLowerCase() + ' now!');
  }
});
menu.createStream().pipe(process.stdout);
menu.disableMenu(sd);
