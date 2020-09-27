import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AboutUsComponent } from './about-us.component';

const aboutUsRoutes: Routes = [
  {
    path: '',
    component: AboutUsComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(aboutUsRoutes)
  ]
})

export class AboutUsModule {

}