import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService
{
  private apiUrl = 'https://gateway.marvel.com/v1/public';

  private apikey = '894f6027da13bf6d40a88001ef8dd8cb';
  private ts = '1'
  private hash = 'bf02b67cec3f1d03309189feb6b1bdd2'

  constructor(private http: HttpClient) { }

  getTeste(offset: number): Observable<any> {
    const url = `${this.apiUrl}/characters` +
      `?apikey=${this.apikey}` +
      `&ts=${this.ts}` +
      `&hash=${this.hash}` +
      `&limit=30` /*+
      `&offset=${offset}`;*/

    return this.http.get/*<any[]>*/(url);
  }
}
