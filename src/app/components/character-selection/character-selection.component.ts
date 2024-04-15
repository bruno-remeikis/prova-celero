import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { Character } from '../../types/Character';
import { NgFor, NgIf } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MarvelService } from '../../services/marvel.service';
import { ImgUtils } from '../../utils/ImgUtils';

export type SelectedCharEvent = {
  c: Character;
  player: number;
}

export type CurrentCharHoverEvent = string | null

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

  @Output() selectedCharEvent = new EventEmitter<SelectedCharEvent>();

  @Output() currentCharHoverEvent = new EventEmitter<CurrentCharHoverEvent>();

  paginationIndex: number = 0;

  selectedCharacter: null | Character = null;

  inputFilterCharacters: string = '';

  // @HostBinding('attr.data-player') dataPlayer = this.player;

  constructor(
    private marvelService: MarvelService,
    public imgUtils: ImgUtils,
  ) {}

  sendSelectedCharacter(c: Character) {
    this.selectedCharacter = c;
    this.selectedCharEvent.emit({ c, player: this.player });
  }

  searchForCharacters(event: any) {
    this.inputFilterCharacters = event.target.value;
    this.paginationIndex = 0;
    this.filterCharacters();
  }

  filterCharacters() {
    this.marvelService.getCharacters(this.paginationIndex, this.inputFilterCharacters).subscribe(res => {
      const results = res.data.results.filter((r: any) => !r.thumbnail.path.endsWith('image_not_available'));
      this.characters.push(results);
      console.log(this.characters)
    })
  }

  hoverChar(c: Character) {
    this.currentCharHoverEvent.emit(c.name);
  }

  unhoverChar(c: Character) {
    this.currentCharHoverEvent.emit(null);
  }

  // Método chamado quando o usuário rola a página
  @HostListener('scroll', ['$event'])
  onScrollChars(event: any) {
    const element = event.target;
    // Verificar se o usuário chegou ao final da página
    if (element.scrollHeight - Math.ceil(element.scrollTop) === element.clientHeight) {
      console.log('SCROLL')
      // Carregar mais itens quando o usuário chega ao final
      this.paginationIndex++;
      this.filterCharacters();
    }
  }
}
