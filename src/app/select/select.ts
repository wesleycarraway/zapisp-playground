import { Component, Input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDownMicro } from '@ng-icons/heroicons/micro';

interface SelectOption {
  value: string | number;
  label: string;
}



@Component({
  selector: 'app-select',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons({ heroChevronDownMicro })],
  templateUrl: './select.html',
  styleUrl: './select.css',
})
export class Select {
  @Input() label?: string;

  @Input() placeholder: string = '';

  @Input() options: SelectOption[] = [];

  @Input() id: string = `input-${Math.random().toString(36).substring(2, 9)}`;
}
