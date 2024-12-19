import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  // Import CommonModule for ngIf

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule]
})
export class SignUpComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Clear form fields when the page loads
    this.resetForm();
  }

  resetForm(): void {
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  onSubmit() {
    if (this.isValidForm()) {
      console.log('User signed up with:', this.name, this.email, this.password);
      // Redirect to login page after sign-up
      this.router.navigate(['/login'], { queryParams: { name: this.name, email: this.email, password: this.password } });
      // Optionally reset the form after successful submission
      this.resetForm();
    } else {
      // Show error messages as alerts
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

    // Ensure all fields are filled
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      valid = false;
    }

    return valid;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  showErrorAlert() {
    let alertMessage = '';

    // Collect error messages
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      alertMessage += 'All fields are required.\n';
    }

    if (this.password.length < 8) {
      alertMessage += 'Password must be at least 8 characters long.\n';
    }

    if (this.password !== this.confirmPassword) {
      alertMessage += 'Passwords do not match.\n';
    }

    // Show the alert with error messages
    if (alertMessage) {
      window.alert(alertMessage);  // Displays the error messages in a pop-up alert
    }
  }
}
