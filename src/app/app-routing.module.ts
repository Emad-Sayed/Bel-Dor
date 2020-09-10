import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: '/home',
    // loadChildren: () => import('./core/home/home.module').then(m => m.)
  },
  {
    path: '/about-us',
    loadChildren: () => import('./core/about-us/about-us.module').then(m => m.AboutUsModule)
  },
  {
    path: '',
    // component:
  },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
