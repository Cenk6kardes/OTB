import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluidSectionComponent } from './fluid-section.component';

describe('FluidSectionComponent', () => {
  let component: FluidSectionComponent;
  let fixture: ComponentFixture<FluidSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FluidSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluidSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
