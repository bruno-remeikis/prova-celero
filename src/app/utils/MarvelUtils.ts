import { Injectable } from "@angular/core";
import { Character } from "../types/Character";

@Injectable({
  providedIn: 'root'
})
export class MarvelUtils
{
  public imgUrl = (c: Character, imgType: string) =>
    c !== null
      ? c.thumbnail.path + '/' + imgType + '.' + c.thumbnail.extension
      : '';

  public filter = (results: Character[]): Character[] =>
    results.filter((r: any) =>
      !r.thumbnail.path.endsWith('image_not_available') &&
      r.thumbnail.extension !== 'gif'
    );
}
