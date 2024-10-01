import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { GalleriaModule} from 'primeng/galleria';
import { error } from 'console';

var serverConfig =  require ("../../../config/serverConfig.json");
var residentsConfig = require ("./residentsConfig.json");

@Component({
  selector: 'app-residents',
  standalone: true,
  imports: [HttpClientModule,CardModule,FormsModule,ReactiveFormsModule,ButtonModule,CommonModule,GalleriaModule],
  templateUrl: './residents.component.html',
  styleUrl: './residents.component.scss'
})
export class ResidentsComponent {

  loginForm: FormGroup ;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  backgroundImageUrl: any;
  ngOnInit(): void {
    this.backgroundImageUrl = residentsConfig.backgroundImageUrl
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Simulate a login service
      this.http.post(serverConfig.serverApi + residentsConfig.verifyResident,this.loginForm.value).subscribe(res => {
        alert('Login successful : ' + JSON.stringify(res));
      },error => {
        alert('Invalid credentials : ' + JSON.stringify(error) );
      });
    }
  }
}
