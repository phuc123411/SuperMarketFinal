import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttributeValueService } from 'src/app/Services/attribute-value.service';
import { AttributeService } from 'src/app/Services/attribute.service';
import { BrandService } from 'src/app/Services/brand.service';
import { CategoryService } from 'src/app/Services/category.service';
import { ImageService } from 'src/app/Services/image.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {
  product: any = {};
  images: any[] = [];
  attributes: any[] = [];
  attributeValues: any[] = [];
  selectedAttribute: any = null;
  selectedAttributeValue: any = null;
  quantity: number = 1;
  productId: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private attributeService: AttributeService,
    private attributeValueService: AttributeValueService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = +params.get('id')!;
      this.loadProduct();
      this.loadImages();
      this.loadAttributes();
    });
  }

  loadProduct() {
    this.productService.getProduct(this.productId).subscribe(
      (data: any) => {
        this.product = data;
        this.brandService.getBrand(this.product.brandId).subscribe(
          (brand: any) => {
            this.product.brandName = brand.name;
          }
        );
        this.categoryService.getCategory(this.product.categoryId).subscribe(
          (category: any) => {
            this.product.categoryName = category.name;
          }
        );
        this.loadMainProductImage(); // Load main product image after loading product
      },
      (error) => {
        console.error('Error loading product', error);
      }
    );
  }

  loadMainProductImage() {
    this.imageService.getMainProductImage(this.productId).subscribe(
      (image: any) => {
        // Assuming the response has an 'imageUrl' property
        this.product.imageUrl = image.urlImage; // Assign imageUrl to product
      },
      (error) => {
        console.error(`Error loading main image for product ${this.productId}`, error);
      }
    );
  }

  loadImages() {
    this.imageService.getImages(this.productId).subscribe(
      (data: any[]) => {
        this.images = data;
        console.log(this.images);
      },
      (error) => {
        console.error('Error loading product images', error);
      }
    );
  }

  loadAttributes() {
    this.attributeService.getAttributesByProduct(this.productId).subscribe(
      (data: any[]) => {
        this.attributes = data;
      },
      (error) => {
        console.error('Error loading attributes', error);
      }
    );
  }

  selectAttribute(attribute: any) {
    this.selectedAttribute = attribute;
    this.loadAttributeValues(attribute.id);
  }

  loadAttributeValues(attributeId: number) {
    this.attributeValueService.getListAttributeValuesByProductAndAttribute(this.productId, attributeId).subscribe(
      (data: any[]) => {
        this.attributeValues = data;
        this.selectedAttributeValue = null; // Reset selected attribute value
      },
      (error) => {
        console.error('Error loading attribute values', error);
      }
    );
  }

  selectAttributeValue(attributeValue: any) {
    this.selectedAttributeValue = attributeValue;
  }
  addToCart() {
    const cartItem = {
      productId: this.productId,
      attributeId: this.selectedAttribute ? this.selectedAttribute.id : null,
      attributeValueId: this.selectedAttributeValue ? this.selectedAttributeValue.id : null,
      quantity: this.quantity
    };

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
    const existingItemIndex = cart.findIndex((item: any) =>
      item.productId === cartItem.productId &&
      item.attributeId === cartItem.attributeId &&
      item.attributeValueId === cartItem.attributeValueId
    );

    if (existingItemIndex > -1) {
      // Nếu sản phẩm đã tồn tại, tăng số lượng
      cart[existingItemIndex].quantity += this.quantity;
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới
      cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Item added to cart:', cartItem);
  }

}
