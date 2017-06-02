/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': '/node_modules/',
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      'app': 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',

      // other libraries
      'rxjs': 'npm:rxjs',
      'lodash': 'npm:lodash',
      'faker': 'npm:faker',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'ngx-pagination': 'npm:ngx-pagination/dist/ngx-pagination.umd.js',
      'moment': 'node_modules/moment',
      // 'ngx-bootstrap': 'npm:ngx-bootstrap',
      '@ng-bootstrap/ng-bootstrap': 'npm:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',
      // 'clarity-angular': 'npm:clarity-angular',
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        defaultExtension: 'js',
        meta: {
          './*.js': {
            loader: 'systemjs-angular-loader.js'
          }
        }
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'ngx-pagination': {defaultExtension: 'js'},
      'lodash': {main: 'index.js', defaultExtension: 'js'},
      'faker': {defaultExtension: 'js'},
      // 'ngx-bootstrap': {format: 'cjs', main: 'bundles/ngx-bootstrap.umd.js', defaultExtension: 'js'},
      '@ng-bootstrap/ng-bootstrap': {defaultExtension: 'js'},
      // 'clarity-angular': {main: 'clarity-angular.umd.js'},
    }
  });
})(this);
