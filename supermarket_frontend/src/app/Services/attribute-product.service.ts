import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderService } from './header.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttributeProductService {
  private apiUrl = 'http://localhost:5005/api/Attribute_Product';

  constructor(
    private http: HttpClient,
    private headerService: HeaderService
  ) {}

  private getHeaders(): HttpHeaders {
    return this.headerService.getHeaders();
  }

  createAttributeProduct(attribute_Product: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.apiUrl, attribute_Product, { headers });
  }

  updateAttributeProduct(id: number, attribute_Product: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/${id}`, attribute_Product, { headers });
  }

  deleteAttributeProduct(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }
}
