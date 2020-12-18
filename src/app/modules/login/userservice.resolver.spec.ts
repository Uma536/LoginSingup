import { TestBed } from '@angular/core/testing';

import { UserserviceResolver } from './userservice.resolver';

describe('UserserviceResolver', () => {
  let resolver: UserserviceResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserserviceResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
