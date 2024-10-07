import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { noCacheGuard } from './no-cache.guard';

describe('noCacheGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => noCacheGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
