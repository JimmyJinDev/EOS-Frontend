import { EOAEntity } from '../eoa-entity.type';

export class ProductLine extends EOAEntity {

  public static readonly _entity_type = 'productLine';
  public static readonly _entity_abbreviation = 'OFF';

  constructor(public EffectiveDate?: string,
              //
              public ProductLineId?: string,
              public AdvertiserId?: string,
              public ProductLineName?: string,
              public HasProductLineId?: number,
              public ProductLineType?: number,
              public PrimaryGoal?: number,
              //
              public RevenueType?: string,
              public DefaultPayoutRpc?: number,
              public PayoutRpcStartDate?: string,
              public ScrubPercentage?: string) {
    super();
  }
}
