import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarvelService
{
  private apiUrl = 'https://gateway.marvel.com/v1/public';

  private apikey = '894f6027da13bf6d40a88001ef8dd8cb';
  private ts = '1'
  private hash = 'bf02b67cec3f1d03309189feb6b1bdd2'

  constructor(private http: HttpClient) { }

  getCharacters(paginationIndex: number, characterName?: string): Observable<any> {
    const limit = 40;
    const offset = limit * paginationIndex;

    const url = `${this.apiUrl}/characters` +
      `?apikey=${this.apikey}` +
      `&ts=${this.ts}` +
      `&hash=${this.hash}` +
      `&limit=${limit}` + 
      `&offset=${offset}`;
      (characterName ? `&nameStartsWith=${characterName}` : '')
    ;

    return this.http.get/*<any[]>*/(url);
  }
}
