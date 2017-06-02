"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var core_1 = require("@angular/core");
var NgbEOADateParserFormatterDirective = (function (_super) {
    __extends(NgbEOADateParserFormatterDirective, _super);
    function NgbEOADateParserFormatterDirective() {
        return _super.call(this) || this;
    }
    ;
    NgbEOADateParserFormatterDirective.prototype.format = function (date) {
        if (date === null) {
            return '';
        }
        var stringDate = '';
        if (date) {
            stringDate += this._isNumber(date.month) ? this._padNumber(date.month) + '/' : '';
            stringDate += this._isNumber(date.day) ? this._padNumber(date.day) + '/' : '';
            stringDate += date.year;
        }
        console.log('stringDate ' + stringDate);
        return stringDate;
    };
    NgbEOADateParserFormatterDirective.prototype.parse = function (value) {
        console.log('value ' + value);
        if (value) {
            var dateParts = value.trim().split('/');
            if (dateParts.length === 1 && this._isNumber(dateParts[0])) {
                return { year: this._toInteger(dateParts[0]), month: null, day: null };
            }
            else if (dateParts.length === 2 && this._isNumber(dateParts[0]) && this._isNumber(dateParts[1])) {
                return { year: this._toInteger(dateParts[1]), month: this._toInteger(dateParts[0]), day: null };
            }
            else if (dateParts.length === 3 && this._isNumber(dateParts[0]) && this._isNumber(dateParts[1]) && this._isNumber(dateParts[2])) {
                console.log('dateParts ' + JSON.stringify(dateParts));
                return {
                    year: this._toInteger(dateParts[2]),
                    month: this._toInteger(dateParts[1]),
                    day: this._toInteger(dateParts[0])
                };
            }
        }
        return null;
    };
    NgbEOADateParserFormatterDirective.prototype._isNumber = function (value) {
        return !isNaN(this._toInteger(value));
    };
    NgbEOADateParserFormatterDirective.prototype._toInteger = function (value) {
        return parseInt("" + value, 10);
    };
    NgbEOADateParserFormatterDirective.prototype._padNumber = function (value) {
        if (this._isNumber(value)) {
            return ("0" + value).slice(-2);
        }
        else {
            return '';
        }
    };
    return NgbEOADateParserFormatterDirective;
}(ng_bootstrap_1.NgbDateParserFormatter));
NgbEOADateParserFormatterDirective = __decorate([
    core_1.Directive({
        selector: '[ngbEOADateParserFormatterDirective]'
    }),
    __metadata("design:paramtypes", [])
], NgbEOADateParserFormatterDirective);
exports.NgbEOADateParserFormatterDirective = NgbEOADateParserFormatterDirective;
//# sourceMappingURL=ngbEOADateParserFormatter.js.map