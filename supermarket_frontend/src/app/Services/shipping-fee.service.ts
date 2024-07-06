import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShippingFeeService {
  private apiUrl = 'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee';
  private token = '5f3a8d11-7d71-11ee-af43-6ead57e9219a'; // Thay bằng token thực tế của bạn
  private shopId = '4681878'; // Thay bằng ID thực tế của shop

  constructor(private http: HttpClient) {}

  calculateShippingFee(params: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Token': this.token,
      'ShopId': this.shopId
    });

    return this.http.post(this.apiUrl, params, { headers });
  }
}
