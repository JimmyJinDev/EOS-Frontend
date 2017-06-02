import { EOAEntity } from '../eoa-entity.type';

export class Offer extends EOAEntity {

  public static readonly _entity_type = 'offer';
  public static readonly _entity_abbreviation = 'OFF';

  constructor(public EffectiveDate?: string,
              //
              public ProductLineId?: string,
              public AdvertiserId?: string,
              public OfferName?: string,
              public HasOfferId?: number,
              public OfferType?: number,
              public PrimaryGoal?: number,
              //
              public RevenueType?: string,
              public DefaultPayoutRpc?: number,
              public PayoutRpcStartDate?: string,
              public ScrubPercentage?: string) {
    super();
  }
}
