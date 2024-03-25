import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : 'signin',
    loadChildren: () => import('./components/signin/signin.module').then(m => m.SigninModule) 
  },
  {
    path : 'home',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
