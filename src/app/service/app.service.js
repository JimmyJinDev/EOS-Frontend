"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var base_service_1 = require("./base.service");
var Subject_1 = require("rxjs/Subject");
var router_1 = require("@angular/router");
var fake_data_service_1 = require("./fake-data.service");
var common_1 = require("@angular/common");
var AppService = (function (_super) {
    __extends(AppService, _super);
    function AppService(router, location) {
        var _this = _super.call(this, router) || this;
        _this.router = router;
        _this.location = location;
        _this.isDataLoaded = new BehaviorSubject_1.BehaviorSubject(_this.hasData());
        _this.allPanelsToViewModeSubject = new BehaviorSubject_1.BehaviorSubject(_this.allPanelsToViewModeQuery());
        /**
         * Main Form Events
         * @type {BehaviorSubject<boolean>}
         */
        _this.formDataLoadedSubject = new BehaviorSubject_1.BehaviorSubject(_this.formDataLoadedQuery());
        _this.formDataSavedSubject = new BehaviorSubject_1.BehaviorSubject(// @TODO: Move to private
        _this.formDataSavedQuery());
        /**
         * Sidebar Events
         * @type {BehaviorSubject<boolean>}
         */
        _this.sidebarEntityLinkQueuedSubject = new BehaviorSubject_1.BehaviorSubject(_this.sidebarEntityLinkQueuedQuery());
        _this.sidebarEntityLinkFormQueuedSubject = new BehaviorSubject_1.BehaviorSubject(_this.sidebarEntityLinkFormQueuedQuery());
        _this.sidebarShownQueuedSubject = new BehaviorSubject_1.BehaviorSubject(_this.sidebarShowQueuedQuery());
        _this.sidebarFormShownQueuedSubject = new BehaviorSubject_1.BehaviorSubject(_this.sidebarFormShowQueuedQuery());
        _this.sidebarHideQueuedSubject = new BehaviorSubject_1.BehaviorSubject(_this.sidebarHideQueuedQuery());
        _this.sidebarReturnLinkSubject = new BehaviorSubject_1.BehaviorSubject(_this.sidebarReturnLinkQuery());
        _this.successMessage = new Subject_1.Subject();
        _this.isDataLoaded.next(false);
        _this.fakeData = new fake_data_service_1.FakeDataService;
        _this.setPanels();
        return _this;
    }
    AppService.prototype.setPanels = function () {
        var panels = {
            offer: {
                edit_mode: 'view'
            }
        };
        this.setAppData('panels', panels);
    };
    /**
     * @returns {boolean}
     */
    AppService.prototype.hasData = function () {
        return !!this.getAppData(['countries']);
    };
    /**
     *  Load the data then tell all the subscribers about the new status
     */
    AppService.prototype.loadData = function () {
        var _this = this;
        var localDataToLoad = this.appData.localDataTypes;
        //appDataTypes
        var initialDataTypes = {}, funcName = '';
        for (var key in localDataToLoad) {
            if (localDataToLoad.hasOwnProperty(key)) {
                funcName = 'getFake' + _.startCase(localDataToLoad[key]).replace(/\s+/g, '');
                if (undefined !== this.fakeData[funcName]) {
                    // console.log('getting Fake  - ' + localDataToLoad[key] + ' - calling ' + funcName);
                    initialDataTypes[localDataToLoad[key]] = this.fakeData[funcName]();
                }
                else {
                    funcName = 'get' + _.startCase(localDataToLoad[key]).replace(/\s+/g, '');
                    if (undefined !== this.appData[funcName]) {
                        initialDataTypes[localDataToLoad[key]] = this.appData[funcName]();
                    }
                }
            }
        }
        this.setAppData('initialDataTypes', initialDataTypes);
        if (this.appData.remoteDataTypes.length) {
            var remoteDataToLoad = this.appData.remoteDataTypes;
            var _loop_1 = function (key) {
                var dataType = remoteDataToLoad[key];
                var dataTypeEndpoint = dataType;
                if (undefined !== dataType.endpoint) {
                    dataTypeEndpoint = dataType.endpoint;
                }
                this_1.getRemoteAppData(dataTypeEndpoint)
                    .then(function (data) { return _this._setAppDataFromRemote(dataType, data); });
            };
            var this_1 = this;
            for (var key in remoteDataToLoad) {
                _loop_1(key);
            }
        }
        else {
            this.setAppData('appDataTypes', initialDataTypes);
            // this.isDataLoaded.next(true);
        }
    };
    AppService.prototype._setAppDataFromRemote = function (dataType, data) {
        var dataTypeName = dataType;
        if (undefined !== dataType.name) {
            dataTypeName = dataType.name;
        }
        var appDataTypes = this.getAppData('initialDataTypes');
        appDataTypes[dataTypeName] = data;
        this.setAppData('appDataTypes', appDataTypes);
        // if (this.appDataLoaded === this.appData.remoteDataTypes.length) {
        this.isDataLoaded.next(true);
        // }
    };
    AppService.prototype.getAll = function (entity_type) {
        var _this = this;
        if (undefined === entity_type) {
            entity_type = this.entity_type;
        }
        var url = this.apiUrl + "/" + entity_type;
        if (this.dev_mode !== 'jit') {
            url += '/getall/';
        }
        return this.http.get(url)
            .toPromise()
            .then(function (response) {
            var responseValue = _this._getResponseValue(response);
            _this._log(response.url + ": Fetched " + responseValue.length + " entities.", 'MSG');
            return responseValue;
        })
            .catch(this._handleError);
    };
    AppService.prototype.getAllJoinLinked = function (entity_type) {
        var _this = this;
        return this.getAll(entity_type)
            .then(function (entityItems) { return _this._getAllJoinLinkedProcess1(entityItems); });
    };
    AppService.prototype._getAllJoinLinkedProcess1 = function (entityItems) {
        if (undefined === entityItems) {
            return Promise.resolve([]);
        }
        var promises_array = [];
        var processedResponseValue = [];
        for (var _i = 0, entityItems_1 = entityItems; _i < entityItems_1.length; _i++) {
            var entityItm = entityItems_1[_i];
            promises_array.push(this._getAllJoinLinkedProcess2(entityItm, processedResponseValue));
        }
        return Promise.all(promises_array);
    };
    AppService.prototype._getAllJoinLinkedProcess2 = function (entityItm, processedResponseValue) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this._getAllJoinLinkedProcess3(entityItm, processedResponseValue));
        });
    };
    AppService.prototype._getAllJoinLinkedProcess3 = function (entityItm, processedResponseValue) {
        var _this = this;
        return this.getOne(entityItm['BudgetId'], 'budget')
            .then(function (relatedEntity) {
            if (undefined === relatedEntity || null === relatedEntity) {
                return Promise.resolve([]);
            }
            var manyToManyColumns = _this.getAssociatedEntityManyToManyColumns('BUA');
            console.log('manyToManyColumns  ' + JSON.stringify(manyToManyColumns));
            if (undefined === manyToManyColumns || [] === manyToManyColumns) {
                debugger;
            }
            for (var col in manyToManyColumns) {
                if (manyToManyColumns.hasOwnProperty(col)) {
                    entityItm[manyToManyColumns[col]] = relatedEntity[manyToManyColumns[col]];
                }
            }
            processedResponseValue.push(entityItm);
            return Promise.resolve(entityItm);
        });
    };
    AppService.prototype.getOne = function (id, entity_type) {
        var _this = this;
        if (undefined === entity_type) {
            entity_type = this.entity_type;
        }
        var entityPk = this.getEntityPk(this.getEntityAbbrFromType(entity_type));
        var url = this.apiUrl + "/" + entity_type + "/getbyid/" + id + "/";
        if (this.dev_mode === 'jit') {
            url = this.apiUrl + "/" + entity_type + "/?" + entityPk + "=^" + id + "d*$";
        }
        return this.http.get(url)
            .toPromise()
            .then(function (response) {
            var responseValue = _this._getResponseValue(response);
            if (_this.dev_mode === 'jit') {
                return responseValue[0];
            }
            else {
                return responseValue;
            }
        })
            .catch(this._handleError);
    };
    AppService.prototype.saveOne = function (entityItm, entityAbbr) {
        var _this = this;
        var entity_type = this.getAppData('formEntityType');
        if (undefined !== entityAbbr) {
            entity_type = this.getEntityTypeFromAbbr(entityAbbr);
        }
        if (undefined !== entityItm._data) {
            var _data = entityItm._data, cleanEntityItm = __rest(entityItm, ["_data"]);
            _data = '';
            if (undefined !== entityItm._data.entityType) {
                entity_type = entityItm._data.entityType;
            }
            entityItm = cleanEntityItm;
        }
        if (undefined === entityAbbr) {
            entityAbbr = this.getEntityAbbrFromType(entity_type);
        }
        var url = this.apiUrl + "/" + entity_type + "/save";
        if (this.dev_mode === 'jit') {
            url = this.apiUrl + "/" + entity_type;
            entityItm['Id'] = entityItm[this.getEntityPk(entityAbbr)]; // @TODO: do this at in_memory_data_services
        }
        else {
            // @TODO: Solve in API/database
            switch (entity_type) {
                case 'advertiser':
                    entityItm.AdvertiserName = entityItm.CompanyName;
                    break;
            }
        }
        var payLoad = JSON.stringify(entityItm);
        console.log('saving one. Payload:: ' + url + ' ' + payLoad);
        return this.http
            .post(url, payLoad, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            _this.MSG('RESULT -> ' + JSON.stringify(response));
            var responseValue = _this._getResponseValue(response);
            return responseValue;
        })
            .catch(this._handleError);
    };
    AppService.prototype.getRemoteAppData = function (requestedValue) {
        var _this = this;
        var url = this.apiUrl + "/" + requestedValue + "/getall";
        if (this.dev_mode === 'jit') {
            url = this.apiUrl + "/" + requestedValue;
        }
        return this.http.get(url)
            .toPromise()
            .then(function (response) {
            var responseValue = _this._getResponseValue(response);
            return responseValue;
        })
            .catch(this._handleError);
    };
    AppService.prototype.setAppData = function (dataType, value) {
        this.appData[dataType] = value;
    };
    AppService.prototype.getAppData = function (dataToRequest) {
        if (typeof dataToRequest === 'string') {
            return this.appData[dataToRequest];
        }
        var output = {};
        for (var i = 0; i < dataToRequest.length; i++) {
            output[dataToRequest[i]] = this.appData[dataToRequest[i]];
        }
        return output;
    };
    /**
     * @returns {Observable<T>}
     */
    // sidebarEntityType(): Observable<string> {
    //   return this.sidebarEntitySubject.asObservable();
    // }
    AppService.prototype.allPanelsToViewModeObserve = function () {
        return this.allPanelsToViewModeSubject.asObservable();
    };
    AppService.prototype.allPanelsToViewModeQuery = function () {
        return this.getAppData('allPanelsToViewMode');
    };
    /**
     * Observes requests from Main Form
     * @returns {Observable<T>}
     */
    AppService.prototype.formDataLoadedObserve = function () {
        return this.formDataLoadedSubject.asObservable();
    };
    AppService.prototype.formDataLoadedQuery = function () {
        return this.getAppData('formDataLoaded');
    };
    AppService.prototype.setFormDataLoaded = function (value) {
        this.setAppData('formDataLoaded', value);
        this.formDataLoadedSubject.next(value);
    };
    AppService.prototype.formDataSavedObserve = function () {
        return this.formDataSavedSubject.asObservable();
    };
    AppService.prototype.formDataSavedQuery = function () {
        return this.getAppData('formSubmittedAndSaved');
    };
    /**
     * Observes a request for opening an Entity Link
     * @returns {Observable<T>}
     */
    AppService.prototype.sidebarEntityLinkQueuedObserve = function () {
        return this.sidebarEntityLinkQueuedSubject.asObservable();
    };
    AppService.prototype.sidebarEntityLinkFormQueuedObserve = function () {
        return this.sidebarEntityLinkFormQueuedSubject.asObservable();
    };
    /**
     * Observes a request for opening AppSidebar
     * @returns {Observable<T>}
     */
    AppService.prototype.sidebarShownQueuedObserve = function () {
        return this.sidebarShownQueuedSubject.asObservable();
    };
    /**
     * Observes a request for opening AppSidebar
     * @returns {Observable<T>}
     */
    AppService.prototype.sidebarFormShownQueuedObserve = function () {
        return this.sidebarFormShownQueuedSubject.asObservable();
    };
    AppService.prototype.sidebarHideQueuedObserve = function () {
        return this.sidebarHideQueuedSubject.asObservable();
    };
    AppService.prototype.sidebarEntityLinkQueuedQuery = function () {
        return this.getAppData('sidebarEntityLinkQueued');
    };
    AppService.prototype.sidebarEntityLinkFormQueuedQuery = function () {
        return this.getAppData('sidebarEntityLinkFormQueued');
    };
    AppService.prototype.sidebarShowQueuedQuery = function () {
        return this.getAppData('sidebarShownQueued');
    };
    AppService.prototype.sidebarFormShowQueuedQuery = function () {
        return this.getAppData('sidebarFormShownQueued');
    };
    AppService.prototype.sidebarHideQueuedQuery = function () {
        return this.getAppData('sidebarHideQueued');
    };
    //
    AppService.prototype.sidebarReturnLinkObserve = function () {
        return this.sidebarReturnLinkSubject.asObservable();
    };
    AppService.prototype.sidebarReturnLinkQuery = function () {
        return this.getAppData('sidebarReturnLinkQueued');
    };
    AppService.prototype.showEntityInSidebar = function (entityAbbr) {
        this.setsidbarEntityData(entityAbbr);
        this.setAppData('sidebarShownQueued', true);
        this.sidebarShownQueuedSubject.next(true);
    };
    AppService.prototype.showEntityLink = function (entityAbbr) {
        if (this.associatedEntityIsManyToMany(entityAbbr)) {
            entityAbbr = this.getLinkingEntityAbbr(entityAbbr);
        }
        this.setsidbarEntityData(entityAbbr);
        if (this.isFIC1()) {
            this.setAppData('sidebarEntityLinkFormQueued', true);
            this.sidebarEntityLinkFormQueuedSubject.next(true);
        }
        else {
            this.setAppData('sidebarEntityLinkQueued', true);
            this.sidebarEntityLinkQueuedSubject.next(true);
        }
    };
    AppService.prototype.showEntityInSidebarForm = function (entityAbbr) {
        var sidebarFormEntityAbbr = entityAbbr;
        if (this.associatedEntityIsManyToMany(entityAbbr)) {
            sidebarFormEntityAbbr = this.getLinkingEntityAbbr(entityAbbr);
        }
        console.log('sidebarFormEntityAbbr ' + sidebarFormEntityAbbr);
        this.setAppData('sidebarFormEntityAbbr', sidebarFormEntityAbbr);
        this.setAppData('sidebarFormShownQueued', true);
        this.sidebarFormShownQueuedSubject.next(true);
    };
    // showEntityInForm(entityType: string, filterData: any): void {
    //   this.setAppData('sidebarFormShown', true);
    // }
    AppService.prototype.capitalize = function (str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    };
    AppService.prototype.getEntityPk = function (entityAbbr) {
        // if (undefined === entityAbbr){
        //   entityAbbr = this.app.getAppData('sidebarEntityAbbr');
        // }
        if (undefined === this.getAppData('entities')[entityAbbr]) {
            debugger;
        }
        return this.getAppData('entities')[entityAbbr].pk;
    };
    AppService.prototype.getEntityAbbrFromType = function (entityType) {
        for (var key in this.getAppData('entities')) {
            if (this.getAppData('entities').hasOwnProperty(key)) {
                var entityItm = this.getAppData('entities')[key];
                if (entityItm.name.toLowerCase() === entityType.toLowerCase()) {
                    return key;
                }
            }
        }
    };
    AppService.prototype.getEntityTypeFromAbbr = function (entityAbbr) {
        for (var key in this.getAppData('entities')) {
            if (this.getAppData('entities').hasOwnProperty(key)) {
                var entityItm = this.getAppData('entities')[key];
                if (key === entityAbbr) {
                    return entityItm.name.toLowerCase();
                }
            }
        }
    };
    /**
     * setsidbarEntityMetaData
     *
     * @param entityAbbr
     */
    AppService.prototype.setsidbarEntityData = function (entityAbbr) {
        if (undefined === this.getAppData('entities')[entityAbbr]) {
            return;
        }
        var entityType = this.getAppData('entities')[entityAbbr].name.toLowerCase();
        this.setAppData('sidebarEntityType', entityType);
        this.setAppData('sidebarEntityAbbr', entityAbbr);
    };
    AppService.prototype.str_capitalize = function (str) {
        return str[0].toUpperCase() + str.slice(1);
    };
    AppService.prototype.getFormattedEntityId = function (entityAbbr, entityIdValue) {
        return '<span class="badge badge-default badge-itm-id-wrapper"><span class="badge-itm-abbr"> '
            + entityAbbr + '</span><span class="badge-itm-id"> -'
            + entityIdValue + '</span></span>';
    };
    AppService.prototype.EOA_EntityNew = function ($event) {
        this.stopEventPropagation($event);
        var entityType = this.getEntityTypeFromAbbr(this.getAppData('listEntityAbbr'));
        this.router.navigate(["/" + entityType + "/new"]);
        this.setAppData('sidebarShown', false);
    };
    AppService.prototype.EOA_EntityList = function ($event) {
        if (undefined !== event) {
            this.stopEventPropagation($event);
        }
        this.router.navigate(["/" + this.getAppData('formEntityType')]);
        this.setAppData('sidebarShown', false);
    };
    AppService.prototype.EOA_NavigateTo = function (where, $event) {
        if (undefined !== $event) {
            this.stopEventPropagation($event);
        }
        switch (where) {
            case 'home':
                this.router.navigate(["/"]);
                return;
            case 'back':
                if (this.getAppData('sidebarFormShown')) {
                    this.sidebarHideQueuedSubject.next(true);
                }
                else {
                    this.location.back();
                }
                return;
            case 'prev':
                break;
            case 'next':
                break;
            case 'current_entity_list':
                this.EOA_EntityList();
                return;
        }
        if (where !== 'back') {
            var curr_id = parseInt(this.router.url.split('/')[2], 10);
            if (typeof curr_id !== 'number') {
                return;
            }
            var future_id = curr_id + 1;
            if (where === 'prev') {
                if (curr_id === 1) {
                    return;
                }
                future_id = curr_id - 1;
            }
            this.router.navigate(["/" + this.getAppData('formEntityType') + "/" + future_id]);
            this.sidebarHideQueuedSubject.next(true);
        }
    };
    /**
     * @deprecated since 1.2.0
     */
    AppService.prototype.goBack = function ($event) {
        this.EOA_NavigateTo('back', $event);
    };
    AppService.prototype.getEntitySidebarFilterFields = function (entityAbbr) {
        return this.appData.entities[entityAbbr].sidebarFilterFields;
    };
    AppService.prototype.getEntitySidebarSearchFields = function (entityAbbr) {
        return this.appData.entities[entityAbbr].sidebarSearchFields;
    };
    AppService.prototype.changeSuccessMessage = function (msg) {
        this.successMessage.next(new Date() + " - " + msg + ".");
    };
    AppService.prototype.getAssociatedEntityColumns = function (entityAbbr) {
        if (undefined === this.getAppData('entities')[this.getAppData('formEntityAbbr')]
            || undefined === this.getAppData('entities')[this.getAppData('formEntityAbbr')].associatedEntities
            || undefined === this.getAppData('entities')[this.getAppData('formEntityAbbr')].associatedEntities[entityAbbr]
            || undefined === this.getAppData('entities')[this.getAppData('formEntityAbbr')].associatedEntities[entityAbbr].columns) {
            return;
        }
        return this.getAppData('entities')[this.getAppData('formEntityAbbr')].associatedEntities[entityAbbr].columns;
    };
    AppService.prototype.getAssociatedEntityBindColumn = function (childEntityAbbr) {
        var associatedEntityBindColumn = '';
        if (this.getAppData('formEntityAbbr') === 'FIC') {
            associatedEntityBindColumn = this.getAppData('entities')['FIL'].associatedEntities[childEntityAbbr].bindColumn;
        }
        else {
            var associatedEntities = this.getAppData('entities')[this.getAppData('formEntityAbbr')]
                .associatedEntities;
            if (undefined !== associatedEntities[childEntityAbbr]) {
                associatedEntityBindColumn = associatedEntities[childEntityAbbr].bindColumn;
            }
        }
        return associatedEntityBindColumn;
    };
    AppService.prototype.associatedEntityIsManyToMany = function (childEntityAbbr) {
        var formEntityAssociatedEntities = this.getAppData('entities')[this.getAppData('formEntityAbbr')].associatedEntities;
        if (undefined === formEntityAssociatedEntities) {
            this._log('Entity has no associatedEntities defined.', 'MSG');
            return false;
        }
        var associatedEntities = formEntityAssociatedEntities[childEntityAbbr];
        if (undefined === associatedEntities) {
            for (var formEntityAssociatedEntity in formEntityAssociatedEntities) {
                if (formEntityAssociatedEntities.hasOwnProperty(formEntityAssociatedEntity)) {
                    var itm = formEntityAssociatedEntities[formEntityAssociatedEntity];
                    if (itm.linkingEntityAbbr === childEntityAbbr && itm.manyToMany) {
                        return true;
                    }
                }
            }
        }
        return (undefined !== associatedEntities
            && undefined !== associatedEntities.manyToMany);
    };
    AppService.prototype.getAssociatedEntityManyToManyFromChildEntityAbbr = function (childEntityAbbr) {
        var formEntityAssociatedEntities = this.getAppData('entities')[this.getAppData('formEntityAbbr')].associatedEntities;
        for (var formEntityAssociatedEntity in formEntityAssociatedEntities) {
            if (formEntityAssociatedEntities.hasOwnProperty(formEntityAssociatedEntity)) {
                var itm = formEntityAssociatedEntities[formEntityAssociatedEntity];
                if (itm.linkingEntityAbbr === childEntityAbbr && itm.manyToMany) {
                    return formEntityAssociatedEntity;
                }
            }
        }
    };
    AppService.prototype.getLinkingEntityAbbr = function (childEntityAbbr) {
        return this.getAppData('entities')[this.getAppData('formEntityAbbr')].associatedEntities[childEntityAbbr].linkingEntityAbbr;
    };
    AppService.prototype._getEntityLinkingToken = function (childEntityAbbr) {
        var linkingEntityAbbr = this.getLinkingEntityAbbr(childEntityAbbr);
        var entityLinkingToken = '_' + linkingEntityAbbr + '_';
        return entityLinkingToken;
    };
    AppService.prototype.getAssociatedEntityManyToManyColumns = function (childEntityAbbr) {
        var associatedEntityColumns = this.getAssociatedEntityColumns(childEntityAbbr);
        var associatedEntityManyToManyColumns = [];
        var entityLinkingToken = this._getEntityLinkingToken(childEntityAbbr);
        for (var col in associatedEntityColumns) {
            if (associatedEntityColumns.hasOwnProperty(col)) {
                for (var i = 0; i < associatedEntityColumns[col].length; i++) {
                    if (associatedEntityColumns[col][i].indexOf(entityLinkingToken) !== -1) {
                        associatedEntityManyToManyColumns.push(associatedEntityColumns[col][i]
                            .replace(entityLinkingToken, ''));
                    }
                }
            }
        }
        return associatedEntityManyToManyColumns;
    };
    AppService.prototype.stopEventPropagation = function ($event) {
        if (undefined === $event) {
            return;
        }
        $event.preventDefault();
        $event.stopPropagation();
    };
    AppService.prototype.getEntityData = function (entityItm, column_name) {
        // entityItm[getAssociatedEntityColumnItems(col)[0]]
        if (typeof column_name === 'string') {
            return entityItm[column_name];
        }
        if (this._associatedEntityColumnGroupIsComposite(column_name)) {
            var entityDataOutput = '';
            for (var _i = 0, column_name_1 = column_name; _i < column_name_1.length; _i++) {
                var col_itm = column_name_1[_i];
                if (this._associatedEntityColumnIsLookup(col_itm)) {
                    if (undefined !== entityItm[col_itm.fieldName]) {
                        var filterLookupValues = this.getAppData('appDataTypes')[col_itm.lookupName];
                        for (var _a = 0, filterLookupValues_1 = filterLookupValues; _a < filterLookupValues_1.length; _a++) {
                            var filterLookupValue = filterLookupValues_1[_a];
                            if (filterLookupValue.key === entityItm[col_itm.fieldName]) {
                                entityDataOutput += filterLookupValue.value;
                            }
                        }
                    }
                }
                else {
                    entityDataOutput += col_itm.replace(/"/g, '');
                }
            }
            return entityDataOutput;
        }
    };
    AppService.prototype._associatedEntityColumnGroupIsComposite = function (column_name) {
        return typeof column_name === 'object';
    };
    AppService.prototype._associatedEntityColumnIsLookup = function (col_itm) {
        return typeof col_itm === 'object';
    };
    AppService.prototype.openFilterCondition = function (entityItm) {
        var data = {
            entity: entityItm
        };
        this.setAppData('formNewRecord', true);
        this.setAppData('FIC_DATA', data);
        this.showEntityInSidebarForm('FIC');
    };
    AppService.prototype.setFormDummyData = function (form) {
        form.controls['CreatedDate'].setValue(this._formatDate(new Date().toString()));
        form.controls['CreatedBy'].setValue(1);
        form.controls['LastModifiedBy'].setValue(1);
        form.controls['LastModifiedDate'].setValue(this._formatDate(new Date().toString()));
    };
    AppService.prototype.getFilterConditionGroupFromId = function (id) {
        var filterConditionGroups = this.getAppData('initialDataTypes')['filterConditionGroup'];
        var Group = _.find(filterConditionGroups, ['key', _.toInteger(id)]);
        return Group;
    };
    AppService.prototype._formatDate = function (strDate) {
        return moment(strDate).format('MM/DD/YYYY');
    };
    AppService.prototype.isFIC = function () {
        return this.getAppData('sidebarEntityAbbr') === 'FIO';
    };
    AppService.prototype.isFIC1 = function () {
        return this.getAppData('formEntityAbbr') === 'FIL';
    };
    AppService.prototype._getRandomArbitrary = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return AppService;
}(base_service_1.BaseService));
AppService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router,
        common_1.Location])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map