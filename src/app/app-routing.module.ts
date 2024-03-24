import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'sing-up',
    component: SingUpComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
