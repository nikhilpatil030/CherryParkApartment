import { Component, ViewEncapsulation } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [CardModule,FormsModule,ReactiveFormsModule,ButtonModule,CommonModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ContactusComponent {
    phone: string = '355-555-5555';
    email: string = 'abcdefgh.com'; 
    address: string = '123 Main St. Anytown, USA 12345'; 
    hours: string = 'Monday: 9 AM to- 6 PM\nTuesday: 9 AM to- 6 PM\nWednesday: 9 AM to- 6 PM\nThursday: 9 AM to- 6 PM\nFriday: 9 AM to- 6 PM\nSaturday: 10 AM to- 5 PM\nSunday: Closed';

    messageForm: FormGroup;

    constructor(  private fb: FormBuilder) {
      this.messageForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        phoneNumber: ['', Validators.required, Validators.pattern('^[0-9]*$')],
        message: ['', Validators.required]
      });
    } 

    backgroundImageUrl: any;
    ngOnInit(): void {
      this.backgroundImageUrl = "https://storage-asset.msi.com/template/images/contact_us/kv-contact-us-xs.jpg"
    }

    onSendMessage() { 
      console.log(this.messageForm.value);
    }
}
