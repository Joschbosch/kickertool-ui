import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelComponent } from './views/base/panel/panel.component';
import { TableComponent } from './views/base/table/table.component';
import { ToolbarButtonComponent } from './views/base/toolbar-button/toolbar-button.component';
import { MainmenuComponent } from './views/mainmenu/mainmenu.component';
import { PlayerManagementComponent } from './views/mainmenu/player-management/player-management.component';
import { TournamentConfigurationComponent } from './views/mainmenu/tournament-configuration/tournament-configuration.component';
import { MatchresulteditorComponent } from './views/tournament/matchresulteditor/matchresulteditor.component';
import { PlayertournamentManagementComponent } from './views/tournament/playertournamentmanagement/playertournamentmanagement.component';
import { RankingdetailsComponent } from './views/tournament/rankingdetails/rankingdetails.component';
import { StopwatchComponent } from './views/tournament/stopwatch/stopwatch.component';
import { StopwatchviewerComponent } from './views/tournament/tournament-viewer/stopwatchviewer/stopwatchviewer.component';
import { TournamentViewerComponent } from './views/tournament/tournament-viewer/tournament-viewer.component';
import { TournamentComponent } from './views/tournament/tournament.component';

@NgModule({
  declarations: [
    AppComponent,
    MainmenuComponent,
    ToolbarButtonComponent,
    PanelComponent,
    TableComponent,
    PlayerManagementComponent,
    TournamentConfigurationComponent,
    TournamentComponent,
    StopwatchComponent,
    TournamentViewerComponent,
    MatchresulteditorComponent,
    RankingdetailsComponent,
    StopwatchviewerComponent,
    PlayertournamentManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
