import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainmenuComponent } from './views/mainmenu/mainmenu.component';
import { TournamentComponent } from './views/tournament/tournament.component';
import { TournamentViewerComponent } from './views/tournament/tournament-viewer/tournament-viewer.component';


const routes: Routes = [
  {path: '', component: MainmenuComponent},
  {path: 'tournament/:uuid', component: TournamentComponent},
  {path: 'tournamentshow/:uuid', component: TournamentViewerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
