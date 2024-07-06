import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { ImageService } from 'src/app/Services/image.service'; // Import ImageService
import { CategoryService } from 'src/app/Services/category.service';
import { AttributeValueService } from 'src/app/Services/attribute-value.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-customer-feature-product',
  templateUrl: './customer-feature-product.component.html',
  styleUrls: ['./customer-feature-product.component.css']
})
export class CustomerFeatureProductComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private attributeValueService: AttributeValueService // Inject ImageService
  ) {}

  ngOnInit() {
    this.loadFeatureProducts();
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error loading categories', error);
      }
    );
  }

  loadFeatureProducts() {
    this.productService.getFeatureProducts().subscribe(
      (data: any[]) => {
        this.products = data;
        this.loadProductImages();
        this.loadProductPrice(); // After loading products, load images
      },
      (error) => {
        console.error('Error loading featured products', error);
      }
    );
  }

  loadProductImages() {
    // Iterate through products and load main image for each product
    for (let product of this.products) {
      this.imageService.getMainProductImage(product.id).subscribe(
        (image: any) => {
          // Assuming the response has an 'imageUrl' property
          product.imageUrl = image.urlImage; // Assign imageUrl to product
        },
        (error) => {
          console.error(`Error loading image for product ${product.id}`, error);
        }
      );
    }
  }

  loadProductPrice(){
    const requests = this.products.map(product =>
      this.attributeValueService.getFirstAttributeValue(product.id)
    );

    forkJoin(requests).subscribe(
      (attributeValues: any[]) => {
        attributeValues.forEach((attributeValue, index) => {
          this.products[index].price = attributeValue.priceOut;
        });
      },
      (error) => {
        console.error('Error loading attribute value', error);
      }
    );
  }
}
