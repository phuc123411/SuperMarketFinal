import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderService } from './header.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  private apiUrl = 'http://localhost:5005/api/Attributes';

  constructor(
    private http: HttpClient,
    private headerService: HeaderService
  ) {}

  private getHeaders(): HttpHeaders {
    return this.headerService.getHeaders();
  }

  getAttributes(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  getAttribute(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }

  getAttributesByProduct(productId: number): Observable<any>{
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/product/${productId}/attributes`, {headers});
  }

  createAttribute(attribute: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.apiUrl, attribute, { headers });
  }

  updateAttribute(id: number, attribute: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/${id}`, attribute, { headers });
  }

  deleteAttribute(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }
}
