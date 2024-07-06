import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderService } from './header.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:5005/api/Orders';

  constructor(
    private http: HttpClient,
    private headerService: HeaderService
  ) {}

  private getHeaders(): HttpHeaders {
    return this.headerService.getHeaders();
  }

  getOrders(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/all`, { headers });
  }

  getOrder(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }

  createOrder(order: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.apiUrl, order, { headers });
  }

  updateOrder(id: number, order: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/${id}`, order, { headers });
  }

  deleteOrder(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }
}
