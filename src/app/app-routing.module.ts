import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HistoriqueComponent } from './components/historique/historique.component';

const routes: Routes = [
{path : '' , redirectTo: 'historique', pathMatch:'full'},
{path : 'navbar' , component : NavbarComponent},
{path : 'historique' , component : HistoriqueComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
