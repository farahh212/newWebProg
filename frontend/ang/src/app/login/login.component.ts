import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { RouterModule } from '@angular/router'; // Import RouterModule for routing
import { CookieService} from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  pass: string = '';

  constructor(private router: Router, private cookieService: CookieService) { }

  onLoginClick() {
    // Validate the login details (in this case, we'll assume it's always valid)
    if (this.email && this.pass) {
      // Store the user details in cookies (you can store more information based on requirements)
      // Set cookies with an expiration of 2 days
      const expiresIn = 2;  // in days
      this.cookieService.set('userEmail', this.email, expiresIn);
      this.cookieService.set('isLoggedIn', 'true', expiresIn); // Set a cookie to track if the user is logged in

      // Show a login success message
      alert('You are logged in!');

      // Redirect to the profile page
      this.router.navigate(['/profile']);
    } else {
      // Handle the case when email or password is empty
      alert('Please enter both email and password.');
    }
  }
}
