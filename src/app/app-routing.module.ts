import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./core/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'about-us',
    loadChildren: () =>
      import('./core/about-us/about-us.module').then((m) => m.AboutUsModule),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./core/contact/contact.module').then((m) => m.ContactModule)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./core/auth/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./core/auth/register/register.module').then((m) => m.RegisterModule),
  },
  { 
    path: 'tickets', 
    loadChildren: () => 
      import('./core/tickets/visitor-tickets/visitor-tickets.module').then(m => m.VisitorTicketsModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'serve-tickets', 
    loadChildren: () => 
      import('./core/tickets/employee-tickets/employee-tickets.module').then(m => m.EmployeeTicketsModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
