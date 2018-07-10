import { Injectable } from '@angular/core';
import { Cell } from './../models/cell'

@Injectable({
  providedIn: 'root'
})
export class GameService {
  x:number;
  y:number;
  array:Array<any> = [];
  field:any;
  neighbors:number;
  grid = []

  constructor() { }

  createLife(row, col): Array<[{}]> {
    for(let i = 0; i < row; i++) {
      this.array[i] = [];
      for(let j = 0; j < col; j++ ) {
        this.array[i][j] = new Cell(i,j,false)        
      }  
    }
    return this.array;
  }

  setRandomCells(field):void {
    field.forEach(row => {
      row.forEach(cell => {
        cell['isAlive'] = Math.floor(Math.random()*(0 + 2)) + 0;
      })
    })
  }

  startLife(field): Array<[{}]> {
    let array:Array<[{}]>
    field.forEach((row) => {
      array[row] = row
      row.forEach(Cell => {
        array[Cell] = Cell;
        let neighbors = this.getNeighbors(Cell, Cell['x'], Cell['y']);
        array['isAlive'] = this.checkCellsState(Cell['isAlive']);
      })
    })
    return array
  }

  getNeighbors(cell: {}, x: number, y: number ): void {
    this.neighbors = 0
    if(cell[this.checkXEdge(x) - 1][y].isAlive == 1) { this.neighbors++; }
    if(cell[x][this.checkYEdge(y) + 1].active == 1) { this.neighbors++; } 
    if(cell[this.checkYEdge(x) + 1][y].active == 1) { this.neighbors++; } 
    if(cell[x][this.checkXEdge(y) - 1].active == 1) { this.neighbors++; } 
    if(cell[this.checkXEdge(x) - 1] [this.checkYEdge(y) + 1].active == 1) { this.neighbors++; }
    if(cell[this.checkYEdge(x) + 1] [this.checkYEdge(y) + 1].active == 1) { this.neighbors++; }
    if(cell[this.checkYEdge(x) + 1] [this.checkXEdge(y) - 1].active == 1) { this.neighbors++; }
    if(cell[this.checkXEdge(x) - 1] [this.checkXEdge(y) - 1].active == 1) { this.neighbors++; }
  }

  checkXEdge(x) {
    return x == 0 ? 40 : x;
  }

  checkYEdge(y) {
    return y == 39 ? -1 : y;
  }
  
  checkCellsState(state: boolean) {
    if(state == false && this.neighbors > 2) {
      return true
    } else if(state == true && (this.neighbors > 2 || this.neighbors <3)){
      return false 
    } else {
      return state;
    }
  }

  /* startLife(field) {
    for(let i = 0; i < field.length; i++) {
      this.grid[i] =[]
      for(var j = 0; j < field[i].length; j++ ) {
        this.neighbors = 0;
        this.grid[i][j] = field[i][j];
        if(field[this.checkBottomEdge([i]) - 1][j].active == 1) { this.neighbors++; }
        if(field[i][this.checkRightEdge(j) + 1].active == 1) { this.neighbors++; } 
        if(field[this.checkRightEdge(i) + 1][j].active == 1) { this.neighbors++; } 
        if(field[i][this.checkBottomEdge(j) - 1].active == 1) { this.neighbors++; } 
        if(field[this.checkBottomEdge(i) - 1] [this.checkRightEdge(j) + 1].active == 1) { this.neighbors++; }
        if(field[this.checkRightEdge(i) + 1] [this.checkRightEdge(j) + 1].active == 1) { this.neighbors++; }
        if(field[this.checkRightEdge(i) + 1] [this.checkBottomEdge(j) - 1].active == 1) { this.neighbors++; }
        if(field[this.checkBottomEdge(i) - 1] [this.checkBottomEdge(j) - 1].active == 1) { this.neighbors++; }
        this.grid[i][j].active = this.checkCells(field[i][j].active, this.grid[i][j].active)
      }  
    }
  }
 */
 

  

  



  


}


