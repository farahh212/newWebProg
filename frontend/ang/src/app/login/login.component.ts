import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule, HttpClientModule],  // Import HttpClientModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  apiUrl: string = 'http://127.0.0.1:8000/api/login'; // Backend URL

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private http: HttpClient  // Inject HttpClient
  ) {}

  onLoginClick() {
    if (this.username && this.password) {
      // Prepare login data to send to the API
      const loginData = {
        username: this.username,
        password: this.password
      };

      this.http.post<any>(this.apiUrl, loginData).subscribe(
        (response) => {
          if (response && response.token) {
            const expiresIn = 2; // Set cookie expiration (in days)
            this.cookieService.set('authToken', response.token, expiresIn);
            this.cookieService.set('username', this.username, expiresIn);
            this.router.navigate(['/profile']);
          } else {
            alert('Invalid login credentials.');
          }
        },
        (error) => {
          alert('Login failed. Please check your credentials and try again.');
        }
      );
    } else {
      alert('Please enter both username and password.');
    }
  }
}
