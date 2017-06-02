import { EOAEntity } from '../eoa-entity.type';

export class Budget extends EOAEntity {

  public static readonly _entity_type = 'budgetassociation';
  public static readonly _entity_abbreviation = 'BUA';

  constructor(public EffectiveDate?: string,
              //
              public Sequence?: number,
              public BudgetId?: number,
              public OfferId?: number,
              //
              public StartDate?: string,
              public EndDate?: string,
  ) {
    super();
  }
}
