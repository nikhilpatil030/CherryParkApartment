import { Component ,ViewEncapsulation} from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { LoggerService } from '../../services/logger/logger.service';
import { Router } from '@angular/router';

var employeesConfig = require ("./employeesConfig.json");
var serverConfig =  require ("../../../config/serverConfig.json");

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CardModule,ReactiveFormsModule,ButtonModule,CommonModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EmployeesComponent {

  
  employeeLoginForm: FormGroup;

  constructor(private fb: FormBuilder,private http: HttpClient, private logger: LoggerService, private router: Router, private cookieService: CookieService) {
    this.employeeLoginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  backgroundImageUrl: any;
  ngOnInit(): void {
    this.backgroundImageUrl = employeesConfig.backgroundImageUrl
  }

  onSubmit() {
    if (this.employeeLoginForm.valid) {
      // Simulate a login service
      const headers = new HttpHeaders({
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      this.http.post(serverConfig.serverApi + employeesConfig.verifyEmployee,this.employeeLoginForm.value,{headers}).subscribe((res:any) => {
        this.logger.info('employees','Login successful for employees : ' + JSON.stringify(res));
        if (res.token) {
          this.cookieService.set('employee-token', res.token, 1);
          this.router.navigate(['/employeeLoggedIn']);
        }else{
          this.logger.info('employees','Token not found for employees login');
        }
      },error => {
        this.logger.error('employees','Invalid credentials for employees : ' + JSON.stringify(error) );
        alert('Invalid Credentials');
      });
    }
  }
}
