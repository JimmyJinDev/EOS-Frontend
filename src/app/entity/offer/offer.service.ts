import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { AppService } from '../../service/app.service';

import { Offer } from './offer.type';
import { Router } from '@angular/router';

@Injectable()
export class OfferService extends AppService {

  constructor(public router: Router) {
    super(router);
    this.entity_type = 'offer';
  }

  update(offer: Offer): Promise<Offer> {
    const url = `${this.apiUrl}/offer`;
    return this.http
      .post(url, JSON.stringify(offer), { headers: this.headers })
      .toPromise()
      .then(() => offer)
      .catch(this._handleError);
  }

  create(offerName: string): Promise<Offer> {
    const url = `${this.apiUrl}/offer`;
    return this.http
      .post(url, JSON.stringify({ OfferName: offerName }), { headers: this.headers })
      .toPromise()
      .then(res => res.json().value as Offer)
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
