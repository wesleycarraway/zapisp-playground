import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() variant: 'primary' | 'secondary' = 'primary';

  @Input() disabled: boolean = false;

  get classes() {

    let base = 'flex flex-row items-center justify-center gap-2 text-sm font-semibold rounded-md px-3 h-9';

    if (this.disabled) {
      return base + ' bg-zinc-100 text-zinc-400 cursor-not-allowed';
    }

    if (this.variant === 'primary') {
      return base + ' bg-blue-600 hover:bg-blue-500 text-slate-50 cursor-pointer';
    }

    if (this.variant === 'secondary') {
      return base + ' bg-slate-50 border border-gray-300  text-blue-600 hover:bg-slate-100 hover:border-gray-400 cursor-pointer';
    }

    return base;
  }
}
