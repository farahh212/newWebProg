import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
//import { environment } from 'src/environments/environment';  // Import environment configuration for API URL

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  username: string = '';
  pass: string = '';
  apiUrl: string = 'http://127.0.0.1:8000/api/login'; // Replace with your actual backend URL


  constructor(
    private router: Router,
    private cookieService: CookieService,
    private http: HttpClient  // Inject HttpClient
  ) {}

  onLoginClick() {
    if (this.username && this.pass) {
      // Prepare login data to send to the API
      const loginData = {
        username: this.username,
        password: this.pass
      };

      // Send the login request to the backend API
      this.http.post<any>(`${environment.apiUrl}/login`, loginData).subscribe(
        (response) => {
          if (response && response.token) {
            // Store the token in cookies
            const expiresIn = 2;  // Set cookie expiration (in days)
            this.cookieService.set('authToken', response.token, expiresIn);

            // Store the user's username (optional, but useful for display purposes)
            this.cookieService.set('username', this.username, expiresIn);

            // Redirect to the profile page
            this.router.navigate(['/profile']);
          } else {
            alert('Invalid login credentials.');
          }
        },
        (error) => {
          // Handle error case (e.g., incorrect credentials)
          alert('Login failed. Please check your credentials and try again.');
        }
      );
    } else {
      alert('Please enter both username and password.');
    }
  }
}
