import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/Authorization/auth.service';

@Component({
  selector: 'app-residents-login-welcome',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule],
  templateUrl: './residents-login-welcome.component.html',
  styleUrl: './residents-login-welcome.component.scss'
})
export class ResidentsLoginWelcomeComponent {
   
  constructor(private route: ActivatedRoute , private router: Router, private authService: AuthService) {}

  loggedInResidentData: any;
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(() => {
      const token = localStorage.getItem('token');
      if (token) { 
        this.loggedInResidentData = this.authService.decodeToken(token);
      }else{
        this.router.navigate(['/residents']);
      }
    });
  }

  logout() {
    this.router.navigate(['/residents']);
  }
}
