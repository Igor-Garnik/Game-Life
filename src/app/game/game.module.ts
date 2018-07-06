import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { CellComponent } from './cell/cell.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MainComponent, CellComponent]
})
export class GameModule { }
