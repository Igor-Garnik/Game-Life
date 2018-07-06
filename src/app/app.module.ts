import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { GameModule } from './game/game.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    GameModule
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
