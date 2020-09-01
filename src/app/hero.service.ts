import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { HERO_LIST } from './heros-list';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessagesService) { }

  get_hero_list(): Observable<Hero[]> {
    this.messageService.add_message("Fetched all hero list");
    return of(HERO_LIST);
  }
  get_hero(id: number): Observable<Hero> {
    this.messageService.add_message(`Fetched hero with Id${id}`);
    return of(HERO_LIST.find(hero => hero.id === id))
  }
}
