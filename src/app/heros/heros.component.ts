import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HERO_LIST } from '../heros-list';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {
  hero_list: Hero[] = HERO_LIST;
  selected_hero: Hero;

  constructor() { }

  ngOnInit(): void {
  }
  onSelect(hero: Hero): void{
    this.selected_hero = hero;
  }

}
