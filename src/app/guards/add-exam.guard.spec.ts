import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { addExamGuard } from './guards/add-exam.guard';

describe('addExamGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => addExamGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
