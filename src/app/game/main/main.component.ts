import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GameService } from '../../service/game.service';
import { Cell } from './../../models/cell'


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  size: number = 50;
  random: number = 0.5;
  speed: number;
  maxValue: number = 10;
  minValue: number = 1
  field: Cell[][];
  interval;
  time: number = 1000
  action: boolean = true;
  ignoreAction: boolean = true;

  constructor(public gameService: GameService) {
  }

  playGame(ignoreAction?) {
    if (!ignoreAction) this.action = !this.action;
    clearInterval(this.interval);
    this.interval = setInterval(() => { this.updateLife() }, this.time);
  }

  pauseGame() {
    this.action = !this.action;
    clearInterval(this.interval);
  }

  setEmptyLife() {
    this.field = this.gameService.createEmptyField(this.size);
  }

  setRandomLife() {
    this.field = this.gameService.createRandomField(this.random, this.size);
  }

  setGenerationSpeed(): void {
    this.time = 1000 - this.speed * 100;
    this.playGame(this.ignoreAction);
  }

  updateLife() {
    this.gameService.getMustBeChanged(this.field)
      .forEach(pos => this.toggleLive(pos));
  }

  toggleLive(pos: number[]) {
    this.field[pos[0]][pos[1]].isAlive = !this.field[pos[0]][pos[1]].isAlive;
  }

  ngOnInit() {
    this.setEmptyLife();
  }

}
