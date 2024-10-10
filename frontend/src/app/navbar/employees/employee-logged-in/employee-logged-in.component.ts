import { Component, ViewEncapsulation } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { LoggerService } from '../../../services/logger/logger.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';

var serverConfig =  require ("../../../../config/serverConfig.json");
var employeeLoggedInConfig = require ("./employeeLoggedInConfig.json");

@Component({
  selector: 'app-employee-logged-in',
  standalone: true,
  imports: [PanelMenuModule,TableModule,ButtonModule,DialogModule,CommonModule],
  templateUrl: './employee-logged-in.component.html',
  styleUrl: './employee-logged-in.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EmployeeLoggedInComponent {

  constructor(private http: HttpClient, private logger: LoggerService) {}

  allResidents: any;
  maintainanceDetailsDialog: boolean = false;
  maintainanceDetails: any;

  ngOnInit() {
    this.getMaintenanceRequests();
  }
  items = [
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/profile']
      },
      {
        label: 'Tasks',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/tasks']
      },
      {
        label: 'Work-orders',
        icon: 'pi pi-fw pi-inbox',
        routerLink: ['/workorders']
      },
      {
        label: 'Customers',
        icon: 'pi pi-fw pi-users',
        routerLink: ['/customers']
      },
      {
        label: 'Finance',
        icon: 'pi pi-fw pi-dollar',
        routerLink: ['/finance']
      },
      {
        label: 'Calls',
        icon: 'pi pi-fw pi-phone',
        routerLink: ['/calls']
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        routerLink: ['/security']
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        routerLink: ['/employees']
      }
  ];

  getMaintenanceRequests() {
    this.http.get(serverConfig.serverApi + employeeLoggedInConfig.getAllMaintenanceRequests).subscribe(res => {
      this.logger.info("EmployeeLoggedInComponent","getMaintenanceRequests: " + JSON.stringify(res) );
      this.allResidents = (res as { data: any })["data"];
    }, error => {
      this.logger.error("EmployeeLoggedInComponent","getMaintenanceRequests error: " + JSON.stringify(error) );
    })
  }

  seeDetails(rowData: any) {
    this.maintainanceDetails = rowData.Details;
    this.maintainanceDetailsDialog = true;
  }
}
