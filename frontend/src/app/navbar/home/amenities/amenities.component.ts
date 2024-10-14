import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-amenities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './amenities.component.html',
  styleUrl: './amenities.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class AmenitiesComponent {

  heading = "Residents benefit from a full suite of on-site wellness and convenience-focused luxury amenities to compliment the abundance of outdoor recreation found along miles of hiking and biking trails connected to the our new apartments"

  apartmentFeatureImagePath = "https://broadstonewren.com/assets/images/cache/amenity_group_1_broadstone_wren_3148-bfe5c87f7684f2736bc2036e7f39e7fc.jpg"

  apartmentFeaturesText = "From the smallest detail and tangible elements of quality. Broadstone Wren was designed to convey an aesthetic that feels simultaneously elevated and effortless."

  apartmentFeatures = ['Studio, 1 Bedroom, 2 Bedroom & 3 Bedroom Apartments', 'Open Floor-Plans', 'Granite Counters', 'Kitchen Islands *', 'Washer & Dryer Included',
    'Private Balcony', 'Patios', 'Hardwood-Style Flooring', 'Breathtaking Western Mountain Views *', 'Custom Built-Ins *','Smart Stainless Steel Appliances'
  ];

  communityAmenitiesImagePath = "https://broadstonewren.com/assets/images/cache/amenity_group_2_broadstone_wren_3148-a998d376db0ff7f1660a1cfc6b5d5a19.jpg"

  communityAmenities = ['Pool + Spa', 'Walk to Connected Trails', 'Business Lounge + Private Work Zones', 'Clubhouse + Game Room', 'Dog Wash + Pet Amenities', 'Tuck-Under Garages Available',
    'Indoor | Outdoor Entertainment & Gathering Areas', 'Fitness Center, Yoga Studio + Spin Room', 'Private Conference Room', 'Demonstration Kitchen + Coffee Bar', 'Package Delivery + Storage'
  ]
}
