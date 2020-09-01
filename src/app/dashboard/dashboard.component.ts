import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heros: Hero[];
  constructor(
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
    this.getHeros();
  }

  getHeros(): void {
    this.heroService.get_hero_list().subscribe(
      list => this.heros = list.slice(1, 5)
    )
  }

}
