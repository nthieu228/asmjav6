import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/auth/login';
  private registerUrl = 'http://localhost:8080/api/auth/register';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { username, password })
      .pipe(
        catchError(this.handleError)
      );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(this.registerUrl, { username, email, password })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Lỗi xảy ra trên client-side
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Lỗi xảy ra trên server-side
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
