import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  x:number;
  y:number;
  array:Array<any> = [];
  field:any;
  maxRow:number = 40;
  maxCol:number = 40;
  neighbors:number;
  grid = []
  constructor() { }

  createLife() {
    for(let i = 0; i < this.maxRow; i++) {
      this.array[i] = [];
      for(let j = 0; j < this.maxCol; j++ ) {
        this.array[i][j] = {'active': 0};
      }  
    }
    return this.array;
  }

  setRandomCells(field):void {
    field.forEach(row => {
      row.forEach(cell => {
        cell['active'] = Math.floor(Math.random()*(0 + 2)) + 0;
      })
    })
  }

  /* startLife(field) {
    field.forEach((cell, i) => {
      cell.forEach((field , j) => {
        this.neighbors = 0
        if(field[this.checkBottomEdge([i]) - 1][j].active == 1) { this.neighbors++; } //up
        if(field[i][this.checkRightEdge(j) + 1].active == 1) { this.neighbors++; } //right
        if(field[this.checkRightEdge(i) + 1][j].active == 1) { this.neighbors++; } //bottom
        if(field[i][this.checkBottomEdge(j) - 1].active == 1) { this.neighbors++; } //left
        if(field[this.checkBottomEdge(i) - 1] [this.checkRightEdge(j) + 1].active == 1) { this.neighbors++; }
        if(field[this.checkRightEdge(i) + 1] [this.checkRightEdge(j) + 1].active == 1) { this.neighbors++; }
        if(field[this.checkRightEdge(i) + 1] [this.checkBottomEdge(j) - 1].active == 1) { this.neighbors++; }
        if(field[this.checkBottomEdge(i) - 1] [this.checkBottomEdge(j) - 1].active == 1) { this.neighbors++; }
        this.grid[i][j] = field[i][j];
        this.checkCells(field[i][j], this.grid[i][j])
      })
    })
    console.log(this.grid)
  } */



  startLife(field) {
    for(let i = 0; i < field.length; i++) {
      this.grid[i] =[]
      for(var j = 0; j < field[i].length; j++ ) {
        this.neighbors = 0
        if(field[this.checkBottomEdge([i]) - 1][j].active == 1) { this.neighbors++; } //up
        if(field[i][this.checkRightEdge(j) + 1].active == 1) { this.neighbors++; } //right
        if(field[this.checkRightEdge(i) + 1][j].active == 1) { this.neighbors++; } //bottom
        if(field[i][this.checkBottomEdge(j) - 1].active == 1) { this.neighbors++; } //left
        if(field[this.checkBottomEdge(i) - 1] [this.checkRightEdge(j) + 1].active == 1) { this.neighbors++; }
        if(field[this.checkRightEdge(i) + 1] [this.checkRightEdge(j) + 1].active == 1) { this.neighbors++; }
        if(field[this.checkRightEdge(i) + 1] [this.checkBottomEdge(j) - 1].active == 1) { this.neighbors++; }
        if(field[this.checkBottomEdge(i) - 1] [this.checkBottomEdge(j) - 1].active == 1) { this.neighbors++; }
        this.grid[i][j] = field[i][j];
        field[i][j].active = this.checkCells(field[i][j].active, this.grid[i][j].active)
      }  
    }
    console.log(field)
  }

  addNaighbors(field: Array<[{}]>): Number{
    if(field[this.checkBottomEdge([i]) - 1][j].active == 1) { this.neighbors++; } //up
    if(field[i][this.checkRightEdge(j) + 1].active == 1) { this.neighbors++; } //right
    if(field[this.checkRightEdge(i) + 1][j].active == 1) { this.neighbors++; } //bottom
    if(field[i][this.checkBottomEdge(j) - 1].active == 1) { this.neighbors++; } //left
    if(field[this.checkBottomEdge(i) - 1] [this.checkRightEdge(j) + 1].active == 1) { this.neighbors++; }
    if(field[this.checkRightEdge(i) + 1] [this.checkRightEdge(j) + 1].active == 1) { this.neighbors++; }
    if(field[this.checkRightEdge(i) + 1] [this.checkBottomEdge(j) - 1].active == 1) { this.neighbors++; }
    if(field[this.checkBottomEdge(i) - 1] [this.checkBottomEdge(j) - 1].active == 1) { this.neighbors++; }
  }

  checkCells(field, grid) {
    let state = field;
    if(state == 0 && this.neighbors > 2) {
      return 1 
    } else if(state == 1 && (this.neighbors > 2 || this.neighbors <3)){
      return 0 
    } else {
      return state;
    }
  }

  checkBottomEdge(edge: any) {
    return edge == 0 ? this.maxRow : edge;
  }

  checkRightEdge(edge: any) {
    return edge == 39 ? -1 : edge;
  }


}


