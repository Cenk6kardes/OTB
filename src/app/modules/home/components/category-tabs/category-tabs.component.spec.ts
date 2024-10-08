import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTabsComponent } from './category-tabs.component';

describe('PagesComponent', () => {
  let component: PageTabsComponent;
  let fixture: ComponentFixture<PageTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});