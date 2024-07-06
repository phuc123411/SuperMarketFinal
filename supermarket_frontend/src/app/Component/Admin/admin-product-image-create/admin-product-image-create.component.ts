import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/Services/image.service';

@Component({
  selector: 'app-admin-product-image-create',
  templateUrl: './admin-product-image-create.component.html',
  styleUrls: ['./admin-product-image-create.component.css']
})
export class AdminProductImageCreateComponent {
  mainImage: File | null = null;
  images: File[] = [];
  productId: number = 0;

  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = +params.get('productId')!;
    });
  }

  onMainImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.mainImage = file;
    }
  }

  onImagesChange(event: any) {
    const files = Array.from(event.target.files) as File[];
    if (files.length > 0) {
      this.images = files;
    }
  }

  onSubmit() {
    if (this.productId && this.mainImage && this.images.length > 0) {
      const formData = new FormData();
      formData.append('mainImage', this.mainImage);
      this.images.forEach((image, index) => {
        formData.append('images', image); // Notice the key is 'images' and not 'images[index]'
      });

      this.imageService.createProductImages(this.productId, formData)
        .subscribe(
          () => {
            console.log('Images added successfully');
            this.mainImage = null;
            this.images = [];
            this.router.navigate(['/admin/product']); // Navigate using the Angular Router
          },
          error => {
            console.error('Error adding images', error);
          }
        );
    } else {
      console.error('Missing required fields');
    }
  }
}
