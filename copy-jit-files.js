var fs = require('fs');
var resources = [
  {src:'src/index-jit.html', dest: 'src/index.html'},
  {src:'src/systemjs.config.jit.js', dest: 'src/systemjs.config.js'},
  {src:'src/css/font-awesome/_variables-jit.scss', dest: 'src/css/font-awesome/_variables.scss'},
];
resources.map(function(f) {
  var F = new Object();
  if (typeof f === 'string'){
    F.src = F.dest = f;
  }else{
    F = f;
  }

  // var a = F.dest.split('/');
  // var destFileName = a[a.length-1];
  // var destPath = 'src/' + destFileName;
  var destPath = F.dest;
  //console.log();
  console.log('copying: [' + F.src + '] to [' + destPath + ']');
  fs.createReadStream(F.src).pipe(fs.createWriteStream(destPath));
});