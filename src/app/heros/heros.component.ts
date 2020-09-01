import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessagesService } from '../messages.service';


@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {
  hero_list: Hero[];

  constructor(
    private heroService: HeroService,
    private messageService: MessagesService
  ) { }

  ngOnInit(): void {
    this.getHeroList();
  }
  onSelect(hero: Hero): void{  
    this.messageService.add_message(`Selected hero with ID ${hero.id}`);
  }

  getHeroList(): void {
    this.heroService.get_hero_list().subscribe(hero_list => this.hero_list = hero_list);
  }
}
