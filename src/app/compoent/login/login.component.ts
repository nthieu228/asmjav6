import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;
  email!: string;
  isRegisterMode: boolean = false;
  isForgotPasswordMode: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  toggleMode() {
    if (this.isForgotPasswordMode) {
      this.isForgotPasswordMode = false;
    } else {
      this.isRegisterMode = !this.isRegisterMode;
    }
    this.errorMessage = '';
    this.successMessage = '';
  }

  toggleForgotPasswordMode() {
    this.isForgotPasswordMode = !this.isForgotPasswordMode;
    this.isRegisterMode = false;
    this.errorMessage = '';
    this.successMessage = '';
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';
    if (this.isRegisterMode) {
      this.register();
    } else if (this.isForgotPasswordMode) {
      this.forgotPassword();
    } else {
      this.login();
    }
  }

  login() {
    const loginData = { username: this.username, password: this.password };
    console.log('Login data:', loginData); // Thêm log để kiểm tra dữ liệu login
  
    this.http.post<any>('http://localhost:8080/api/auth/login', loginData)
      .subscribe(
        response => {
          console.log('Login successful', response);
          if (response.message === 'Login successful') {
            this.successMessage = 'Login successful!';
            this.router.navigate(['/']); // Chuyển hướng sau khi đăng nhập thành công
          } else {
            this.errorMessage = 'Login failed. Please check your username and password.';
          }
        },
        error => {
          console.error('Login failed', error);
          this.errorMessage = 'Login failed. Please check your username and password.';
        }
      );
  }
  
  
  

  register() {
    const registerData = { username: this.username, password: this.password, email: this.email };
    this.http.post('http://localhost:8080/api/auth/register', registerData)
      .subscribe(
        response => {
          console.log('Registration successful', response);
          this.successMessage = 'Registration successful! Please log in.';
          this.isRegisterMode = false; // Chuyển về chế độ đăng nhập
        },
        error => {
          console.error('Registration failed', error);
          this.errorMessage = 'Registration failed. Please try again.';
        }
      );
  }

  forgotPassword() {
    const forgotPasswordData = { email: this.email };
    this.http.post('http://localhost:8080/api/auth/forgot-password', forgotPasswordData)
      .subscribe(
        response => {
          console.log('Password reset link sent', response);
          this.successMessage = 'Password reset link sent to your email!';
          this.isForgotPasswordMode = false; // Chuyển về chế độ đăng nhập
        },
        error => {
          console.error('Password reset failed', error);
          this.errorMessage = 'Password reset failed. Please try again.';
        }
      );
  }
}
