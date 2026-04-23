import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inputc',
  imports: [],
  templateUrl: './inputc.html',
  styleUrl: './inputc.css',
})
export class Inputc {
  @Input() label?: string;

  @Input() type: string = 'text';

  @Input() placeholder: string = '';

  @Input() value: string = '';

  @Input() id: string = `input-${Math.random().toString(36).substring(2, 9)}`;
}