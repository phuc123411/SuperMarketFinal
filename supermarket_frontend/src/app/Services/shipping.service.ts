import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  private apiUrl = 'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services';
  private token = '5f3a8d11-7d71-11ee-af43-6ead57e9219a'; // Sử dụng token của bạn

  constructor(private http: HttpClient) { }

  getAvailableServices(shopId: number, fromDistrict: number, toDistrict: number): Observable<any> {
    const headers = new HttpHeaders().set('Token', this.token);
    const body = {
      shop_id: shopId,
      from_district: fromDistrict,
      to_district: toDistrict
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
