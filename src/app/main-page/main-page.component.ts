import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  grid: Circle[][] = [];
  currentIndex: Index = new Index(0,0);
  direction: Direction = Direction.Right;

  constructor(){
    for(let i = 0; i < 9; i++) {

      this.grid.push([]); 

      for (let j = 0; j < 9; j++) {
        this.grid[i].push(new Circle());
      }
    }
  }

  ngOnInit(): void {
    setInterval(() => {

      switch(this.direction){

        case Direction.Right:
          this.currentIndex.j++;
          if (this.currentIndex.j === 8) {
            this.direction = Direction.Down;
          }
          break;

        case Direction.Down:
          this.currentIndex.i++;
          if (this.currentIndex.i === 8) {
            this.direction = Direction.Left;
          }
          break;

        case Direction.Left:
          this.currentIndex.j--;
          if (this.currentIndex.j === 0) {
            this.direction = Direction.Up;
          }
          break;
        
        case Direction.Up:
          this.currentIndex.i--;
          if (this.currentIndex.i === 0) {
            this.direction = Direction.Right;
          }
          break;

      }

      
    },50);
  }

}

export enum Direction {
  Up,
  Down,
  Left,
  Right
}

export class Index {
  constructor(public i: number, public j: number){}
}

export class Circle {  
  constructor(){}
}
