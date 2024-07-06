import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { AttributeValueService } from 'src/app/Services/attribute-value.service';
import { ImageService } from 'src/app/Services/image.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    private productService: ProductService,
    private attributeValueService: AttributeValueService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cartItems = JSON.parse(cart);

      // Lặp qua từng mục trong giỏ hàng để lấy thông tin sản phẩm, giá trị thuộc tính và hình ảnh chính
      this.cartItems.forEach(item => {
        // Lấy thông tin sản phẩm
        this.productService.getProduct(item.productId).subscribe(
          (data: any) => {
            item.productName = data.name;
          },
          (error) => {
            console.error(`Error loading product ${item.productId}`, error);
          }
        );

        // Lấy giá trị thuộc tính
        this.attributeValueService.getAttributeValue(item.productId, item.attributeValueId).subscribe(
          (data: any) => {
            item.price = data.priceOut;
          },
          (error) => {
            console.error(`Error loading attribute value for product ${item.productId}`, error);
          }
        );

        // Lấy hình ảnh chính của sản phẩm
        this.imageService.getMainProductImage(item.productId).subscribe(
          (data: any) => {
            item.urlImage = data.urlImage;
          },
          (error) => {
            console.error(`Error loading main product image for product ${item.productId}`, error);
          }
        );
      });
    }
  }

  calculateSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  removeFromCart(index: number): void {
    this.cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
