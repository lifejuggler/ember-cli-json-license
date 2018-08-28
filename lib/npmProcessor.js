let fs = require('fs');
let path = require('path');
let _ = require('lodash');
let configProcessor = require('./configProcessor');
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
};
// return a list of {npm-module} info sorted by license
module.exports = function(output, args, keyMap) {
    let reference = [];

    if (args.config) {
        reference = configProcessor.getReference(args.config);
    }

    let licenses = {}
    let outputKeys = _.keys(output);

    for (let lKey of outputKeys) {
        const packageInfo = lKey.split('@');
        const name = packageInfo[0];
        if (name) {
            const details = output[lKey];
            if (!licenses[name]) {
                licenses[name] = {
                    "name": name,
                    "version": packageInfo[1],
                    "license": [details.licenses]
                }
                licenses[name].licenseLink = {}
                licenses[name].licenseLink[details.licenses] = licenseLinkMap[details.licenses] || '#'
            } else {
                licenses[name].version += `, ${packageInfo[1]}`;

                if (!licenses[name].license.includes(details.licenses)) {
                    licenses[name].license.push(details.licenses);
                }

                licenses[name].licenseLink[details.licences] = licenseLinkMap[details.licences] || '#';
            }
        }
    }
    let licenseKeys = _.keys(licenses);
    for (let name of licenseKeys) {
        // combine arrays to string
        licenses[name].license = licenses[name].license.join(', ')
    }

    return licenses;
}
