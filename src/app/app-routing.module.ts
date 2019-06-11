import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TournamentComponent } from './tournament/tournament.component';
import { MainmenuComponent } from './mainmenu/mainmenu.component';

const routes: Routes = [
    {path: '', component: MainmenuComponent},
    {path: 'tournamentview/:uuid', component: TournamentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
