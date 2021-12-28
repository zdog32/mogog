var t1 = performance.now();

const lang = require('./input.json');

const outputLang = {};

function reverse(str) {
    var a = str.replaceAll('%s', '噩');
    var reversed = a.split('').reverse().join('');
    var b = reversed.replaceAll('噩', '%s');
    return b;
}

function mogoify(str) {
    var letters = 1;
    var a = str.replaceAll('%s', '噩');

    var d = '';

    for (var i = 0; i < a.length; i++) {
        if (a[i] == ' ') {
            letters = 1;
            d += ' ';
            continue;
        }
        if ('QWERTYUIOPASDFGHJKLZXCVBNM'.includes(a[i])) {
            // capital letter
            if (letters === 1) {
                // first
                d += 'M';
            } else if (letters % 2 === 0) {
                // even
                d += 'O';
            } else {
                // odd
                d += 'G';
            }
            letters++;
        } else if ('qwertyuiopasdfghjklzxcvbnm'.includes(a[i])) {
            // lowercase letter
            if (letters === 1) {
                // first
                d += 'm';
            } else if (letters % 2 === 0) {
                // even
                d += 'o';
            } else {
                // odd
                d += 'g';
            }
            letters++;

        } else {
            d += a[i];
        }
    }
    var b = d.replaceAll('噩', '%s');
    return b;
}

for (var prop in lang) {
    outputLang[prop] = mogoify(lang[prop]);
}

const fs = require('fs');

fs.writeFileSync('en_us.json', JSON.stringify(outputLang));

var t2 = performance.now();

console.log('wrote file succesfully');
console.log('it took ' + (t2 - t1) + ' ms');

