import { Injectable } from "@angular/core";
import { Character } from "../types/Character";

@Injectable({
    providedIn: 'root'
})
export class ImgUtils
{
    public charImgUrl = (c: Character, imgType: string) =>
        c !== null
            ? c.thumbnail.path + '/' + imgType + '.' + c.thumbnail.extension
            : '';
}