import { EOAEntity } from '../eoa-entity.type';

export class FilterCondition extends EOAEntity {

  public static readonly _entity_type = 'filtercondition';
  public static readonly _entity_abbreviation = 'FIC';
  //
  public FilterId: number;
  public FilterConditionId?: number;
  public FilterConditionGroup?: number;
  public FilterConditionType?: number;
  public FilterConditionOperator?: number;
  public FilterConditionValue: string;

  constructor() {
    super();

  }
}
