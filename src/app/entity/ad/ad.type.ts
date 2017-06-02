import { EOAEntity } from '../eoa-entity.type';

export class Ad extends EOAEntity {

  public static readonly _entity_type = 'ad';
  public static readonly _entity_abbreviation = 'ADS';
  //
  public AdId?: number;
  //
  public OfferId: number;
  public EffectiveDate?: string;
  public Name?: string;
  //
  public AdType?: number;
  public PlacementType?: number;
  public CalculatedWeight?: number;
  public CalculatedWeightOverride?: number;

  constructor() {
    super();

  }
}
