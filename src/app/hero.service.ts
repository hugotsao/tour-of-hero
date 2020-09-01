import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { HERO_LIST } from './heros-list';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  get_hero_list(): Observable<Hero[]> {
    return of(HERO_LIST);
  }
}
