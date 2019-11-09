import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainmenuComponent } from './views/mainmenu/mainmenu.component';
import { TournamentComponent } from './views/tournament/tournament.component';


const routes: Routes = [
  {path: '', component: MainmenuComponent},
  {path: 'tournament/:uuid', component: TournamentComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
