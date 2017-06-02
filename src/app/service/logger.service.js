"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LoggerService = (function () {
    function LoggerService() {
        this.logs = []; // capture logs for testing
    }
    LoggerService.prototype.log = function (msg, type) {
        this.logs.push({ type: type, msg: msg });
        if (undefined === type) {
            type = 'log';
        }
        if (type === 'MSG') {
            console.log('%c%s', 'color: red; background: yellow; font-size: 11px;', "MSG: " + msg);
        }
        else {
            console[type](msg);
        }
    };
    return LoggerService;
}());
LoggerService = __decorate([
    core_1.Injectable()
], LoggerService);
exports.LoggerService = LoggerService;
//# sourceMappingURL=logger.service.js.map