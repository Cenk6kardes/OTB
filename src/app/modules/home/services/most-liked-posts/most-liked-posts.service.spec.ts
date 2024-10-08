import { TestBed } from '@angular/core/testing';

import { MostLikedPostsService } from './most-liked-posts.service';

describe('MostLikedPostsService', () => {
  let service: MostLikedPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostLikedPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
