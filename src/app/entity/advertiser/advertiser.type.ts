import { EOAEntity } from '../eoa-entity.type';

export class Advertiser extends EOAEntity {

  public static readonly _entity_type = 'advertiser';
  public static readonly _entity_abbreviation = 'ADV';
  //
  public AdvertiserId?: number;
  //
  public CompanyName?: string;
  public AddressLine1?: string;
  public AddressLine2?: string;
  public AddressCity?: string;
  public AddressState?: number;
  public AddressPostalCode?: string;
  public AddressCountry?: number;
  //
  public PrimaryFirstName?: string;
  public PrimaryLastName?: string;
  public PrimaryPhone?: string;
  public PrimaryEmail?: string;

  constructor() {
    super();

    this.AddressCountry = this.AddressCountry || 1;
  }

  public getEntityAbbreviation() {
    return this._entity_abbreviation;
  }

}
