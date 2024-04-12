import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

type Character = any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, InfiniteScrollModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit
{
  imgType = {
    min: 'standard_large'
  }

  characters: Character[] = [];
  offset = 0;

  selectedCharacter: (null | Character)[] = [null, null];

  constructor(
    private appService: AppService
  ){
    this.loadCharacters();
  }

  ngOnInit(): void {

  }

  loadCharacters() {
    this.appService.getTeste(this.offset).subscribe(res => {
      console.log(res);
      this.characters = res.data.results.filter((r: any) => !r.thumbnail.path.endsWith('image_not_available'));
    })
  }

  selectCharacter(character: Character, player: number) {
    this.selectedCharacter[player] = character;
    console.log(this.selectedCharacter);
  }

  getImgUrl(c: Character, imgType: string) {
    return c !== null ? c.thumbnail.path + '/' + imgType + '.' + c.thumbnail.extension : '';
  }
}
