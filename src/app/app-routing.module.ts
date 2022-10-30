import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainmenuComponent } from './views/mainmenu/mainmenu.component';
import { TournamentViewerComponent } from './views/tournament/tournament-viewer/tournament-viewer.component';
import { TournamentComponent } from './views/tournament/tournament.component';

const routes: Routes = [
  {path: '', component: MainmenuComponent},
  {path: 'tournament/:uuid', component: TournamentComponent},
  {path: 'tournamentshow', component: TournamentViewerComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
