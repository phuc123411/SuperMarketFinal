import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

import { AttributeValueService } from 'src/app/Services/attribute-value.service';
import { GHNService } from 'src/app/Services/ghn.service';
import { ImageService } from 'src/app/Services/image.service';
import { OrderDetailService } from 'src/app/Services/order-detail.service';
import { OrderService } from 'src/app/Services/order.service';
import { ProductService } from 'src/app/Services/product.service';
import { ShippingFeeService } from 'src/app/Services/shipping-fee.service';
import { ShippingService } from 'src/app/Services/shipping.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  cartItems: any[] = [];
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];
  availableServices: any[] = [];

  selectedProvince: number = 0;
  selectedDistrict: number = 0;
  selectedWard: number = 0;
  selectedService: number = 0;
  shippingFee: number = 0;

  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  paymentMethod: number = 0;
  private vnpayApiUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  private secretKey = 'ZYCTQITJBJSIYKRGUROFFNJHNQGCRSPZ'; // Replace with your actual secret key

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private attributeValueService: AttributeValueService,
    private imageService: ImageService,
    private ghnService: GHNService,
    private shippingService: ShippingService,
    private shippingFeeService: ShippingFeeService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.loadProvinces();
  }

  loadCartItems(): void {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cartItems = JSON.parse(cart);
      this.loadProductDetails();
    }
  }

  loadProductDetails(): void {
    this.cartItems.forEach(item => {
      this.productService.getProduct(item.productId).subscribe(
        (data: any) => {
          item.productName = data.name;
          this.loadAttributeValue(item);
        },
        (error) => {
          console.error(`Error loading product ${item.productId}`, error);
        }
      );
    });
  }

  loadAttributeValue(item: any): void {
    this.attributeValueService.getAttributeValue(item.productId, item.attributeValueId).subscribe(
      (data: any) => {
        item.price = data.priceOut;
        this.loadMainImage(item);
      },
      (error) => {
        console.error(`Error loading attribute value for product ${item.productId}`, error);
      }
    );
  }

  loadMainImage(item: any): void {
    this.imageService.getMainProductImage(item.productId).subscribe(
      (data: any) => {
        item.urlImage = data.urlImage;
      },
      (error) => {
        console.error(`Error loading main product image for product ${item.productId}`, error);
      }
    );
  }

  calculateSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  calculateTotal(): number {
    const subtotal = this.calculateSubtotal();
    return this.shippingFee > 0 ? subtotal + this.shippingFee : subtotal;
  }

  loadProvinces(): void {
    this.ghnService.getProvinces().subscribe(
      (response: any) => {
        if (response.code === 200 && response.data) {
          this.provinces = response.data;
        } else {
          console.error('Error fetching provinces:', response);
        }
      },
      error => {
        console.error('Error fetching provinces:', error);
      }
    );
  }

  onProvinceChange(): void {
    if (this.selectedProvince) {
      this.loadDistricts(this.selectedProvince);
      this.availableServices = [];
      this.selectedService = 0;
    }
  }

  onDistrictChange(): void {
    if (this.selectedDistrict) {
      this.loadWards(this.selectedDistrict);
      this.loadAvailableServices();
      this.availableServices = [];
      this.selectedService = 0;
    }
  }

  loadDistricts(provinceId: number): void {
    this.ghnService.getDistricts(provinceId).subscribe(
      (response: any) => {
        if (response.code === 200 && response.data) {
          this.districts = response.data;
        } else {
          console.error('Error fetching districts:', response);
        }
      },
      error => {
        console.error('Error fetching districts:', error);
      }
    );
  }

  loadWards(districtId: number): void {
    this.ghnService.getWards(districtId).subscribe(
      (response: any) => {
        if (response.code === 200 && response.data) {
          this.wards = response.data;
        } else {
          console.error('Error fetching wards:', response);
        }
      },
      error => {
        console.error('Error fetching wards:', error);
      }
    );
  }

  loadAvailableServices(): void {
    const shopId = 4681878; // ID của shop, cần thay bằng ID thực tế
    const fromDistrict = 1542; // ID của quận/huyện người gửi, cần thay bằng ID thực tế
    const toDistrict = Number(this.selectedDistrict);

    this.shippingService.getAvailableServices(shopId, fromDistrict, toDistrict).subscribe(
      (response: any) => {
        if (response.code === 200 && response.data) {
          this.availableServices = response.data;
          console.log(response.data);
        } else {
          console.error('Error fetching available services:', response);
        }
      },
      error => {
        console.error('Error fetching available services:', error);
      }
    );
  }

  onServiceChange(serviceId: number): void {
    this.selectedService = serviceId;
    this.calculateShippingFee();
  }

  calculateShippingFee(): void {
    const params = {
      service_id: Number(this.selectedService),
      insurance_value: Number(this.calculateSubtotal()),
      coupon: '',
      to_ward_code: this.selectedWard,
      to_district_id: Number(this.selectedDistrict),
      from_district_id: 1542, // ID của quận/huyện người gửi, cần thay bằng ID thực tế
      weight: Number(1000), // Trọng lượng hàng hóa (gram)
      length: Number(20), // Chiều dài (cm)
      width: Number(20), // Chiều rộng (cm)
      height: Number(20) // Chiều cao (cm)
    };

    this.shippingFeeService.calculateShippingFee(params).subscribe(
      (response: any) => {
        if (response.code === 200 && response.data) {
          this.shippingFee = response.data.total;
        } else {
          console.error('Error calculating shipping fee:', response);
        }
      },
      error => {
        console.error('Error calculating shipping fee:', error);
      }
    );
  }

  onSubmit(): void {
    const status = this.paymentMethod === 1 ? "Thanh toán hoàn tất" : "Đang chờ thanh toán";
    const userId = localStorage.getItem('userId')?.replace(/^"(.*)"$/, '$1') || '';
    const orderData = {
      status: status,
      paymentMethod: this.paymentMethod === 1 ? "Thanh toán tiền mặt" : "Thanh toán qua VNPay",
      description: `${this.firstName} ${this.lastName}, ${this.phone}, ${this.selectedProvince}, ${this.selectedDistrict}, ${this.selectedWard}`,
      totalPrice: this.calculateTotal(),
      userId: userId,
      rowDelete: 0,
      isReview: 0
    };

    if (this.paymentMethod === 2) {
      const expireDate = new Date();
      expireDate.setMinutes(expireDate.getMinutes() + 15);

      let params = new HttpParams()
        .set('vnp_Version', '2.1.0')
        .set('vnp_Command', 'pay')
        .set('vnp_TmnCode', '96PV39NC')
        .set('vnp_Amount', orderData.totalPrice*100)
        .set('vnp_BankCode', 'BIDV')
        .set('vnp_CreateDate', new Date().toISOString())
        .set('vnp_CurrCode', 'VND')
        .set('vnp_IpAddr', '127.0.0.1')
        .set('vnp_Locale', 'vn')
        .set('vnp_OrderInfo', orderData.description)
        .set('vnp_OrderType', 'billpayment')
        .set('vnp_ReturnUrl', 'http://localhost:4200/payment/result')
        .set('vnp_ExpireDate', expireDate.toISOString().slice(0, 14).replace(/[-:]/g, ''))
        .set('vnp_TxnRef', 'ORD1234567890');

      // Generate secure hash
      params = params.append('vnp_SecureHash', this.generateSecureHash(params));

      // Send request to VNPay and redirect
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      this.http.post(this.vnpayApiUrl, params.toString(), { headers }).subscribe(
        () => {
          console.log('Payment request sent successfully.');
          this.router.navigateByUrl(this.vnpayApiUrl);
        },
        error => {
          console.error('Error sending VNPay payment request:', error);
          // Handle error if needed
        }
      );
    }

    console.log(orderData);

    this.orderService.createOrder(orderData).subscribe(
      (orderResponse: any) => {
        const orderId = orderResponse.id;

        const orderDetailsData = this.cartItems.map(item => ({
          orderId: orderId,
          productId: item.productId,
          attributeId: item.attributeId,
          attributeValueId: item.attributeValueId,
          quantity: item.quantity,
          unitPrice: item.price,
          description: `Product: ${item.productName}, Quantity: ${item.quantity}`,
          rowDelete: 0
        }));

        // Create order details
        this.createOrderDetails(orderDetailsData);
      },
      error => {
        console.error('Error creating order:', error);
      }
    );
  }

  createOrderDetails(orderDetailsData: any[]): void {
    orderDetailsData.forEach(orderDetail => {
      this.orderDetailService.createOrderDetail(orderDetail).subscribe(
        (orderDetailsResponse: any) => {
          console.log('Order detail created successfully:', orderDetailsResponse);
          this.updateAttributeValueQuantity(orderDetail);
        },
        error => {
          console.error('Error creating order detail:', error);
        }
      );
    });
  }

  updateAttributeValueQuantity(orderDetail: any): void {
    this.attributeValueService.updateQuantity(
      orderDetail.productId,
      orderDetail.attributeId,
      orderDetail.attributeValueId,
      orderDetail.quantity
    ).subscribe(
      () => {
        console.log('Quantity updated successfully for product:', orderDetail.productId);
      },
      error => {
        console.error('Error updating quantity:', error);
      }
    );
  }

  generateSecureHash(params: HttpParams): string {
    let hashData = '';
    params.keys().map(key => {
      hashData += `${key}=${params.get(key)}&`;
    });
    hashData = hashData.slice(0, -1); // Remove last '&'
    return CryptoJS.HmacSHA512(hashData, this.secretKey).toString(CryptoJS.enc.Hex);
  }

  clearCart(): void {
    localStorage.removeItem('cart');
    this.cartItems = [];
  }

  clearServiceSelection(): void {
    this.availableServices = [];
    this.selectedService = 0;
  }

  onPaymentMethodChange(): void {
    console.log('Payment Method changed:', this.paymentMethod);
  }
}
