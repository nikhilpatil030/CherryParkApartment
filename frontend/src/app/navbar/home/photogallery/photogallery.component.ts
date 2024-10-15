import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-photogallery',
  standalone: true,
  imports: [ CommonModule,GalleriaModule,DialogModule ],
  templateUrl: './photogallery.component.html',
  styleUrl: './photogallery.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PhotogalleryComponent {

    backgroundImageUrl = "https://theworldincushions.com/cdn/shop/articles/Brown_leather_sofa_cushions_yellow_1200x1200.jpg?v=1655791158";

    heading = "Welcome to the Cherry Park Apartments photo gallery! Explore our vibrant community in Englewood, CO, through stunning images that showcase the beautiful interiors and exteriors of our apartment homes. From modern kitchens and spacious living areas to well-maintained amenities and lush landscapes, our photo gallery offers a glimpse into the exceptional lifestyle that awaits you at Cherry Park."

    photos = [ 
      { src: 'https://resource.rentcafe.com/image/upload/q_auto,f_auto,c_fill,w_380,ar_1.384,g_auto/s3/2/102601/rd2%20-%20the%20alder%20-%20exterior%20pool%20(3).jpg', alt: 'Image 1' },
      { src: 'https://resource.rentcafe.com/image/upload/q_auto,f_auto,c_fill,w_380,ar_1.384,g_auto/s3/2/102601/p1742339_the%20alder_entry-1.png', alt: 'Image 2' },
      { src: 'https://resource.rentcafe.com/image/upload/q_auto,f_auto,c_fill,w_380,ar_1.384,g_auto/s3/2/102601/p1742339_the%20alder_living-2.png', alt: 'Image 3' },
      { src: 'https://resource.rentcafe.com/image/upload/q_auto,f_auto,c_fill,w_380,ar_1.384,g_auto/s3/2/102601/p1742339_the%20alder_bed-2.png', alt: 'Image 4' }, 
      { src: 'https://resource.rentcafe.com/image/upload/q_auto,f_auto,c_fill,w_380,ar_1.384,g_auto/s3/2/102601/p1742339_the%20alder_bath-1.png', alt: 'Image 5' },
      { src: 'https://resource.rentcafe.com/image/upload/q_auto,f_auto,c_fill,w_380,ar_1.384,g_auto/s3/2/102601/p1742339_the%20alder_entry-2.png', alt: 'Image 6' },
      { src: 'https://resource.rentcafe.com/image/upload/q_auto,f_auto,c_fill,w_380,ar_1.384,g_auto/s3/2/102601/p1742339_the%20alder_clubroom%202.png', alt: 'Image 5' },
      { src: 'https://resource.rentcafe.com/image/upload/q_auto,f_auto,c_fill,w_380,ar_1.384,g_auto/s3/2/102601/p1742339_the%20alder_yoga%202.png', alt: 'Image 6' }
      
    ]

    zoomPhotos = [ 
      { src: 'https://resource.rentcafe.com/image/upload/q_auto,f_auto,c_limit,w_1920/s3/2/102601/rd2%20-%20the%20alder%20-%20exterior%20pool%20(3).jpg', alt: 'Image 1' },
      { src: 'https://resource.rentcafe.com/image/upload/q_auto,f_auto,c_limit,w_1920/s3/2/102601/p1742339_the%20alder_entry-1.png', alt: 'Image 2' },
      { src: 'https://resource.rentcafe.com/image/upload/q_auto,f_auto,c_limit,w_1920/s3/2/102601/p1742339_the%20alder_living-2.png', alt: 'Image 3' },
      { src: 'https://resource.rentcafe.com/image/upload/q_auto,f_auto,c_limit,w_1920/s3/2/102601/p1742339_the%20alder_bed-2.png', alt: 'Image 4' }, 
      { src: 'https://resource.rentcafe.com/image/upload/q_auto,f_auto,c_limit,w_1920/s3/2/102601/p1742339_the%20alder_bath-1.png', alt: 'Image 5' },
      { src: 'https://resource.rentcafe.com/image/upload/q_auto,f_auto,c_limit,w_1920/s3/2/102601/p1742339_the%20alder_living-1.png', alt: 'Image 6' },
      { src: 'https://resource.rentcafe.com/image/upload/q_auto,f_auto,c_limit,w_1920/s3/2/102601/p1742339_the%20alder_clubroom%202.png', alt: 'Image 5' },
      { src: 'https://resource.rentcafe.com/image/upload/q_auto,f_auto,c_limit,w_2560/s3/2/102601/p1742339_the%20alder_yoga%202.png', alt: 'Image 6' }
    ]
    activeIndex: number = 0;
    galleriaVisible: boolean = false;
  
    openGalleria(index: number) {
      this.activeIndex = index; // Set the clicked image as the active image
      this.galleriaVisible = true; // Show the Galleria in fullscreen
    }

    closeGalleria() {
      this.galleriaVisible = false;
    }

}
