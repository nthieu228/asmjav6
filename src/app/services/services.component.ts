import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8080/api/accounts'; // Địa chỉ API backend của bạn

  constructor(private http: HttpClient) { }

  // Đăng nhập
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  // Đăng ký
  register(account: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, account);
  }

  // Quên mật khẩu
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email }, { responseType: 'text' });
  }
}
