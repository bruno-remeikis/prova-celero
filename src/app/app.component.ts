import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MarvelService } from './services/marvel.service';
import { NgFor, NgIf } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CharacterSelectionComponent } from './components/character-selection/character-selection.component';
import { Character } from './types/Character';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    NgFor,
    InfiniteScrollModule,
    CharacterSelectionComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit
{
  characters: Character[][] = [[], []];
  offset = 0;

  selectedCharacter: (null | Character)[] = [null, null];

  constructor(
    private appService: MarvelService
  ){
    this.loadCharacters();
  }

  ngOnInit(): void {

  }

  loadCharacters(characterName?: string, player?: number) {
    this.appService.getCharacters(this.offset, characterName).subscribe(res => {
      console.log(res);
      const results = res.data.results.filter((r: any) => !r.thumbnail.path.endsWith('image_not_available'));

      if(player)
        this.characters[player] = results;
      else
        this.characters = [results, results]
    })
  }
}
