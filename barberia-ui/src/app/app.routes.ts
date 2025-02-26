import { Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { SignupComponent } from './shared/components/signup/signup.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';

export const routes: Routes = [
    {path:'dashboard',component: DashboardComponent},
    {path:'',component: LoginComponent},
    {path:'signup',component: SignupComponent},
];
