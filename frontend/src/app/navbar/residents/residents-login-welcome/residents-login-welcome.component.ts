import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/Authorization/auth.service';
import { PanelMenuModule } from  'primeng/panelmenu';

@Component({
  selector: 'app-residents-login-welcome',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule, PanelMenuModule],
  templateUrl: './residents-login-welcome.component.html',
  styleUrl: './residents-login-welcome.component.scss'
})
export class ResidentsLoginWelcomeComponent {
   
  constructor(private route: ActivatedRoute , private router: Router, private authService: AuthService) {}

  loggedInResidentData: any;
  isMenuVisible = false;
  ngOnInit(): void {
    window.addEventListener('popstate', () => {
      localStorage.removeItem('token');
      this.router.navigate(['/residents']);
    });
    this.route.queryParams.subscribe(() => {
      const token = localStorage.getItem('token');
      if (token) { 
        this.loggedInResidentData = this.authService.decodeToken(token);
      }else{
        this.router.navigate(['/residents']);
      }
    });
  }

  items = [
    {
      label: 'Payments',
      icon: 'pi pi-money-bill',
      routerLink: '/residentsLoginWelcome'
    },
    {
      label: 'Maintenance Request',
      icon: 'pi pi-wrench',
      routerLink: '/residentsLoginWelcome'
    },
    {
      label: 'Lease Info',
      icon: 'pi pi-info-circle',
      routerLink: '/residentsLoginWelcome'
    },
    {
      label: 'Documents',
      icon: 'pi pi-file',
      routerLink: '/residentsLoginWelcome'
    }
  ];


  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/residents']);
  }
}
