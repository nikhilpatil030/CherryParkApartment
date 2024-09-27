import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorplansComponent } from './floorplans.component';

describe('FloorplansComponent', () => {
  let component: FloorplansComponent;
  let fixture: ComponentFixture<FloorplansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloorplansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloorplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
