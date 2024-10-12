import { Component , ViewEncapsulation} from '@angular/core';
import { ButtonModule } from 'primeng/button';

import 'ol/ol.css';
import Map from 'ol/Map';
import {  View, Feature } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Style, Fill, Stroke } from 'ol/style';
import { Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import CircleStyle from 'ol/style/Circle';
import LineString from 'ol/geom/LineString';
import { Coordinate } from 'ol/coordinate';
import Text from 'ol/style/Text';

var directionsConfig = require('./directionsConfig.json'); 

@Component({
  selector: 'app-directions',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './directions.component.html',
  styleUrl: './directions.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DirectionsComponent {

  map!: Map;
  vectorSource!: VectorSource;
  userCoords!: [number, number];

  ngOnInit(): void {

    // Set up map to display first location
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM() // OpenStreetMap tiles
        })
      ],
      view: new View({
        center: fromLonLat(directionsConfig.cherryParkLocation),
        zoom: 12
      })
    });
    
    // Set up vector layer for route
    this.vectorSource = new VectorSource();
    this.map.addLayer(new VectorLayer({
      source: this.vectorSource
    }));

    const locationInput = document.getElementById('location-input') as HTMLInputElement;
    locationInput.addEventListener('input', () => this.searchLocation(locationInput.value));
  }

   // Photon API to search for locations and display suggestions
  searchLocation(query: string) {
    // if user selects current location, don't search
    if(query === "current location"){
      // this.getCurrentLocation();
    }
    else{
      if (query.length < 3) {return;} // Show suggestions after 3 characters
      const url = `https://photon.komoot.io/api/?q=${query}&limit=5`; // Limit results to 5 suggestions
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const suggestionsList = document.getElementById('suggestions-list')!;
          suggestionsList.innerHTML = ''; // Clear previous suggestions
  
          data.features.forEach((feature: any) => {
            const suggestion = document.createElement('li');
            suggestion.innerText = feature.properties.name + ', ' + feature.properties.state +', ' + feature.properties.country;
            suggestion.addEventListener('click', () => {
              suggestionsList.innerHTML = ''; // Clear suggestions after selection  
              const locationInput = document.getElementById('location-input') as HTMLInputElement;
              locationInput.value = feature.properties.name + ', ' + feature.properties.state +', ' + feature.properties.country;
              this.userCoords = [feature.geometry.coordinates[0], feature.geometry.coordinates[1]];
            });
            suggestionsList.appendChild(suggestion);
          });
        })
        .catch(err => console.error(err));
    }
    
  }

  getDirection(){
    this.getPath(this.userCoords,directionsConfig.cherryParkLocation)
  }

  // Function to get current location
  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.userCoords = [position.coords.longitude, position.coords.latitude];

      // Add user marker
      this.addMarker(this.userCoords, 'User Location');
    });
  }

  // Function to get directions path using OSRM
  getPath(start: [number, number], end: [number, number]) {
    // Get directions from user location to end
    const url = `${directionsConfig.directionPathURL1}${start[0]},${start[1]};${end[0]},${end[1]}${directionsConfig.directionPathURL2}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0].geometry.coordinates;

          // Convert coordinates to EPSG:3857
          const convertedRoute = route.map((coord: Coordinate) => fromLonLat(coord));

          // Add route to the map
          this.addRoute(convertedRoute);
          this.addMarkers(start, end);
        } else {
          alert('No route found');
        }
      })
      .catch(err => console.error('Error fetching directions:', err));
  }

  // Function to add the route to the map
  addRoute(coordinates: number[][]) {
    const routeFeature = new Feature({
      geometry: new LineString(coordinates),
    });

    routeFeature.setStyle(new Style({
      stroke: new Stroke({
        color: 'red',
        width: 4
      })
    }));

    this.vectorSource.clear(); // Clear existing features
    this.vectorSource.addFeature(routeFeature); // Add the new route feature
  }

  addMarkers(start: number[], end: [number, number]) {
    this.addMarker([start[0], start[1]],"your location");
    this.addMarker([end[0], end[1]], 'Cherry Park');
  }

  // Function to add a marker to the map
  addMarker(coords: [number, number], name: string) {
    const marker = new Feature({
      geometry: new Point(fromLonLat(coords)),
    });

    marker.setStyle(new Style({
      image: new CircleStyle({
        radius: 6,
        fill: new Fill({ color: 'white' }),
        stroke: new Stroke({ color: 'black', width: 3 })
      }),
      text: new Text({
        text: name, 
        font: '14px Arial, sans-serif', 
        fill: new Fill({ color: '#333' }), // Define text fill color (black)
        stroke: new Stroke({ color: '#fff', width: 3 }), // Outline the text with white for visibility
        offsetY: -25 ,// Moves the text slightly above the marker
        textAlign: 'center', // Centers the text
        scale: 1.2 // Scales the text for better readability
      })
    }));

    this.vectorSource.addFeature(marker); 
  }

}
