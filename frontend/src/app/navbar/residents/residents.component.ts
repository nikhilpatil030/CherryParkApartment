import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-residents',
  standalone: true,
  imports: [HttpClientModule,TableModule,DataViewModule],
  templateUrl: './residents.component.html',
  styleUrl: './residents.component.scss'
})
export class ResidentsComponent {

  constructor(private http: HttpClient) {
  }

  residents: any;

  jsonArray = [
    { id: 1, name: 'Alice', age: 29 },
    { id: 2, name: 'Bob', age: 34 },
    { id: 3, name: 'Charlie', age: 25 }
  ];

  ngOnInit(): void {
    this.http.get('http://localhost:5038/residents/getAllResidents').subscribe(res => {
      this.residents = (res as { data: any })["data"];
    });
  }
}
