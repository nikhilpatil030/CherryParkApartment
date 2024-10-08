import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { AboutComponent } from '../src/app/navbar/about/about.component';
import { SheduletourComponent } from '../src/app/navbar/home/sheduletour/sheduletour.component';
import { AmenitiesComponent } from '../src/app/navbar/home/amenities/amenities.component';
import { BackgroundComponent } from '../src/app/navbar/background/background.component';
import { VisitorinfoComponent } from '../src/app/navbar/home/visitorinfo/visitorinfo.component';
import { PhotogalleryComponent } from '../src/app/navbar/home/photogallery/photogallery.component';
import { ReviewsComponent } from '../src/app/navbar/home/reviews/reviews.component';
import { EmployeesComponent } from '../src/app/navbar/employees/employees.component';
import { ResidentsComponent } from '../src/app/navbar/residents/residents.component';
import { FloorplansComponent } from '../src/app/navbar/floorplans/floorplans.component';
import { ContactusComponent } from '../src/app/navbar/contactus/contactus.component';
import { DirectionsComponent } from '../src/app/navbar/directions/directions.component';
import { ResidentsLoginWelcomeComponent } from '../src/app/navbar/residents/residents-login-welcome/residents-login-welcome.component';
import { provideHttpClient } from '@angular/common/http';
import { noCacheGuard } from './app/Guards/noCache/no-cache.guard';

const routes: Routes = [
  { path: '', component: BackgroundComponent },
  { path: 'home', component: BackgroundComponent },
  { path: 'sheduletour', component: SheduletourComponent },
  { path: 'visitorinfo', component: VisitorinfoComponent },
  { path: 'amenities', component: AmenitiesComponent },
  { path: 'photogallery', component: PhotogalleryComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'employees', component: EmployeesComponent, canActivate: [noCacheGuard] },
  { path: 'residents', component: ResidentsComponent, canActivate: [noCacheGuard] },
  { path: 'floorplans', component: FloorplansComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'directions', component: DirectionsComponent },
  { path: 'residentsLoginWelcome', component: ResidentsLoginWelcomeComponent, canActivate: [noCacheGuard] }
  
];

bootstrapApplication(AppComponent, { providers: [provideHttpClient(),provideRouter(routes)]})
  .catch((err) => console.error(err));
