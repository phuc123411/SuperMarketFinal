import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandService } from 'src/app/Services/brand.service';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-admin-product-create',
  templateUrl: './admin-product-create.component.html',
  styleUrls: ['./admin-product-create.component.css']
})
export class AdminProductCreateComponent implements OnInit {
  product = {
    name: '',
    description: '',
    fetureProduct: 0,
    brandId: '',
    categoryId: ''
  };

  brands: any[] = [];
  categories: any[] = [];

  constructor(
    private brandService: BrandService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router // Injecting the Router service
  ) {}

  ngOnInit(): void {
    this.loadBrands();
    this.loadCategories();
  }

  loadBrands(): void {
    this.brandService.getBrands().subscribe((data: any[]) => {
      this.brands = data;
    }, error => {
      console.error('Error fetching brands:', error);
      // Handle error if needed
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data: any[]) => {
      this.categories = data;
    }, error => {
      console.error('Error fetching categories:', error);
      // Handle error if needed
    });
  }

  onSubmit(): void {
    this.productService.createProduct(this.product).subscribe(response => {
      console.log('Product created successfully:', response);
      this.router.navigate(['/admin/product']); // Navigate to the admin product list page
    }, error => {
      console.error('Error creating product:', error);
      // Handle error if needed
    });
  }
}
