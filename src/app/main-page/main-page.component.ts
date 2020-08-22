import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  grid: Grid = new Grid();

  constructor() { }

  ngOnInit(): void {
  }

}

export class Grid {  

  private grid: Circle[][] = [];

  constructor(){
    for(let i = 0; i < 10; i++) {

      this.grid.push([]);

      for (let j = 0; j < 10; j++) {
        this.grid[i].push(new Circle());
      }
    }
  }
} 



export class Circle {  
  constructor(){}
}
