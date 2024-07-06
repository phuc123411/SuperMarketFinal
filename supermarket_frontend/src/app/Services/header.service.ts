import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private headers: HttpHeaders = new HttpHeaders();

  constructor() {
    this.setAuthorizationHeaderFromLocalStorage();
  }

  private setAuthorizationHeaderFromLocalStorage() {
    const token = JSON.parse(localStorage.getItem('token') || '{}').token;
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getHeaders(): HttpHeaders {
    return this.headers;
  }
}
