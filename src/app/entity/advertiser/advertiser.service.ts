import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { AppService } from '../../service/app.service';

import { Advertiser } from './advertiser.type';
import { Router } from '@angular/router';

@Injectable()
export class AdvertiserService extends AppService {

  constructor(public router: Router) {
    super(router);
    this.entity_type = 'advertiser';
  }

  update(advertiser: Advertiser): Promise<Advertiser> {
    const url = `${this.apiUrl}/advertiser`;
    return this.http
      .post(url, JSON.stringify(advertiser), { headers: this.headers })
      .toPromise()
      .then(() => advertiser)
      .catch(this._handleError);
  }

  create(advertiserName: string): Promise<Advertiser> {
    const url = `${this.apiUrl}/advertiser`;
    return this.http
      .post(url, JSON.stringify({ AdvertiserName: advertiserName }), { headers: this.headers })
      .toPromise()
      .then(res => res.json().value as Advertiser)
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
