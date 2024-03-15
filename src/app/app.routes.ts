import { Routes } from '@angular/router';
import { RegistrationComponent } from './component/registration/registration.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home/home.component';
// import { inject } from '@angular/core';
import { guardGuard } from './core/guards/guard.guard';

export const routes: Routes = [
    {path:'registration', component:RegistrationComponent},
    {path:'login', component:LoginComponent},
    {path:'', component:HomeComponent,canActivate:[guardGuard]},
    {path:'home', component:HomeComponent,canActivate:[guardGuard]}
    // {path:'home', component:HomeComponent,canActivate:[()=>inject(UserserviceService).isAuthenitcated()]},
];
