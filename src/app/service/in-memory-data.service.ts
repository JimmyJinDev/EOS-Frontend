import { InMemoryBackendConfigArgs, InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { ResponseOptions } from '@angular/http';
import { FakeDataService } from './fake-data.service';

export class InMemoryDataService implements InMemoryDbService {

  public fakeData: FakeDataService

  createDb() {
    this.fakeData = new FakeDataService;
    return this.fakeData.createFakeData();
  }

  responseInterceptor(res: ResponseOptions, ri: RequestInfo) {
    return res;
  }
}
