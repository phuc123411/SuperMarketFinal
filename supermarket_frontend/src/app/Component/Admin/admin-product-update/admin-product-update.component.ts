import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/Services/brand.service';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-admin-product-update',
  templateUrl: './admin-product-update.component.html',
  styleUrls: ['./admin-product-update.component.css']
})
export class AdminProductUpdateComponent implements OnInit {
  product = {
    id: '',
    name: '',
    description: '',
    fetureProduct: 0,
    brandId: '',
    categoryId: ''
  };

  productId: number = 0;

  brands: any[] = [];
  categories: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadBrands();
    this.loadCategories();
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.productService.getProduct(this.productId).subscribe(data => {
        this.product = data;
      });
    });
  }

  loadBrands(): void {
    this.brandService.getBrands().subscribe(
      (data: any[]) => {
        this.brands = data;
      },
      error => {
        console.error('Error fetching brands:', error);
      }
    );
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  onSubmit(): void {
    console.log(this.product);
    this.productService.updateProduct(this.productId, this.product).subscribe(
      response => {
        console.log('Product updated successfully:', response);
        this.router.navigate(['/admin/product']);
      },
      error => {
        console.error('Error updating product:', error);
      }
    );
  }
}
