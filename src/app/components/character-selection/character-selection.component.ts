import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { Character } from '../../types/Character';
import { NgFor, NgIf } from '@angular/common';
import { MarvelService } from '../../services/marvel.service';
import { MarvelUtils } from '../../utils/MarvelUtils';
import { FigureComponent } from '../figure/figure.component';

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
    FigureComponent
  ],
  templateUrl: './character-selection.component.html',
  styleUrl: './character-selection.component.scss',
})
export class CharacterSelectionComponent
{
  @Input() player: number = -1;

  @Input() characters: Character[] = [];

  @Input() loadingChars: boolean = false;

  @Output() selectedCharEvent = new EventEmitter<SelectedCharEvent>();

  @Output() currentCharHoverEvent = new EventEmitter<CurrentCharHoverEvent>();

  paginationIndex: number = 0;

  selectedCharacter: null | Character = null;

  inputFilterCharacters: string = '';

  // @HostBinding('attr.data-player') dataPlayer = this.player;

  constructor(
    private marvelService: MarvelService,
    public marvelUtils: MarvelUtils,
  ) {}

  sendSelectedCharacter(c: Character) {
    this.selectedCharacter = c;
    this.selectedCharEvent.emit({ c, player: this.player });
  }

  searchForCharacters(event: any) {
    this.inputFilterCharacters = event.target.value;
    this.paginationIndex = 0;
    this.characters = [];
    this.filterCharacters();
  }

  filterCharacters() {
    this.loadingChars = true;

    this.marvelService.getCharacters(this.paginationIndex, this.inputFilterCharacters).subscribe(res => {
      const results = this.marvelUtils.filter(res.data.results);
      this.characters = [...this.characters, ...results];
      this.loadingChars = false;
    },
    err => {
      alert('Desculpe. Tivemos um problema ao carregar os personagens');
      this.loadingChars = false;
    });
  }

  hoverChar(c: Character) {
    this.currentCharHoverEvent.emit(c.name);
  }

  unhoverChar(c: Character) {
    this.currentCharHoverEvent.emit(null);
  }

  // Método chamado quando o usuário rola o elemento
  @HostListener('scroll', ['$event'])
  onScrollChars(event: any) {
    const element = event.target;
    // Verificar se o usuário chegou ao final da página
    if(element.scrollHeight - Math.ceil(element.scrollTop) - 10 <= element.clientHeight
    && !this.loadingChars) {
      // Carregar mais itens quando o usuário chega ao final
      this.paginationIndex++;
      this.filterCharacters();
    }
  }
}
