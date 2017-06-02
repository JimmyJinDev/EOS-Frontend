import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { AppService } from '../../service/app.service';

import { ProductLine } from './productLine.type';
import { Router } from '@angular/router';

@Injectable()
export class ProductLineService extends AppService {

  constructor(public router: Router) {
    super(router);
    this.entity_type = 'productLine';
  }

  update(productLine: ProductLine): Promise<ProductLine> {
    const url = `${this.apiUrl}/productLine`;
    return this.http
      .post(url, JSON.stringify(productLine), { headers: this.headers })
      .toPromise()
      .then(() => productLine)
      .catch(this._handleError);
  }

  create(productLineName: string): Promise<ProductLine> {
    const url = `${this.apiUrl}/productLine`;
    return this.http
      .post(url, JSON.stringify({ ProductLineName: productLineName }), { headers: this.headers })
      .toPromise()
      .then(res => res.json().value as ProductLine)
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
