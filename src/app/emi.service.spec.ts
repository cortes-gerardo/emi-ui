import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {EmiService} from './emi.service';

describe('EmiService', () => {
  let service: EmiService;
  let httpController: HttpTestingController;

  let url = 'localhost:8080';


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EmiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should call getHistory and return an array of results', () => {

    service.getHistory().subscribe((res) => {
      expect(res).toEqual([1,2,3,4]);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/v1/calculator/history`,
    });

    req.flush([1,2,3,4]);
  });

});
