import { Component, HostBinding, Input } from '@angular/core';
import { Character } from '../../types/Character';
import { NgFor, NgIf } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MarvelService } from '../../services/marvel.service';

@Component({
  selector: 'app-character-selection',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    InfiniteScrollModule,
  ],
  templateUrl: './character-selection.component.html',
  styleUrl: './character-selection.component.scss',
})
export class CharacterSelectionComponent
{
  @Input() player: number = -1;

  @Input() characters: Character[] = [];

  offset: number = 0;

  selectedCharacter: null | Character = null;

  @HostBinding('attr.data-player') dataPlayer = this.player;

  constructor(
    private marvelService: MarvelService
  ) {}

  filterCharacters(event: any) {
    const characterName = event.target.value;

    this.offset = 0;
    
    this.marvelService.getCharacters(this.offset, characterName).subscribe(res => {
      const results = res.data.results.filter((r: any) => !r.thumbnail.path.endsWith('image_not_available'));

      this.characters = results, results
    })
  }

  selectCharacter(character: Character) {
    this.selectedCharacter = character;
    console.log(this.selectedCharacter);
  }

  getImgUrl(c: Character, imgType: string) {
    return c !== null ? c.thumbnail.path + '/' + imgType + '.' + c.thumbnail.extension : '';
  }
}
