import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { MatModule } from './../mat.module';



@NgModule({
  imports: [
    CommonModule,
    MatModule
  ],
  exports: [
    MainComponent
  ],
  declarations: [MainComponent]
})
export class GameModule { }
