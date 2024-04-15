import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MarvelService } from './services/marvel.service';
import { NgFor, NgIf } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CharacterSelectionComponent, CurrentCharHoverEvent, SelectedCharEvent } from './components/character-selection/character-selection.component';
import { Character } from './types/Character';
import { ImgUtils } from './utils/ImgUtils';

const charTeste: Character = {
  name: 'Herói de Testes',
  thumbnail: {
    extension: 'jpg',
    path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784'
  }
};

const symbolUrl = '../assets/img/symbols/';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    NgFor,
    InfiniteScrollModule,
    CharacterSelectionComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit
{
  initialCharacters: Character[] = [];
  offset = 0;

  selectedCharacter: (null | Character)[] = /*[charTeste, charTeste]*/ [null, null];

  inGame: boolean = /*true;*/ false;

  first: number = 0;
  turn: number = 0;
  symbols: [string, string] = ['', ''];

  currentCharHover: CurrentCharHoverEvent = null;
  currentCellHover: number | null = null;

  score: [number, number] = [0, 0];

  board: (null | number)[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  constructor(
    private appService: MarvelService,
    public imgUtils: ImgUtils
  ){
    this.loadCharacters();
  }

  ngOnInit(): void {

  }

  loadCharacters() {
    this.appService.getCharacters(0).subscribe(res => {
      console.log(res);
      const results = res.data.results.filter((r: any) => !r.thumbnail.path.endsWith('image_not_available'));

      this.initialCharacters = results
    })
  }

  selectCharacter(e: SelectedCharEvent) {
    console.log(e);
    this.selectedCharacter[e.player] = e.c;
  }

  charHover(e: string | null) {
    this.currentCharHover = e;
  }

  start() {
    if(!this.selectedCharacter[0]
    || !this.selectedCharacter[1]) {
      alert('Selecione seus personagens.');
      return;
    }

    this.first = Math.floor(Math.random() * 2);
    this.turn = this.first;
    this.symbols = [
      `${symbolUrl}${this.first === 0 ? 'x' : 'o'}-red.svg`,
      `${symbolUrl}${this.first === 1 ? 'x' : 'o'}-blue.svg`,
    ];
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    this.inGame = true;
  }

  range(n: number) {
    return new Array(n).fill(0).map((_, i) => i);
  }

  splitIndex = (ii: number): [number, number] => [
    Math.floor(ii / 3),
    ii % 3
  ];

  getPlayer(ii: number) {
    const [ i, j ] = this.splitIndex(ii);
    return this.board[i][j];
  }

  getSymbol(ii: number) {
    // const [ i, j ] = this.splitIndex(ii);

    const player = this.getPlayer(ii);
    return player !== null
      ? `<img src="${this.symbols[player]}" alt="">`
      : (
        ii === this.currentCellHover
          ? `<img src="${this.symbols[this.turn]}" class="aaaaa" alt="">`
          : ''
      )
  }

  cellClick(ii: number) {
    const [ i, j ] = this.splitIndex(ii);

    if(this.board[i][j] !== null)
      return;

    this.board[i][j] = this.turn; // Registra jogada
    const winner = this.verifyPlay();

    if(winner) {
      alert('VENCEU');
      this.score[this.turn]++;
      this.start();
      return;
    }
    else if(!this.board.flatMap(p => p).includes(null)) {
      alert('Xiiiii. Deu velha')
      this.start();
      return;
    }

    this.turn = (this.turn + 1) % 2; // Troca turno
  }

  verifyPlay(): boolean {
    /*
    for(let i = 0; i < this.board.length; i++) {
      if(this.board[i][0] == null)
        continue;

      let winner: boolean = true;

      for(let j = 1; j < this.board[i].length; j++) {
        if(this.board[i][0] !== this.board[i][j]) {
          winner = false;
          break;
        }
      }

      if(winner)
        return true;
    }

    return false;
    */

    // Horizontal
    for(let i = 0; i < 3; i++) {
      if(this.board[i][0] !== null
      && this.board[i][0] === this.board[i][1]
      && this.board[i][0] === this.board[i][2]) {
        return true;
      }
    }

    // Vertical
    for(let j = 0; j < 3; j++) {
      if(this.board[0][j] !== null
      && this.board[0][j] === this.board[1][j]
      && this.board[0][j] === this.board[2][j]) {
        return true;
      }
    }

    // Diagonal principal
    if(this.board[0][0] !== null
    && this.board[0][0] === this.board[1][1]
    && this.board[0][0] === this.board[2][2]
    ) {
      return true;
    }

    // Diagonal secundária
    if(this.board[2][0] !== null
    && this.board[2][0] === this.board[1][1]
    && this.board[2][0] === this.board[0][2]
    ) {
      return true;
    }

    return false;
  }

  exit() {
    this.inGame = false;
  }

  hoverCell(ii: number) {
    this.currentCellHover = ii;
  }

  unhoverCell(ii: number) {
    this.currentCellHover = null;
    console.log('a')
  }
}
