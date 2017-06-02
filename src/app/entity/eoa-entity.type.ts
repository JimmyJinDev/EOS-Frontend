interface EOAEntityInterface {
  _entity_type: string;
  _entity_abbreviation: string;
  _data: any;

  id?: number;
  statusId?: number;
  StatusReasonId?: number;
  //
  CreatedBy?: string;
  CreatedDate?: string;
  LastModifiedBy?: string;
  LastModifiedDate?: string;

  isActive(): boolean;
}

export class EOAEntity implements EOAEntityInterface {

  _entity_type: string;
  _entity_abbreviation: string;
  _data: any;

  public id?: number;
  public statusId?: number;
  public StatusReasonId?: number;
  //
  public CreatedBy?: string;
  public CreatedDate?: string;
  public LastModifiedBy?: string;
  public LastModifiedDate?: string;

  constructor() {
    this.statusId = this.statusId || 2;
    this.StatusReasonId = this.StatusReasonId || 1;

    this.LastModifiedDate = this.LastModifiedDate || new Date().toLocaleDateString();
  }

  isActive(): boolean {
    return !(this.statusId === 1);
  }

  public getEntityAbbreviation() {
    return this._entity_abbreviation;
  }
}