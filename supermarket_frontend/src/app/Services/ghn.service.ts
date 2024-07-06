import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GHNService {
  private apiUrl = 'https://online-gateway.ghn.vn/shiip/public-api/master-data';
  private token = '5f3a8d11-7d71-11ee-af43-6ead57e9219a';

  constructor(private http: HttpClient) { }

  getProvinces(): Observable<any> {
    const headers = new HttpHeaders().set('Token', this.token);
    return this.http.get(`${this.apiUrl}/province`, { headers });
  }

  getDistricts(provinceId: number): Observable<any> {
    const headers = new HttpHeaders().set('Token', this.token);
    return this.http.get(`${this.apiUrl}/district?province_id=${provinceId}`, { headers });
  }

  getWards(districtId: number): Observable<any> {
    const headers = new HttpHeaders().set('Token', this.token);
    return this.http.get(`${this.apiUrl}/ward?district_id=${districtId}`, { headers });
  }
}
