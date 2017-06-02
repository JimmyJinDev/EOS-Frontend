var fs = require('fs');
var resources = [
    'src/aot/build.js',
    'src/css/styles.css',
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'src/js/moment.min.js',

    'node_modules/jquery/dist/jquery.js',
    'node_modules/tether/dist/js/tether.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',

    // 'src/js/faker/build/faker.min.js',
    // 'src/js/lodash.js',
];
resources.map(function (f) {
    var F = new Object();
    if (typeof f === 'string') {
        F.src = F.dest = f;
    } else {
        F = f;
    }

    var a = F.dest.split('/');
    var destFileName = a[a.length - 1];
    var destPath = '../Public/Content/app/' + destFileName;
    //console.log();
    console.log('copying: [' + F.src + '] to [' + destPath + ']');
    fs.createReadStream(F.src).pipe(fs.createWriteStream(destPath));
});
