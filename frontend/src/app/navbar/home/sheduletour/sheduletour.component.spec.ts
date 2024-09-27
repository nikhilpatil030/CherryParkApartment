import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheduletourComponent } from './sheduletour.component';

describe('SheduletourComponent', () => {
  let component: SheduletourComponent;
  let fixture: ComponentFixture<SheduletourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheduletourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheduletourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
