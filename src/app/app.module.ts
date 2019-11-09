import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarButtonComponent } from './views/base/toolbar-button/toolbar-button.component';
import { MainmenuComponent } from './views/mainmenu/mainmenu.component';
import { PanelComponent } from './views/base/panel/panel.component';
import { TableComponent } from './views/base/table/table.component';
import { PlayerManagementComponent } from './views/mainmenu/player-management/player-management.component';
import { TournamentConfigurationComponent } from './views/mainmenu/tournament-configuration/tournament-configuration.component';
import { TournamentComponent } from './views/tournament/tournament.component';
import { StopwatchComponent } from './views/tournament/stopwatch/stopwatch.component';
import { TournamentViewerComponent } from './views/tournament/tournament-viewer/tournament-viewer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    TournamentViewerComponent
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
