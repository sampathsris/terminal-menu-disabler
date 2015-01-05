#terminal-menu-disabler

A package that extends [terminal-menu](https://www.npmjs.com/package/terminal-menu), making it capable of enabling/disabling menu items on the fly.

#example

```
var menu = require('terminal-menu')({ width: 30, x: 2, y: 2 });
var disabler = require('terminal-menu-disabler')(menu, {
  // uncomment following line to make forground
  // color of disabled menu items red
  // fgi: 'red',
  disabled: [
    // you can have a list of labels to be disabled
    // at startup here.
  ]
});

var sd = 'Self Distruct',#
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
disabler(menu, opts);
```

- `menu` is an instance of a terminal menu created with [terminal-menu](https://www.npmjs.com/package/terminal-menu)
- `opts` is an object, which may have following properties
    - `opts.fgi`: Foreground color for inactive menu items. This also becomes the background color for inactive menu items when it is selected.
    - `opts.disabled`: An array of string literals indicating the menu items to be disabled on startup.
    
After calling `disabler(menu, opts)`, two functions will be injected to `menu`, which you can use to enable/disable individual menu items.

- `menu.enableMenuItem(item)`
- `menu.disableMenuItem(item)`

`item` can be a label (string) or a zero based index (number) of a menu item.
    
#installation

```
npm install terminal-menu-disabler
```

#licence

MIT