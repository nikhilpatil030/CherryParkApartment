import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule,InputIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
    ngOnInit() {
        this.items = [
          { label: 'Home', icon: 'pi pi-home', routerLink: '/home', items: [
            { label: 'Shedule a Tour', icon: 'pi pi-clock', routerLink: '/sheduletour'},
            { label: 'Your information', icon: 'pi pi-check-circle' , routerLink: '/visitorinfo'},
            { label: 'Amenities', icon: 'pi pi-building', routerLink: '/amenities'},
            {label: 'Photo Gallery', icon: 'pi pi-images', routerLink: '/photogallery'},
            {label: 'Reviews', icon: 'pi pi-comments', routerLink: '/reviews'}
          ]},
          { label: 'About', icon: 'pi pi-book', routerLink: '/about'},
          { label: 'Residents', icon: 'pi pi-users', routerLink: '/residents' },
          { label: 'Floor Plans', icon: 'pi pi-sitemap' , routerLink: '/floorplans'},
          { label: 'Contact Us', icon: 'pi pi-phone' , routerLink: '/contactus'},
          { label: 'Directions', icon: 'pi pi-directions' , routerLink: '/directions'}
        ]

    }
}
