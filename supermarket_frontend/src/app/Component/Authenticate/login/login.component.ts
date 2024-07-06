import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const loginData = { username: this.username, password: this.password };

    this.http.post('http://localhost:5005/api/Authenticate/login', loginData)
      .subscribe((response: any) => {
        console.log('Login successful:', response);

        // Assuming the response contains userId, role, and token
        const { userId, role, token, expiration} = response;

        const tokenData = { token: token, expiration: expiration };

        // Save userId, role, and token to localStorage
        localStorage.setItem('userId', JSON.stringify(userId));
        localStorage.setItem('role', JSON.stringify(role));
        localStorage.setItem('token',JSON.stringify(tokenData));


        // Redirect to admin page if the role is ADMIN, else redirect to home
        if (role === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      }, error => {
        console.error('Login failed:', error);
      });
  }
}
