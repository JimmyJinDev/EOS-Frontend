"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var AuthService = (function () {
    function AuthService() {
        this.isLoginSubject = new BehaviorSubject_1.BehaviorSubject(this.hasToken());
    }
    /**
     * if we have a token the user is loggedIn
     * @returns {boolean}
     */
    AuthService.prototype.hasToken = function () {
        return !!localStorage.getItem('token');
    };
    /**
     *  Login the user then tell all the subscribers about the new status
     */
    AuthService.prototype.login = function () {
        localStorage.setItem('token', 'JWT');
        this.isLoginSubject.next(true);
    };
    /**
     * Log out the user then tell all the subscribers about the new status
     */
    AuthService.prototype.logout = function () {
        localStorage.removeItem('token');
        this.isLoginSubject.next(false);
    };
    /**
     *
     * @returns {Observable<T>}
     */
    AuthService.prototype.isLoggedIn = function () {
        return this.isLoginSubject.asObservable();
        // return this.isLoginSubject.asObservable().share();
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map