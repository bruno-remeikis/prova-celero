import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MarvelService } from './services/marvel.service';
import { NgFor, NgIf } from '@angular/common';
import { CharacterSelectionComponent, CurrentCharHoverEvent, SelectedCharEvent } from './components/character-selection/character-selection.component';
import { Character } from './types/Character';
import { MarvelUtils } from './utils/MarvelUtils';
import { FigureComponent } from './components/figure/figure.component';
import { ModalComponent } from './components/modal/modal.component';

type WinProps = {
  i: number;
  orientation: 'horizontal' | 'vertical';
} | {
  orientation: 'primary-diagonal' | 'secondary-diagonal';
};

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
    CharacterSelectionComponent,
    FigureComponent,
    ModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent
{
  initialCharacters: Character[] = [];
  loadingChars: boolean = true;
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

  winModalVisible: boolean = false;
  velhaModalVisible: boolean = false;

  win: WinProps | null = null;
  winAnimationTime = 1; // in seconds

  setWinModalVisible(e: boolean) {
    this.winModalVisible = e;
  }

  setVelhaModalVisible(e: boolean) {
    this.velhaModalVisible = e;
  }

  constructor(
    private appService: MarvelService,
    public marvelUtils: MarvelUtils,
  ){
    this.loadCharacters();
  }

  loadCharacters() {
    this.loadingChars = true;

    this.appService.getCharacters(0).subscribe(res => {
      const results = this.marvelUtils.filter(res.data.results);
      this.initialCharacters = results;
      this.loadingChars = false;
    },
    err => {
      alert('Desculpe. Tivemos um problema ao carregar os personagens');
      this.loadingChars = false;
    });
  }

  selectCharacter(e: SelectedCharEvent) {
    this.selectedCharacter[e.player] = e.c;
  }

  charHover(e: string | null) {
    this.currentCharHover = e;
  }

  initGame() {
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

    this.start();
  }

  start() {
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    this.inGame = true;
  }

  restart() {
    this.switchTurn();
    this.start();
  }

  switchTurn() {
    this.turn = (this.turn + 1) % 2;
  }

  range = (n: number) =>
    new Array(n).fill(0).map((_, i) => i);

  splitIndex = (ii: number): [number, number] => [
    Math.floor(ii / 3),
    ii % 3
  ];

  getPlayer(ii: number) {
    const [ i, j ] = this.splitIndex(ii);
    return this.board[i][j];
  }

  /*getSymbol(ii: number) {
    // const [ i, j ] = this.splitIndex(ii);

    const player = this.getPlayer(ii);
    return player !== null
      ? `<img class="symbol" src="${this.symbols[player]}" alt="symbol" style="filter: drop-shadow(0px 0px 1px white);">`
      : (
        ii === this.currentCellHover
          ? `<img class="symbol" src="${this.symbols[this.turn]}" alt="symbol" style="filter: drop-shadow(0px 0px 1px white);">`
          : ''
      )
  }*/

  getSymbolUrl(ii: number): string {
    const player = this.getPlayer(ii);

    if(player !== null)
      return this.symbols[player];

    return this.symbols[this.turn];
  }

  cellClick(ii: number) {
    const [ i, j ] = this.splitIndex(ii);

    if(this.board[i][j] !== null)
      return;

    this.board[i][j] = this.turn; // Registra jogada
    const win = this.verifyPlay();

    if(win) {
      this.score[this.turn]++;
      this.win = win;
      setTimeout(() => {
        this.setWinModalVisible(true);
      }, this.winAnimationTime * 1000);
      return;
    }
    else if(this.isBoardFull()) {
      this.setVelhaModalVisible(true);
      return;
    }

    this.switchTurn(); // Troca turno
  }

  verifyPlay(): WinProps | null {
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
        return { i, orientation: 'horizontal' };
      }
    }

    // Vertical
    for(let j = 0; j < 3; j++) {
      if(this.board[0][j] !== null
      && this.board[0][j] === this.board[1][j]
      && this.board[0][j] === this.board[2][j]) {
        return { i: j, orientation: 'vertical' };
      }
    }

    // Diagonal principal
    if(this.board[0][0] !== null
    && this.board[0][0] === this.board[1][1]
    && this.board[0][0] === this.board[2][2]
    ) {
      return { orientation: 'primary-diagonal' };
    }

    // Diagonal secundária
    if(this.board[2][0] !== null
    && this.board[2][0] === this.board[1][1]
    && this.board[2][0] === this.board[0][2]
    ) {
      return { orientation: 'secondary-diagonal' };
    }

    return null;
  }

  isBoardFull = () =>
    !this.board.flatMap(p => p).includes(null);

  exit() {
    this.inGame = false;
  }

  hoverCell(ii: number) {
    this.currentCellHover = ii;
  }

  unhoverCell() {
    this.currentCellHover = null;
  }

  resetWin() {
    this.win = null;
  }
}
