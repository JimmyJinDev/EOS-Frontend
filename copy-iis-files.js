var fs = require('fs');
var resources = [
  {src:'src/index-iis.html', dest: 'index.html'},
    {src:'src/systemjs.config.iis.js', dest: 'systemjs.config.js'},
];
resources.map(function(f) {
  var F = new Object();
  if (typeof f === 'string'){
    F.src = F.dest = f;
  }else{
    F = f;
  }

  var a = F.dest.split('/');
  var destFileName = a[a.length-1];
  var destPath = 'src/' + destFileName;
  //console.log();
  console.log('copying: [' + F.src + '] to [' + destPath + ']');
  fs.createReadStream(F.src).pipe(fs.createWriteStream(destPath));
});
var layoutFileSrc = 'src/index-iis.html';
var layoutFileDest = 'C:/inetpub/wwwroot/smarterofferadmin/Views/Shared/_Layout.cshtml';
console.log('copying: [' + layoutFileSrc + '] to [' + layoutFileDest + ']');
fs.createReadStream(layoutFileSrc).pipe(fs.createWriteStream(layoutFileDest));
