import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { LoginComponent } from '../login/login.component';
import { CookieService } from 'ngx-cookie-service'; // Correctly import CookieService

@Component({
    selector: 'app-home',
    imports: [LoginComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'] // Fixed typo: `styleUrl` should be `styleUrls`
})
export class HomeComponent {
  constructor(private router: Router, private cookieService: CookieService) { } // Inject CookieService here

  onLoginClick(): void {
    this.router.navigate(['/login']);
  }

  onProfileClick(): void {
    const isLoggedIn = this.cookieService.get('isLoggedIn'); // Use the injected CookieService
    if (isLoggedIn) {
      this.router.navigate(['/profile']);
    } else {
      window.alert('Please log in first.'); // Simple alert for demonstration
    }
  }

  onSignupClick(): void {
    this.router.navigate(['/sign-up']);
  }
}
