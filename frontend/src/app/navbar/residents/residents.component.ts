import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { GalleriaModule} from 'primeng/galleria';
import { LoggerService } from '../../services/logger/logger.service';
import { Router } from '@angular/router';

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
  registerForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private logger: LoggerService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      personalIdentification: ['', Validators.required]
    });
  }

  backgroundImageUrl: any;
  ngOnInit(): void {
    this.backgroundImageUrl = residentsConfig.backgroundImageUrl
  }

  onRegister() {
    if (this.registerForm.valid) {
      // Simulate a register service
      this.http.post(serverConfig.serverApi + residentsConfig.registerResident,this.registerForm.value).subscribe(res => {
        this.logger.info('residents','Register successful : ' + JSON.stringify(res));
        alert('Register successful : ' + JSON.stringify(res));
      },error => {
        this.logger.error('residents','Error while registering: ' + JSON.stringify(error) );
        alert('Error while registering: ' + JSON.stringify(error) );
      });
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Simulate a login service
      this.http.post(serverConfig.serverApi + residentsConfig.verifyResident,this.loginForm.value).subscribe((res:any) => {
        this.logger.info('residents','Login successful : ' + JSON.stringify(res));
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/residentsLoginWelcome']);
        }else{
          this.logger.info('residents','Token not found for login');
        }
      },error => {
        this.logger.error('residents','Invalid credentials : ' + JSON.stringify(error) );
        alert('Invalid credentials : ' + JSON.stringify(error) );
      });
    }
  }
}
