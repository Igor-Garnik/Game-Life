import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { CellComponent } from './cell/cell.component';
import { MatModule } from './../mat.module';



@NgModule({
  imports: [
    CommonModule,
    MatModule
  ],
  exports: [
    MainComponent
  ],
  declarations: [MainComponent, CellComponent]
})
export class GameModule { }
