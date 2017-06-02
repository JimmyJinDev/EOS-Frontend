import { EOAEntity } from '../eoa-entity.type';

export class FilterAssociationType extends EOAEntity {

  public static readonly _entity_type = 'filterassociation'; // @TODO: deprecated since 1.2.2
  public static readonly _entity_abbreviation = 'FIA';
  //
  public EffectiveDate: string;
  //
  public FilterId?: number;
  public FilterName?: string;
  public FilterDescription?: string;
  public FilterAssociationId: number;
  //
  public ColumnName?: string;
  public Operator?: string;
  public Value?: string;
  public Sequence?: number;
  public AndOr?: boolean;
  public Active: boolean;

  constructor() {
    super();

  }
}
