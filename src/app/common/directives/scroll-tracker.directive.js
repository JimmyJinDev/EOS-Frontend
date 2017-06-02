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
var ScrollTrackerDirective = (function () {
    function ScrollTrackerDirective() {
        this.lastScrollTop = 0;
    }
    ScrollTrackerDirective.prototype.onScroll = function ($event) {
        var st = $event.srcElement.scrollTop;
        if (st > this.lastScrollTop) {
            // downscroll code
            $('.d-inline-block.dropdown', '#navbar-app-navbar-responsive').removeClass('show');
            $('.d-inline-block button.dropdown-toggle', '#navbar-app-navbar-responsive').prop('aria-expanded', false);
            $('#navbar-app-navbar-responsive').css('margin-top', '-170px');
        }
        else {
            // upscroll code
            if (this.lastScrollTop < 10) {
                $('#navbar-app-navbar-responsive').css('margin-top', '0px');
            }
        }
    };
    ;
    return ScrollTrackerDirective;
}());
__decorate([
    core_1.HostListener('scroll', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], ScrollTrackerDirective.prototype, "onScroll", null);
ScrollTrackerDirective = __decorate([
    core_1.Directive({
        selector: '[scrollTracker]'
    }),
    __metadata("design:paramtypes", [])
], ScrollTrackerDirective);
exports.ScrollTrackerDirective = ScrollTrackerDirective;
//# sourceMappingURL=scroll-tracker.directive.js.map