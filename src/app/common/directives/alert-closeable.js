"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NgbdAlertCloseable = (function () {
    function NgbdAlertCloseable() {
        this.alerts = [];
        // this.alerts.push({
        //   id: 1,
        //   type: 'success',
        //   message: 'This is an success alert',
        // }, {
        //   id: 2,
        //   type: 'info',
        //   message: 'This is an info alert',
        // }, {
        //   id: 3,
        //   type: 'warning',
        //   message: 'This is a warning alert',
        // }, {
        //   id: 4,
        //   type: 'danger',
        //   message: 'This is a danger alert',
        // });
    }
    NgbdAlertCloseable.prototype.closeAlert = function (alert) {
        var index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    };
    return NgbdAlertCloseable;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], NgbdAlertCloseable.prototype, "alerts", void 0);
NgbdAlertCloseable = __decorate([
    core_1.Component({
        selector: 'ngbd-alert-closeable',
        templateUrl: './alert-closeable.html'
    }),
    __metadata("design:paramtypes", [])
], NgbdAlertCloseable);
exports.NgbdAlertCloseable = NgbdAlertCloseable;
//# sourceMappingURL=alert-closeable.js.map