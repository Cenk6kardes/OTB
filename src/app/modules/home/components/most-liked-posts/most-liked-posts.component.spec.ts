import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostLikedPostsComponent } from './most-liked-posts.component';

describe('MostLikeComponent', () => {
  let component: MostLikedPostsComponent;
  let fixture: ComponentFixture<MostLikedPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostLikedPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostLikedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
