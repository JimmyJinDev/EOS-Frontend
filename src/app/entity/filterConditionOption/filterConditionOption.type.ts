import { EOAEntity } from '../eoa-entity.type';

export class FilterConditionOption extends EOAEntity {

  public static readonly _entity_type = 'filterconditionoption';
  public static readonly _entity_abbreviation = 'FIO';
  //
  public FilterConditionOptionId?: number;
  public FilterConditionGroup?: number;
  public FilterConditionType: string;
  public FilterConditionValue: string;

  constructor() {
    super();

  }
}
