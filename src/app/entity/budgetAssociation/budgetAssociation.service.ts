import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { AppService } from '../../service/app.service';

import { Budget } from './budgetAssociation.type';
import { Router } from '@angular/router';

@Injectable()
export class BudgetAssociationService extends AppService {

  constructor(public router: Router) {
    super(router);
    this.entity_type = 'budgetAssociation';
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
}
