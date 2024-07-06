import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {
    const RegisterData = { email: this.email, username: this.username, password: this.password };

    this.http.post('http://localhost:5005/api/Authenticate/register', RegisterData)
      .subscribe(response => {
        console.log('Register successful:', response);
        // Redirect to home or another page after successful login
        this.router.navigate(['/login']);
      }, error => {
        console.error('Register failed:', error);
      });
  }
}


