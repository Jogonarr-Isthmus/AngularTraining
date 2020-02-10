import { Component, OnInit } from '@angular/core';

export interface Team {
  name: string;
  position: number;
  points: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  teams: Team[] = [
    {
      name: 'Real Madrid',
      position: 1,
      points: 43
    },
    {
      name: 'Barcelona',
      position: 2,
      points: 40
    },
    {
      name: 'Villareal',
      position: 4,
      points: 35
    },
    {
      name: 'Valladolid',
      position: 3,
      points: 39
    },
    {
      name: 'Deportivo',
      position: 7,
      points: 20
    },
    {
      name: 'Atletico de Madrid',
      position: 6,
      points: 25
    },
    {
      name: 'Real Betis',
      position: 5,
      points: 30
    }
  ];

  ngOnInit() {
  }

}
