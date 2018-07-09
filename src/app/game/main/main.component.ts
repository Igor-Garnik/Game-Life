import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GameService } from '../../service/game.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  value:number;
  maxValue:number = 10;
  minValue:number = 1
  field:Array<{}>;
  checked:boolean = false;
  interval:any;
  timeLeft:number = 1000;

  constructor(public gameService: GameService) {
  }

  setChecked(data) {
    data.active== 0 ? data.active = 1 : data.active = 0;
  }

  setRandom(): void {
    this.gameService.setRandomCells(this.field)
  }

  playGame() {
  /* setInterval(() => {this.gameService.startLife(this.field)}, this.timeLeft) */
  this.gameService.startLife(this.field)
}


  setTimeLeft(value: number): void {
    this.timeLeft = -(value*100-1000)
    if(this.interval) {
      setTimeout(function() {
        clearInterval(this.interval);
      }, 100);
    }
    this.interval = setInterval(() => {this.gameService.startLife(this.field)}, this.timeLeft)
  }

  clearField(){
    this.field = this.gameService.createLife();
  }

  ngOnInit() {
    this.field = this.gameService.createLife();
  }

}
