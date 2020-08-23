import { Component, OnInit } from '@angular/core';
import { Direction, Color } from '../shared/enums'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  grid: Circle[][] = [];

  ringStates: RingState[]= [];

  redIndex: Index = new Index(0,0);
  redDirection: Direction = Direction.Right;

  greenIndex: Index = new Index(1,1);
  greenDirection: Direction = Direction.Right;

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
    this.grid[0][0].style = 'red';
    this.grid[1][1].style = 'green';
    this.grid[2][2].style = 'blue';
    this.grid[3][3].style = 'gold';

  }

  ngOnInit(): void {

    // setInterval(() => {
    //   switch(this.redDirection){

    //     case Direction.Right:
    //       this.redIndex.j++;
    //       if (this.redIndex.j === 8) {
    //         this.redDirection = Direction.Down;
    //       }
    //       break;

    //     case Direction.Down:
    //       this.redIndex.i++;
    //       if (this.redIndex.i === 8) {
    //         this.redDirection = Direction.Left;
    //       }
    //       break;

    //     case Direction.Left:
    //       this.redIndex.j--;
    //       if (this.redIndex.j === 0) {
    //         this.redDirection = Direction.Up;
    //       }
    //       break;
        
    //     case Direction.Up:
    //       this.redIndex.i--;
    //       if (this.redIndex.i === 0) {
    //         this.redDirection = Direction.Right;
    //       }
    //       break;
    //   }
    // },50);
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
