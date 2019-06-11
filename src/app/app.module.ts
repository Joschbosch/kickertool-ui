import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayereditComponent } from './playeredit/playeredit.component';
import { LoadandresponseComponent } from './loadandresponse/loadandresponse.component';
import { NewtournamentComponent } from './newtournament/newtournament.component';
import { OnlynumberDirective } from './classes/directives/onlynumber.directive';
import { TournamentComponent } from './tournament/tournament.component';
import { MainmenuComponent } from './mainmenu/mainmenu.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayereditComponent,
    LoadandresponseComponent,
    NewtournamentComponent,
    OnlynumberDirective,
    TournamentComponent,
    MainmenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
