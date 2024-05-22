import { Routes } from '@angular/router';
import { WebsiteComponent } from './website/website/website.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { RegisterPageComponent } from './pages/auth/register-page/register-page.component';
import { DashboardComponent } from './shared/dashboard/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: WebsiteComponent,
    },
    {
        path: 'login',
        component: LoginPageComponent
    },
    {
        path:'register',
        component:RegisterPageComponent
    },
    {
        path:'dashboard',
        component:DashboardComponent
    }
];
