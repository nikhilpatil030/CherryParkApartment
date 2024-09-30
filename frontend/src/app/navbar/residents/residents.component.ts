import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';

var serverConfig =  require ("../../../config/serverConfig.json");
var residentsConfig = require ("./residentsConfig.json");

@Component({
  selector: 'app-residents',
  standalone: true,
  imports: [HttpClientModule,TableModule],
  templateUrl: './residents.component.html',
  styleUrl: './residents.component.scss'
})
export class ResidentsComponent {

  constructor(private http: HttpClient) {
  }

  residents: any;

  ngOnInit(): void {
    this.http.get(serverConfig.serverApi + residentsConfig.getAllResidents).subscribe(res => {
      this.residents = (res as { data: any })["data"];
    });
  }
}
