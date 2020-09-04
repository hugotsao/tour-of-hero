import { Component, OnInit } from '@angular/core';
import { Observable, Subject, pipe } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-search-hero',
  templateUrl: './search-hero.component.html',
  styleUrls: ['./search-hero.component.css']
})
export class SearchHeroComponent implements OnInit {
  heros$: Observable<Hero[]>
  searchTerm: Subject<string> = new Subject

  constructor(
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
    if(this.searchTerm){
      this.heros$ = this.searchTerm.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => this.heroService.search_hero(term))
      )
    }
  }

  search(term: string){
    if(term){
      this.searchTerm.next(term);
    }
  }

}
