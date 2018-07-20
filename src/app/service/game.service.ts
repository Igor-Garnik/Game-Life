import { Injectable } from '@angular/core';
import { Cell } from './../models/cell'

@Injectable({
  providedIn: 'root'
})
export class GameService {
  x: number;
  y: number;
  isAlive: boolean;

  constructor() { }

  nestedForEach(arr, call) {
    arr.forEach((row, y) => row.forEach((cell, x) => call(cell, [y, x])));
  }

  fillArray(arr, val, cnt) {
    for (let i = 0; i < cnt; i++) arr.push(val(i));
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
    return this.createField(() => Math.random() > range, size);
  }

  getNeighbors(pos, lifeSize) {
    const neighbors = []
    for (let y = pos[0] - 1; y <= pos[0] + 1; y++) {
      for (let x = pos[1] - 1; x <= pos[1] + 1; x++) {

        //Исключить текущуу ячейку
        if (!(pos[0] == y && pos[1] == x)) {

          //перезаписать координаты если они выходят за рамки жизни
          let res = [y, x].map(pos => pos < 0 ? lifeSize - 1 : pos);
          res = res.map(pos => pos > lifeSize - 1 ? 0 : pos);

          neighbors.push(res);
        }
      }
    }
    return neighbors;
  }

  getAliveNeighbors(field, curPos) {
    return this.getNeighbors(curPos, field.length)
      .filter(pos => field[pos[0]][pos[1]].isAlive);
  }

  applyGameRules(state, neighborsCnt) {
    return (state && (neighborsCnt > 3 || neighborsCnt < 2)) ||
      (!state && neighborsCnt == 3);
  }

  getMustBeChanged(field) {
    let changedPosArr = [];
    this.nestedForEach(field, (cell, pos) => {
      let aliveCnt = this.getAliveNeighbors(field, pos).length;
      if (this.applyGameRules(cell.isAlive, aliveCnt)) {
        changedPosArr.push(pos);
      }
    });
    return changedPosArr;
  }

}


