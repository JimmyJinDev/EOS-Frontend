import { EOAEntity } from '../eoa-entity.type';

export class Comment extends EOAEntity {

  public static readonly _entity_type = 'comment';
  public static readonly _entity_abbreviation = 'COM';


  constructor(public Comments?: string,) {
    super();
  }
}
