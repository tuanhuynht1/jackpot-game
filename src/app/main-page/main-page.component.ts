import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  grid: Circle[][] = [];
  currentIndex: Index = new Index(0,0);

  constructor(){
    for(let i = 0; i < 10; i++) {

      this.grid.push([]); 

      for (let j = 0; j < 10; j++) {
        this.grid[i].push(new Circle());
      }
    }
  }

  ngOnInit(): void {
    setInterval(() => {
      this.currentIndex.j = (this.currentIndex.j + 1) % 10;
    },100);
  }

}

export class Index {
  constructor(public i: number, public j: number){}
}

export class Circle {  
  constructor(){}
}
