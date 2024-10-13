import { Component, ViewEncapsulation } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-sheduletour',
  standalone: true,
  imports: [CardModule,FormsModule,ReactiveFormsModule,ButtonModule,CommonModule,CalendarModule],
  templateUrl: './sheduletour.component.html',
  styleUrl: './sheduletour.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SheduletourComponent {
    guidedTour: string = "We're excited to see you! For a guided tour, please meet with our professional Leasing Team five minutes prior to your appointment time in our Leasing Office."; 
    officeInfo: string = '123 Main St. Anytown, USA 12345\n phone: 355-555-5555\n email: 6oH5f@example.com'; 
    hours: string = 'Monday: 9 AM to- 6 PM\nTuesday: 9 AM to- 6 PM\nWednesday: 9 AM to- 6 PM\nThursday: 9 AM to- 6 PM\nFriday: 9 AM to- 6 PM\nSaturday: 10 AM to- 5 PM\nSunday: Closed';

    tourForm: FormGroup;

    constructor(  private fb: FormBuilder) {
      this.tourForm = this.fb.group({
        date: ['', Validators.required],
        time: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        phoneNumber: ['', Validators.required, Validators.pattern('^[0-9]*$')]
      });
    } 

    onSubmitTour() { 
      console.log(this.tourForm.value);
    }
}
