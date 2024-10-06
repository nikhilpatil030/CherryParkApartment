import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentsLoginWelcomeComponent } from './residents-login-welcome.component';

describe('ResidentsLoginWelcomeComponent', () => {
  let component: ResidentsLoginWelcomeComponent;
  let fixture: ComponentFixture<ResidentsLoginWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentsLoginWelcomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentsLoginWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
