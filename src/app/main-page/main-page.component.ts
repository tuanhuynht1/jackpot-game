import { Component, OnInit } from '@angular/core';
import { Direction } from '../shared/enums';

const RED = 0;
const GREEN = 1;
const BLUE = 2;
const GOLD = 3;
const SIZE = 11;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  grid: Circle[][] = []; // 9x9 circles
  colorStates: ColorState[]= []; // use consts to index each color state
  styles: string[] = ['red','green','blue','gold'];
  bulletIndex: Index = new Index(-1, Math.floor(SIZE/2));
  bulletIntervalId: number;
  buttonDisabled = false;
  shotsRemaining: number = 8;

  constructor(){

    // initialize grid
    for(let i = 0; i < SIZE; i++) {

      this.grid.push([]); 

      for (let j = 0; j < SIZE; j++) {
        this.grid[i].push(new Circle());
      }
    }

    // initialize color states
    for(let i = 0; i < 4; i++) {

      this.colorStates.push(new ColorState());
      this.colorStates[i].currentIndex = new Index(i,i);
    }

    // initialize styles
    this.grid[0][0].style = this.styles[RED];
    this.grid[1][1].style = this.styles[GREEN];
    this.grid[2][2].style = this.styles[BLUE];
    this.grid[3][3].style = this.styles[GOLD];
    
  }

  ngOnInit(): void {

    // initialize color rotations
    this.colorStates[RED].intervalId = setInterval(() => this.incrementRing(RED),60);
    this.colorStates[GREEN].intervalId = setInterval(() => this.incrementRing(GREEN),60);
    this.colorStates[BLUE].intervalId = setInterval(() => this.incrementRing(BLUE),60);
    this.colorStates[GOLD].intervalId = setInterval(() => this.incrementRing(GOLD),60);
  }

  incrementRing(color: number) : void{

    // use color const value as offset amount 
    let offset = color; 

    // remove style on current index
    let currentIndex = this.colorStates[color].currentIndex;
    this.grid[currentIndex.i][currentIndex.j].style = '';  

    // increment based on current direction
    switch(this.colorStates[color].direction){

      case Direction.Right:
        this.colorStates[color].currentIndex.j++;
        if (this.colorStates[color].currentIndex.j === SIZE - 1 - offset) {
          this.colorStates[color].direction = Direction.Down;
        }
        break;

      case Direction.Down:
        this.colorStates[color].currentIndex.i++;
        if (this.colorStates[color].currentIndex.i === SIZE - 1 - offset) {
          this.colorStates[color].direction = Direction.Left;
        }
        break;

      case Direction.Left:
        this.colorStates[color].currentIndex.j--;
        if (this.colorStates[color].currentIndex.j === 0 + offset) {
          this.colorStates[color].direction = Direction.Up;
        }
        break;
      
      case Direction.Up:
        this.colorStates[color].currentIndex.i--;
        if (this.colorStates[color].currentIndex.i === 0 + offset) {
          this.colorStates[color].direction = Direction.Right;
        }
        break;
    }

    // update style on new index
    let style = this.styles[color];
    currentIndex = this.colorStates[color].currentIndex;
    this.grid[currentIndex.i][currentIndex.j].style = style;

    if(currentIndex.i == this.bulletIndex.i && currentIndex.j == this.bulletIndex.j) {
      clearInterval(this.colorStates[color].intervalId);
    }
  }

  onClick() : void {

    if (!this.buttonDisabled) {
      this.shotsRemaining--;
      this.buttonDisabled = true;
      this.bulletIndex.i = SIZE;
      this.bulletIntervalId = setInterval(() => this.bulletIncrement(), 60);
    }
  }

  bulletIncrement() : void {

    if (this.bulletIndex.i === 0) {
      this.buttonDisabled = false;
      clearInterval(this.bulletIntervalId);
    }
    this.bulletIndex.i--;

    for(let i = 0; i < this.colorStates.length; i++) {
      let currentIndex = this.colorStates[i].currentIndex;
      if(currentIndex.i == this.bulletIndex.i && currentIndex.j == this.bulletIndex.j) {
        clearInterval(this.colorStates[i].intervalId);
      }
    }

  }

}



export class ColorState {
  currentIndex: Index;
  direction: Direction = Direction.Right;
  intervalRate: number = 50;
  intervalId: number;
}

export class Index {
  constructor(public i: number, public j: number){}
}

export class Circle {
  style: string;  
}
