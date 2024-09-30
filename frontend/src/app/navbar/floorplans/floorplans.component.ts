import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

var serverConfig =  require ("../../../config/serverConfig.json");
var floorPlansConfig = require ("./floorplansConfig.json");

@Component({
  selector: 'app-floorplans',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './floorplans.component.html',
  styleUrl: './floorplans.component.scss'
})
export class FloorplansComponent {

  constructor(private http: HttpClient) {}

  floorPlans: any;

  plans: any[] = [
    { Bedrooms: '1 Bedroom' },
    { Bedrooms: '2 Bedrooms' },
    { Bedrooms: '3 Bedrooms' }
  ];
  selectedCity: string = '1 Bedroom';

  ngOnInit(): void {
    this.http.get(serverConfig.serverApi + floorPlansConfig.getAllFloorPlans).subscribe(res => {
      this.floorPlans = (res as { data: any })["data"];
    });
  }

}
