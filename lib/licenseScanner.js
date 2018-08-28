let fs = require('fs');
let path = require('path');
let rsvp = require('rsvp');
let mkdirp = require('mkdirp');
let _ = require('lodash');
let scanner = require('license-checker');
let npmProcessor = require('./npmProcessor');
let configProcessor = require('./configProcessor');

module.exports = {
    init: function(args) {
        return new rsvp.Promise(function(resolve, reject) {
            scanner.init(args, function(err, output) {
                if (err) {
                    reject(err);
                } else {
                    let npmKeyList = ['name', 'version', 'license']
                    let npmLicenses = npmProcessor(output, args, npmKeyList);
                    let outputDir = './public/assets/licenses';
                    let json = generateJSON(npmLicenses);

                    mkdirp(outputDir, function(err) {
                        if (err) {
                            reject(err);
                        } else {
                            fs.writeFileSync(`${outputDir}/licenses.json`, JSON.stringify(json), 'utf8');
                            resolve();
                        }
                    });
                }
            });
        });
    }
}
var generateJSON = function(npms) {
    return _.keys(npms).map(key => {
        return {
            ...npms[key]
        }
    });
}
