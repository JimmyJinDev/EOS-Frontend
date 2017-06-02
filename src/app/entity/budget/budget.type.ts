import { EOAEntity } from '../eoa-entity.type';

export class Budget extends EOAEntity {

  public static readonly _entity_type = 'budget';
  public static readonly _entity_abbreviation = 'BUD';

  constructor(public EffectiveDate?: string,
              //
              public BudgetName?: string,
              public BudgetType?: number,
              public ProductId?: string,
              public Shared?: number,
              //
              public RevenueLimit?: string,
              public OverridePayoutRpc?: number,
              public DefaultPayoutRpc?: number,
  ) {
    super();
  }
}
