import { TestBed } from '@angular/core/testing';

import { HuchaService } from './hucha.service';

describe('HuchaService', () => {
  let service: HuchaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HuchaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
