import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { classeGuard } from './classe.guard';

describe('classeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => classeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
