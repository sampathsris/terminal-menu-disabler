terminal-menu-disabler
======================

A plugin package for terminal-menu, that enables you to disable given menu items.

#example

```
var menu = require('terminal-menu')({ width: 30, x: 2, y: 2 });
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
```

#usage

```
var disabler = require('terminal-menu-disabler')
disabler(terminal_menu, opts);
```

- `terminal_menu` is an instance of a terminal menu created with [terminal-menu](https://www.npmjs.com/package/terminal-menu)
- `opts` is an object, which may have following properties
    - `opts.fgi`: Foreground color for inactive menu items. This also becomes the background color for inactive menu items when it is selected.
    - `opts.disabled`: An array of string literals indicating the menu items to be disabled on startup.
    
#installation

I expect to publish this on [npm](https://www.npmjs.com), when that happens:
```
npm install terminal-menu-disabler
```

#licence

MIT