import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent
{
  @Input() innerCloseable: boolean = true; // Permite que o modal seja fechado por dentro (clicando no X ou no overlay)

  @Input() visible: boolean = false;

  @Output() visibleEvent = new EventEmitter<boolean>();

  toggle() {
    this.visible = false;
    this.visibleEvent.emit(false);
  }
}
