import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { CommonModule } from '@angular/common';  // Import CommonModule for ngIf
import { CookieService } from 'ngx-cookie-service';  // Import CookieService

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    imports: [FormsModule, CommonModule] // Ensure FormsModule is in imports
})
export class ProfileComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  profilePicture: string = '';
  opScore: number = 0; // Optional top score property

  isChangeEmailModalOpen = false;
  isChangePasswordModalOpen = false;

  newEmail: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    // Initialize your profile details
    this.name = 'User Name';  // You can set it based on the profile data
    this.email = 'user@example.com';
    this.profilePicture = 'some-picture-url';  // Replace with dynamic picture if needed
    this.opScore = 100;  // Example score, adjust accordingly
  }

  // Logout method
  logout(): void {
    // Delete the authentication cookie
    this.cookieService.delete('userEmail');
    this.cookieService.delete('isLoggedIn');

    // Redirect to the home page
    this.router.navigate(['/home']);  // Adjust if your home page route differs
  }

  // Open the change email modal
  openChangeEmailModal(): void {
    this.isChangeEmailModalOpen = true;
  }

  // Close the change email modal
  closeChangeEmailModal(): void {
    this.isChangeEmailModalOpen = false;
  }

  // Open the change password modal
  openChangePasswordModal(): void {
    this.isChangePasswordModalOpen = true;
  }

  // Close the change password modal
  closeChangePasswordModal(): void {
    this.isChangePasswordModalOpen = false;
  }

  // Handle the change of email
  changeEmail(): void {
    if (this.newEmail) {
      // Perform any necessary logic for changing the email
      console.log('Email changed to:', this.newEmail);
      this.email = this.newEmail;  // Update email in profile
      this.closeChangeEmailModal();  // Close the modal
    } else {
      this.errorMessage = 'Please enter a valid email';
    }
  }

  // Handle the change of password
  changePassword(): void {
    if (this.newPassword && this.newPassword === this.confirmNewPassword) {
      // Perform any necessary logic for changing the password
      console.log('Password changed successfully');
      this.password = this.newPassword;  // Update password in profile
      this.closeChangePasswordModal();  // Close the modal
    } else {
      this.errorMessage = 'Passwords do not match or are empty';
    }
  }

  // Method to go to the game page (Vue application)
  goToGamePage(): void {
    // Replace this URL with the actual URL of your Vue app
    window.location.href = 'http://localhost:8080/';  // Example: Vue app's game page
  }
}


