import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  private apiUrl = 'http://localhost:5005/api/Order_Detail';

  constructor(
    private http: HttpClient,
    private headerService: HeaderService
  ) {}

  private getHeaders(): HttpHeaders {
    return this.headerService.getHeaders();
  }

  getOrderDetails(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}`, { headers });
  }

  getOrderDetail(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }

  createOrderDetail(orderDetail: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.apiUrl, orderDetail, { headers });
  }

  updateOrderDetail(id: number, orderDetail: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/${id}`, orderDetail, { headers });
  }

  deleteOrderDetail(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }
}
