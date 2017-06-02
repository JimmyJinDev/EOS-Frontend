import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { AppService } from '../../service/app.service';

import { Comment } from './comment.type';
import { Router } from '@angular/router';

@Injectable()
export class CommentService extends AppService {

  constructor(public router: Router) {
    super(router);

    this.entity_type = 'comment';
  }


  update(comment: Comment): Promise<Comment> {
    const url = `${this.apiUrl}/comment`;
    return this.http
      .post(url, JSON.stringify(comment), { headers: this.headers })
      .toPromise()
      .then(() => comment)
      .catch(this._handleError);
  }

  create(commentName: string): Promise<Comment> {
    const url = `${this.apiUrl}/comment`;
    return this.http
      .post(url, JSON.stringify({ CommentName: commentName }), { headers: this.headers })
      .toPromise()
      .then(res => res.json().value as Comment)
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
