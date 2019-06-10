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

@NgModule({
  declarations: [
    AppComponent,
    PlayereditComponent,
    LoadandresponseComponent,
    NewtournamentComponent,
    OnlynumberDirective
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
