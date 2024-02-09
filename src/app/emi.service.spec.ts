import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {EmiService} from './emi.service';
import {EmiArguments} from "../shared/model/EmiArguments";

describe('EmiService', () => {
  let service: EmiService;
  let httpController: HttpTestingController;

  let url = 'http://127.0.0.1:8080';


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

  it('should call calculate and return an array of results', () => {
    const emiArguments = new EmiArguments(150000, 9.25, 30);

    service.calculate(emiArguments).subscribe((res) => {
      expect(res).toEqual({
        "success": true,
        "amount": 12340.13
      });
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}/v1/calculator/emi`,
    });

    req.flush({
      "success": true,
      "amount": 12340.13
    });
  });

  it('should call getHistory and return an array of results', () => {

    service.getHistory().subscribe((res) => {
      expect(res).toEqual({
        "success": true,
        "history": [
          880.55,
          880.55,
          121.25,
          914.74
        ]
      });
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/v1/calculator/history`,
    });

    req.flush({
      "success": true,
      "history": [
        880.55,
        880.55,
        121.25,
        914.74
      ]
    });
  });

});
