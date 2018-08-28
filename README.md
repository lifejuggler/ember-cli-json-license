# ember-cli-json-license
Ember CLI addon that adds a `license` command for exporting front-end NPM and Bower licenses.
It also provides a modal component for displaying licenses information on UI.

## Installation
####Ember CLI
```sh
$ ember install ember-cli-license
```
####NPM
```sh
$ npm install --save-dev ember-cli-license
```

## Usage
When invoked with no options:

```sh
$ ember license
```

It will:

  1. Look for a `node_modules` folder at current path
  2. Scan recursively for npm packages
  3. Output a json file at `public/assets/licenses/licenses.json`
  5. You can then add a component in your template to display license info on UI

## Credits
* davglass's [license-checker](https://github.com/davglass/license-checker)
* AceMetrix's [bower-license](https://github.com/AceMetrix/bower-license)
* Rickieshi's [ember-cli-license](https://github.com/rickieshi/ember-cli-license)
## License
**MIT**
