import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ProductService } from './../../../Services/product.service';
import { BrandService } from './../../../Services/brand.service';
import { CategoryService } from 'src/app/Services/category.service';
import { ImageService } from 'src/app/Services/image.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: any[]) => {
        this.products = data;

        // Prepare array of Observables for brand, category, and image requests
        const brandObservables = this.products.map(product => this.brandService.getBrand(product.brandId));
        const categoryObservables = this.products.map(product => this.categoryService.getCategory(product.categoryId));
        const imageObservables = this.products.map(product => this.imageService.getMainProductImage(product.id));

        // Use forkJoin to execute all Observables concurrently
        forkJoin([forkJoin(brandObservables), forkJoin(categoryObservables), forkJoin(imageObservables)]).subscribe(
          ([brands, categories, images]) => {
            brands.forEach((brand: any, index: number) => {
              this.products[index].brandName = brand.name;
            });

            categories.forEach((category: any, index: number) => {
              this.products[index].categoryName = category.name;
            });

            images.forEach((image: any, index: number) => {
            console.log(image);
              this.products[index].imageMain = image.urlImage;
              console.log(`Product ID: ${this.products[index].id}, Main Image URL: ${image.urlImage}`);
            });
          },
          error => {
            console.error('Error fetching data:', error);
          }
        );
      },
      error => {
        console.error('Error loading products:', error);
      }
    );
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        console.log('Product deleted successfully!');
        this.loadProducts();
      }, error => {
        console.error('Error deleting product:', error);
      });
    }
  }
}
