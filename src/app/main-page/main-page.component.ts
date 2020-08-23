import { Component, OnInit } from '@angular/core';
import { Direction } from '../shared/enums';

const RED = 0;
const GREEN = 1;
const BLUE = 2;
const GOLD = 3;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  grid: Circle[][] = []; // 9x9 circles
  ringStates: RingState[]= []; // use consts to index each ring color
  styles: string[] = ['red','green','blue','gold'];

  constructor(){

    // initialize grid
    for(let i = 0; i < 9; i++) {

      this.grid.push([]); 

      for (let j = 0; j < 9; j++) {
        this.grid[i].push(new Circle());
      }
    }

    // initialize ring states
    for(let i = 0; i < 4; i++) {

      this.ringStates.push(new RingState());
      this.ringStates[i].currentIndex = new Index(i,i);
    }

    // initialize styles
    this.grid[0][0].style = this.styles[RED];
    this.grid[1][1].style = this.styles[GREEN];
    this.grid[2][2].style = this.styles[BLUE];
    this.grid[3][3].style = this.styles[GOLD];
  }

  ngOnInit(): void {

    // initialize ring rotations
    setInterval(() => this.incrementRing(RED),50);
    setInterval(() => this.incrementRing(GREEN),50);
    setInterval(() => this.incrementRing(BLUE),50);
    setInterval(() => this.incrementRing(GOLD),50);
  }

  incrementRing(color: number) : void{

    // use color const value as offset amount 
    let offset = color; 

    // remove style on current index
    let currentIndex = this.ringStates[color].currentIndex;
    this.grid[currentIndex.i][currentIndex.j].style = '';  

    // increment based on current direction
    switch(this.ringStates[color].direction){

      case Direction.Right:
        this.ringStates[color].currentIndex.j++;
        if (this.ringStates[color].currentIndex.j === 8 - offset) {
          this.ringStates[color].direction = Direction.Down;
        }
        break;

      case Direction.Down:
        this.ringStates[color].currentIndex.i++;
        if (this.ringStates[color].currentIndex.i === 8 - offset) {
          this.ringStates[color].direction = Direction.Left;
        }
        break;

      case Direction.Left:
        this.ringStates[color].currentIndex.j--;
        if (this.ringStates[color].currentIndex.j === 0 + offset) {
          this.ringStates[color].direction = Direction.Up;
        }
        break;
      
      case Direction.Up:
        this.ringStates[color].currentIndex.i--;
        if (this.ringStates[color].currentIndex.i === 0 + offset) {
          this.ringStates[color].direction = Direction.Right;
        }
        break;
    }

    // update style on new index
    let style = this.styles[color];
    currentIndex = this.ringStates[color].currentIndex;
    this.grid[currentIndex.i][currentIndex.j].style = style;
  }

}



export class RingState {
  currentIndex: Index;
  direction: Direction = Direction.Right;
  intervalRate: Number = 50;
  intervalId: Number;
}

export class Index {
  constructor(public i: number, public j: number){}
}

export class Circle {
  style: string;  
}
