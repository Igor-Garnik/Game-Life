import { Injectable } from '@angular/core';
import { Cell } from './../models/cell'

@Injectable({
  providedIn: 'root'
})
export class GameService {
  x:number;
  y:number;
  array:Array<any> = [];
  neighbors:number;
  isAlive:boolean;
  //arr = [];

  constructor() { }

  nestedForEach(arr, call) {
    arr.forEach((row, y) => row.forEach((cell, x) => call(cell, [y, x])));
  }

  fillArray(arr, val, cnt){
    for(let i = 0; i < cnt; i++) arr.push(val(i));
    return arr;
  }

  createField(isAlive, size) {
    return this.fillArray([], () => [], size)
      .map((arr, y) => this.fillArray(arr, (x) => new Cell(x, y, isAlive()), size));
  }

  createEmptyField(size) {
    return this.createField(() => false, size);
  }

  createRandomField(range, size) {
    return this.createField(() => Math.random()>range, size);
  }

  getNeighbors(pos,lifeSize) {
    const neighbors = []
    for(let y = pos[0] - 1; y <= pos[0] + 1; y++) {
      for(let x = pos[1] - 1; x <= pos[1] + 1; x++) {
        //Исключить текущуу ячейку
        //перезаписать координаты если они выходят за рамки жизни
        
        neighbors.push([y,x]);
      }
    }
    return neighbors;
  }

  getAliveNeighbors(field, curPos) {
  this.getNeighbors(curPos, field.length);
  }

  getChangedOnly(field) {
    let changedPosArr = [];
    this.nestedForEach(field, (cell, pos) => {
      this.getAliveNeighbors(field, pos)
    });




    return changedPosArr;
  }

  







  startLife(field): Array<[{Cell}]> {
    let array:Array<[{Cell}]> = [];
    field.forEach((row, index) => {
      let arr:Array<Cell> = [];
      row.forEach((cell, i)=> {
        this.countNeighbors(cell.x, cell.y, field);
        cell.isAlive = this.checkCellsState(cell.isAlive);
        array['arr'][i].push(cell);
        
      })
    })
    console.log(array);
    return array
  }

  countNeighbors(x: number, y: number, field: Array<[{Cell}]>): void {
    this.neighbors = 0
    if(x = (this.checkXEdge(x) - 1), y, this.findCell(x, y, field), this.isAlive == true) { this.neighbors++; }
    if(x, y = (this.checkYEdge(y) + 1), this.findCell(x, y, field), this.isAlive == true) { this.neighbors++; } 
    if(x = (this.checkYEdge(x) + 1), y, this.findCell(x, y, field), this.isAlive == true) { this.neighbors++; } 
    if(x, y = (this.checkXEdge(y) - 1), this.findCell(x, y, field), this.isAlive == true) { this.neighbors++; } 
    if(x = (this.checkXEdge(x) - 1), y = (this.checkYEdge(y) + 1), this.findCell(x, y, field), this.isAlive == true) { this.neighbors++; }
    if(x = (this.checkYEdge(x) + 1), y = (this.checkYEdge(y) + 1), this.findCell(x, y, field), this.isAlive == true) { this.neighbors++; }
    if(x = (this.checkYEdge(x) + 1), y = (this.checkXEdge(y) - 1), this.findCell(x, y, field), this.isAlive == true) { this.neighbors++; }
    if(x = (this.checkXEdge(x) - 1), y = (this.checkXEdge(y) - 1), this.findCell(x, y, field), this.isAlive == true) { this.neighbors++; }
  }

  checkXEdge(x): number {
    return x == 0 ? 40 : x;
  }

  checkYEdge(y): number {
    return y == 39 ? -1 : y;
  }

  findCell(x: number, y: number, field: Array<[{Cell}]> ): void {
    field.forEach(row => {
      row.forEach(cell => {
        if(cell.x == x && cell.y == y) {
          this.isAlive = cell.isAlive ? true : false;
        }
      })
    })
  }
  
  checkCellsState(state: boolean): boolean {
    if(state == false && this.neighbors > 2) {
      return true
    } else if(state == true && (this.neighbors > 2 || this.neighbors < 4)){
      return false 
    } else {
      return state;
    }
  }

  function fill2Darray(callable, size){
    const fn = (arr, val, cnt) => arr.length < cnt ?  (arr.push(val()), fn(arr, val, cnt)) : arr;
    return fn([], () => [], size).map( arr => fn(arr, callable, size));
}

function getRnd2DArray(size, range=0.5){
    return fill2Darray( ()=>Math.random()>range , size);
}

console.log(getRnd2DArray(10));

  



  


}


