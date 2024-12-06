import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect root to /home
    {path:'home',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'profile',component:ProfileComponent},
    {path:'sign-up',component:SignUpComponent}
];
