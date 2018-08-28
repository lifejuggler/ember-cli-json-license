let fs = require('fs');
let path = require('path');
let _ = require('lodash');
let licenseLinkMap = {
    'Apache-2.0': 'http://www.apache.org/licenses/LICENSE-2.0',
    'BSD': 'https://spdx.org/licenses/BSD-4-Clause.html',
    'BSD-2-Clause': 'https://opensource.org/licenses/BSD-2-Clause',
    'BSD-3-Clause': 'https://opensource.org/licenses/BSD-3-Clause',
    'ISC': 'https://opensource.org/licenses/ISC',
    'MIT': 'https://opensource.org/licenses/MIT',
    'Public Domain': '#',
    'WTFPL': 'http://unlicense.org/',
    'Unlicense': 'http://unlicense.org/'
}


module.exports = {
    parse: function(configFile, type) {
        let data = JSON.parse(fs.readFileSync(path.resolve(configFile), 'utf8'));
        let additionalComponent = data.npm || [];
        let licenseMap = additionalComponent.map(function(component) {
            return {
                license: component.license,
                licenseLink: licenseLinkMap[component.license],
                name: component.name,
                version: component.version
            };
        });

        return _.sortBy(licenseMap, 'license');
    },

    getReference: function(configFile) {
        return JSON.parse(fs.readFileSync(path.resolve(configFile), 'utf8')).reference || [];
    }
}
