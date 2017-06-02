"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/switchMap");
var EOAEntityFormComponent = (function () {
    function EOAEntityFormComponent(formControlService, app, route, location) {
        this.formControlService = formControlService;
        this.app = app;
        this.route = route;
        this.location = location;
        this.formFields = [];
        this.submittedAndSaved = false;
        this.payLoad = '';
        this.dataLoaded = false;
        this.submitted = false;
        this.formErrors = [];
        this.data = {
            entity_type: '',
            entity_abbreviation: '',
            newRecord: false,
            entityService: {},
            entitySingle: {},
            panels: {
                offer: {
                    edit_mode: 'view'
                }
            },
            collapse: {},
            relatedForms: {}
        };
        this.hasAsassociatedEntityDefined = false;
        // public formDataSavedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        //   this.formDataSavedQuery()
        // );
        this.validationMessages = {
            'name': {
                'required': 'Name is requiredaqa.',
                'minlength': 'Name must be at least 4 characters long.',
                'maxlength': 'Name cannot be more than 24 characters long.',
                'forbiddenName': 'Someone named "Bob" cannot be a hero.'
            },
            'power': {
                'required': 'Power is required.'
            }
        };
        this.routerLoaded = 0;
        this.app.setAppData('formSubmittedAndSaved', false);
    }
    EOAEntityFormComponent.prototype.AppDataLoaded = function (isAppDataLoaded, fromSidebar) {
        if (!this.app.getAppData('sidebarFormShown') && !fromSidebar) {
            this.app.setFormDataLoaded(false);
            this.app.entity_type = this.data.entity_type;
            if (!this.app.getAppData('sidebarFormShown')) {
                this.app.setAppData('formEntityType', this.data.entity_type);
                this.app.setAppData('formEntityAbbr', this.data.entity_abbreviation);
                this.app.setAppData('sidebarEntityAbbr', this.app.getAppData('formEntityAbbr'));
                this.app.setAppData('sidebarEntityType', this.app.getAppData('formEntityType'));
            }
            else {
                this.app.setAppData('sidebarFormEntityAbbr', this.data.entity_abbreviation);
                this.app.setAppData('sidebarFormEntityType', this.data.entity_type);
            }
            if (this.route.routeConfig === null
                || this.route.routeConfig.path === this.app.getAppData('formEntityType') + '/new') {
                this.app.setAppData('formNewRecord', true);
            }
            else {
                this.app.setAppData('formNewRecord', false);
            }
        }
        if (!isAppDataLoaded) {
            return;
        }
        this._loadFormFields();
        this._showForm(fromSidebar);
    };
    EOAEntityFormComponent.prototype._loadFormFields = function () {
        var _this = this;
        this.form = this.formControlService.getForm();
        if (undefined !== this.form) {
            this.form.valueChanges
                .subscribe(function (data) { return _this._onValueChanged(data); });
        }
        this.formFields = this.form.formFields;
        // this.form.valueChanges
        //   .subscribe(data => this.onValueChanged(data));
        // this.onValueChanged(); // (re)set validation messages now
    };
    EOAEntityFormComponent.prototype._showForm = function (fromSidebar) {
        if (!fromSidebar) {
            if (this.app.getAppData('formNewRecord') === true) {
                this._showNew();
            }
            else {
                this._showOne();
            }
        }
    };
    EOAEntityFormComponent.prototype._onValueChanged = function (data) {
        // debugger;
        // console.log('data - ' + data);
        if (!this.form) {
            return;
        }
        var form = this.form;
        for (var field in this.form.controls) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += field;
                }
            }
            else {
                if (!control.valid) {
                    console.log('NOT VALID: control ' + field + ' - ' + control.valid);
                }
            }
        }
    };
    EOAEntityFormComponent.prototype._showNew = function () {
        this.data.newRecord = true;
        this.app.setAppData('formNewRecord', true);
        // this.app.setAppData('formEntityType', this.data.entity_type);
        this.dataLoaded = true;
        for (var key in this.formFields) {
            if (this.formFields.hasOwnProperty(key)) {
                if (undefined === this.formFields[key]) {
                    return;
                }
                if (undefined === this.data.entitySingle[key] && this.form.controls[key].value !== '') {
                    this.form.controls[key].setValue(this.form.controls[key].value);
                }
                else {
                    this.form.controls[key].setValue(this.data.entitySingle[key]);
                }
            }
        }
        if (this.app.getAppData('formEntityAbbr') !== 'FIC') {
            this.form.controls['StatusId'].setValue(1);
            this.form.controls['StatusReasonId'].setValue(1);
            this.app.setFormDummyData(this.form);
        }
        console.log('setFormDataLoaded - _showNew');
        this.app.setFormDataLoaded(true);
    };
    EOAEntityFormComponent.prototype._showOne = function () {
        var _this = this;
        console.log('showone');
        this.app.setAppData('formNewRecord', false);
        if (!this.app.getAppData('sidebarFormShown')) {
            this.route.params
                .switchMap(function (params) {
                _this.app.setAppData('formEntitySingleId', +params['id']);
                return _this.app.getOne(+params['id']);
            })
                .subscribe(function (entitySingle) {
                if (entitySingle) {
                    _this._fillFormData(entitySingle);
                }
            });
        }
        else {
            var entitySingle = this.app.getAppData('sidebarFormEntity');
            this._fillFormData(entitySingle);
        }
    };
    EOAEntityFormComponent.prototype._fillFormData = function (entitySingle) {
        // console.log('formEntity ' + JSON.stringify(entitySingle))
        this.app.setAppData('formEntity', entitySingle);
        for (var key in this.formFields) {
            if (this.formFields.hasOwnProperty(key)) {
                if (undefined === this.formFields[key]) {
                    return;
                }
                this.form.controls[key].setValue(entitySingle[key]);
            }
        }
        this.dataLoaded = true;
        this._entitySingleLoaded();
        this.hasAsassociatedEntityDefined = this.getHasAsassociatedEntityDefined();
        // @TODO: Dummy data for the DB (API) until we get actual data for these.
        this.app.setFormDummyData(this.form);
        this.data.entitySingle = entitySingle;
    };
    EOAEntityFormComponent.prototype._entitySingleLoaded = function () {
        if (this.routerLoaded === 0) {
            console.log('setFormDataLoaded - _entitySingleLoaded');
            this.app.setFormDataLoaded(true);
            this.routerLoaded++;
        }
    };
    EOAEntityFormComponent.prototype.onSubmit = function () {
        this.app._log('BUG? onSubmit called', 'MSG');
        this.payLoad = JSON.stringify(this.form.value);
    };
    // @TODO: Rename to 'saveOne'
    EOAEntityFormComponent.prototype.saveEntity = function ($event) {
        this.app.stopEventPropagation($event);
        this.submitted = true;
        // if ( undefined !== this.form.controls[ 'EffectiveDate' ] ) {
        //   let EffectiveDate = this.form.controls[ 'EffectiveDate' ].value;
        //   this.form.controls[ 'EffectiveDate' ].setValue(
        //     EffectiveDate.month + '-' + EffectiveDate.day + '-' + EffectiveDate.year
        //   );
        // }
        this.formValue = this.form.value;
        if (!this.app.getAppData('formNewRecord')) {
            var entityItm = this.app.getAppData('formEntity');
            var entityAbbr = this.app.getAppData('formEntityAbbr');
            if (this.app.getAppData('sidebarFormShown')) {
                entityAbbr = this.app.getAppData('sidebarFormEntityAbbr');
            }
            var idValue = entityItm[this.app.getEntityPk(entityAbbr)];
            if (undefined !== idValue) {
                this.formValue[this.app.getEntityPk(entityAbbr)] = idValue;
            }
        }
        if (!this.app.getAppData('sidebarFormShown')) {
            this._saveCurrentEntity();
        }
        else {
            this._saveCurrentEntity(this.app.getAppData('sidebarFormEntityAbbr'));
        }
    };
    EOAEntityFormComponent.prototype._saveCurrentEntity = function (entityAbbr) {
        var _this = this;
        this.app.saveOne(this.formValue, entityAbbr).then(function (result) {
            if (_this.app.getAppData('formEntityAbbr') !== 'FIC') {
                if (_this.app.associatedEntityIsManyToMany(_this.app.getAppData('sidebarFormEntityAbbr'))) {
                    var parentPk = _this.app.getEntityPk(_this.app.getAppData('formEntityAbbr'));
                    var childPk = _this.app.getEntityPk(_this.app.getAppData('sidebarFormEntityAbbr'));
                    var parentPkValue = _this.app.getAppData('formEntity')[parentPk];
                    var childPkValue = result[childPk];
                    if (_this.app.dev_mode === 'jit') {
                        childPkValue = result['id'];
                    }
                    var manyToManyEntity = {};
                    manyToManyEntity[parentPk] = parentPkValue;
                    manyToManyEntity[childPk] = childPkValue;
                    _this.app.saveOne(manyToManyEntity, _this.app.getAssociatedEntityManyToManyFromChildEntityAbbr(_this.app.getAppData('sidebarFormEntityAbbr')))
                        .then(function (ManyToManySaveResult) {
                        console.log('ManyToManySaveResult - ' + JSON.stringify(ManyToManySaveResult));
                        _this._savedCurrentEntity();
                    });
                }
                else {
                    _this._savedCurrentEntity();
                }
            }
        });
    };
    EOAEntityFormComponent.prototype._savedCurrentEntity = function () {
        this.submittedAndSaved = true;
        this.app.setAppData('formSubmittedAndSaved', true);
        this.app.formDataSavedSubject.next(true);
    };
    EOAEntityFormComponent.prototype.togglePanelCardEditMode = function ($event) {
        // $event.preventDefault();
        // $event.stopPropagation();
        // .collapse('show')
        (this.data.panels.offer.edit_mode === 'view') ?
            this.data.panels.offer.edit_mode = 'edit'
            : this.data.panels.offer.edit_mode = 'view';
        this.app.setAppData('allPanelsToViewMode', false);
    };
    EOAEntityFormComponent.prototype.getPanelCardClass = function (panel_type, edit_mode) {
        return false;
        // return this.data.panels[ panel_type ].edit_mode === edit_mode;
    };
    EOAEntityFormComponent.prototype.getHasAsassociatedEntityDefined = function () {
        var formEntityAbbr = this.app.getAppData('formEntityAbbr');
        return (undefined !== this.app.getAppData('entities')[formEntityAbbr].associatedEntities
            && 0 !== Object.keys(this.app.getAppData('entities')[formEntityAbbr].associatedEntities).length);
    };
    return EOAEntityFormComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], EOAEntityFormComponent.prototype, "formFields", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], EOAEntityFormComponent.prototype, "appDataLoaded", void 0);
exports.EOAEntityFormComponent = EOAEntityFormComponent;
//# sourceMappingURL=eoa-entity-form.component.js.map