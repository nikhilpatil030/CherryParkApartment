import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorinfoComponent } from './visitorinfo.component';

describe('VisitorinfoComponent', () => {
  let component: VisitorinfoComponent;
  let fixture: ComponentFixture<VisitorinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitorinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
