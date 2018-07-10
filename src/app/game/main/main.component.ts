import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GameService } from '../../service/game.service';
import { Cell } from './../../models/cell'


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  row:number = 40;
  col:number = 40;
  speed:number;
  maxValue:number = 10;
  minValue:number = 1
  field:Array<[{}]>;
  intervalValue:any;
  interval:number = 1000;

  constructor(public gameService: GameService) {
  }

  changeState(data) {
    data.isAlive = !data.isAlive;
  }

  setRandomLife(field): void {
    this.gameService.setRandomCells(field);
  }

  playGame() {
    this.field = [...this.gameService.startLife(this.field)];
    setInterval(() => {this.gameService.startLife(this.field)}, this.interval);
  
  }

  setInterval(speed: number): void {
    this.interval = -(speed*100-1000);
    if(this.interval) {
      clearInterval(this.interval);
    }
    this.intervalValue = setInterval(() => {this.gameService.startLife(this.field)}, this.interval);
  }

  clearField(){
    if(this.interval) {
      clearInterval(this.interval);
    }
    this.field = [...this.gameService.createLife(this.row, this.col)];
  }

  ngOnInit() {
    this.field = this.gameService.createLife(this.row, this.col);
  }

}
