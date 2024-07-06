import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
import { ImageService } from 'src/app/Services/image.service';
import { forkJoin } from 'rxjs';
import { AttributeValueService } from 'src/app/Services/attribute-value.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-product-by-category',
  templateUrl: './list-product-by-category.component.html',
  styleUrls: ['./list-product-by-category.component.css']
})
export class ListProductByCategoryComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  categoryId: number = 0;
  searchForm: FormGroup;
  priceSort: number = 0;

  constructor(
    private router: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private imageService: ImageService,
    private attributeValueService: AttributeValueService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchKey: ['']
    });
  }

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.categoryId = +params.get('id')!;
      this.loadProducts();
      this.loadCategories();
    });
  }

  loadProducts() {
    this.productService.getProductsByCategoryId(this.categoryId).subscribe(
      (data: any[]) => {
        this.products = data;
        this.loadProductImages();
        this.loadProductPrice(); // Load prices after products are loaded
        console.log(data);
      },
      (error) => {
        console.error('Error loading products', error);
      }
    );
  }

  loadProductImages() {
    const requests = this.products.map(product =>
      this.imageService.getMainProductImage(product.id)
    );

    forkJoin(requests).subscribe(
      (images: any[]) => {
        images.forEach((image, index) => {
          this.products[index].imageUrl = image.urlImage;
        });
      },
      (error) => {
        console.error('Error loading product images', error);
      }
    );
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

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
        console.log(data);
      },
      (error) => {
        console.error('Error loading categories', error);
      }
    );
  }

  onSubmit() {
    const searchKey = this.searchForm.get('searchKey')?.value;
    this.productService.getProductsByKey(this.priceSort, searchKey).subscribe(
      (products: any[]) => {
        this.products = products;
        this.loadProductImages();
        this.loadProductPrice();
        console.log(products);
      },
      (error) => {
        console.error('Error loading products by key', error);
      }
    );
  }

  onPriceSortChange(sortType: number) {
    this.priceSort = sortType;
    const searchKey = this.searchForm.get('searchKey')?.value;
    this.productService.getProductsByKey(this.priceSort, searchKey).subscribe(
      (products: any[]) => {
        this.products = products;
        this.loadProductImages();
        this.loadProductPrice();
        console.log(products);
      },
      (error) => {
        console.error('Error loading products by key', error);
      }
    );
  }
}
