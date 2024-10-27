import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { noLoggedInGuard } from './no-logged-in.guard';

describe('noLoggedInGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => noLoggedInGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
