import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, HttpClientModule]
})
export class SignUpComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  apiUrl: string = 'http://127.0.0.1:8000/api/users/post'; // Replace with your actual backend URL

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.username = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  onSubmit(): void {
    if (this.isValidForm()) {
      const userData = {
        username: this.username,
        email: this.email,
        password: this.password
      };

      this.http.post(this.apiUrl, userData).subscribe({
        next: (response) => {
          console.log('User signed up successfully:', response);
          this.router.navigate(['/login'], {
            queryParams: { username: this.username, email: this.email }
          });
          this.resetForm();
        },
        error: (error) => {
          console.error('Error during signup:', error);
          window.alert('Failed to sign up. Please try again.');
        }
      });
    } else {
      this.showErrorAlert();
    }
  }

  isValidForm(): boolean {
    let valid = true;

    if (this.password.length < 8) {
      valid = false;
    }

    if (this.password !== this.confirmPassword) {
      valid = false;
    }

    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      valid = false;
    }

    if (!this.isValidEmail(this.email)) {
      valid = false;
    }

    return valid;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  showErrorAlert(): void {
    let alertMessage = '';

    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      alertMessage += 'All fields are required.\n';
    }

    if (this.password.length < 8) {
      alertMessage += 'Password must be at least 8 characters long.\n';
    }

    if (this.password !== this.confirmPassword) {
      alertMessage += 'Passwords do not match.\n';
    }

    if (!this.isValidEmail(this.email)) {
      alertMessage += 'Invalid email format.\n';
    }

    if (alertMessage) {
      window.alert(alertMessage);
    }
  }
}
