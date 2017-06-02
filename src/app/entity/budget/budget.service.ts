import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { AppService } from '../../service/app.service';

import { Budget } from './budget.type';
import { Router } from '@angular/router';

@Injectable()
export class BudgetService extends AppService {

  constructor(public router: Router) {
    super(router);
    this.entity_type = 'budget';
  }


  update(budget: Budget): Promise<Budget> {
    const url = `${this.apiUrl}/budget`;
    return this.http
      .post(url, JSON.stringify(budget), { headers: this.headers })
      .toPromise()
      .then(() => budget)
      .catch(this._handleError);
  }

  create(budgetName: string): Promise<Budget> {
    const url = `${this.apiUrl}/budget`;
    return this.http
      .post(url, JSON.stringify({ BudgetName: budgetName }), { headers: this.headers })
      .toPromise()
      .then(res => res.json().value as Budget)
      .catch(this._handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this._handleError);
  }

  public _handleError(error: any): Promise<any> {
    if (error.status.toString() === "404") {
      return Promise.resolve(undefined);
    }
    return super._handleError(error);
  }

}
