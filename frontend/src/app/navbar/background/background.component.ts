import { Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [GalleriaModule],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss'
})
export class BackgroundComponent {
  images: string[] | undefined;
 
  ngOnInit() {
    this.images= [
      'https://images.ctfassets.net/pg6xj64qk0kh/2r4QaBLvhQFH1mPGljSdR9/39b737d93854060282f6b4a9b9893202/camden-paces-apartments-buckhead-ga-terraces-living-room-with-den_1.jpg',
      'https://www.souciehorner.com/wp-content/uploads/2017/04/Kitchen3-1536.jpg',
      'https://patch.com/img/cdn20/users/24938404/20210624/040857/3-westchester-apartments-flight-facade-evening-4-copy___24160855313.jpg'
    ];
  }
}
