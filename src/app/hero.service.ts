import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from './hero';

import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  apiUrl = '/api/heros';
  constructor(
    private messageService: MessagesService,
    private http: HttpClient
    ) { }

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
  private log(msg: string): void{
    this.messageService.add_message(msg);
  }
  get_hero_list(): Observable<Hero[]> {
  
    return this.http.get<Hero[]>(this.apiUrl).pipe(
      tap(() => this.log("Fetched all hero list")),
      catchError(this.getCatchError<Hero[]>('FetchAllHeros'))
    );
  }
  get_hero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.log(`Fetched hero with Id${id}`)),
      catchError(this.getCatchError<Hero>('FetchHero'))
    )
  }
  update_hero(hero: Hero): Observable<any> {
    return this.http.put(this.apiUrl, hero).pipe(
      tap(() => this.log(`Updating hero ${hero.name}`)),
      catchError(this.getCatchError<any>('UpdateHero'))
    );
  }
  create_hero(hero: Hero): Observable<Hero> {
    return this.http.post(this.apiUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`Adding hero with Id ${newHero.id}`)),
      catchError(this.getCatchError<Hero>('AddHero'))
    );
  }
  delete_hero(hero: Hero){
    return this.http.delete(`${this.apiUrl}/${hero.id}`).pipe(
      tap(() => this.log(`Deleting hero ${hero.id}`)),
      catchError(this.getCatchError<any>('DeleteHero'))
    );
  }

  search_hero(term: string): Observable<Hero[]> {
    if (!term){
      return of([])
    }
    return this.http.get<Hero[]>(`${this.apiUrl}/?name=${term}`).pipe(
      tap(result => result.length 
        ? this.log("found heros") : this.log("no result found")
      ),
      catchError(this.getCatchError<Hero[]>("SearchHero"))
    );
  }
  private getCatchError<T>(operation: string, result?: T){
    return (error: string): Observable<T> => {
      this.log(`${operation} failed.`)
      console.error(`An error has occurred when ${operation}: ${error}`);
      return of(result)
    }
  }

}
