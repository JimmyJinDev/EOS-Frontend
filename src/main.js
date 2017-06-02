"use strict";
/**
 * dev - npm run watch:iis
 * build - npm run build:aot
 */
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app/app.module");
var app_settings_1 = require("./app/app-settings");
console.log('%c%s', 'color: red; background: yellow; font-size: 24px;', 'EOA ' + app_settings_1.AppSettings.APP_VERSION + ' [ DEV mode ]');
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .then(function (success) { return console.log("Bootstrap success"); })
    .catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map