import { Component, Input } from '@angular/core';
import { MarvelUtils } from '../../utils/MarvelUtils';
import { Character } from '../../types/Character';

@Component({
  selector: 'app-figure',
  standalone: true,
  imports: [],
  templateUrl: './figure.component.html',
  styleUrl: './figure.component.scss'
})
export class FigureComponent
{
  @Input() character: Character | null = null;

  @Input() player: number = 0;

  constructor(
    public marvelUtils: MarvelUtils
  ) {}
}
