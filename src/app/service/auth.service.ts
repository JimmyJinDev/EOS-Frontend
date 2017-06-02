import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  /**
   * if we have a token the user is loggedIn
   * @returns {boolean}
   */
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   *  Login the user then tell all the subscribers about the new status
   */
  login(): void {
    localStorage.setItem('token', 'JWT');
    this.isLoginSubject.next(true);
  }

  /**
   * Log out the user then tell all the subscribers about the new status
   */
  logout(): void {
    localStorage.removeItem('token');
    this.isLoginSubject.next(false);
  }

  /**
   *
   * @returns {Observable<T>}
   */
  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
    // return this.isLoginSubject.asObservable().share();
  }
}
