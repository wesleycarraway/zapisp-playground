import { Component, Input, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDownMicro } from '@ng-icons/heroicons/micro';
import { heroCheck } from '@ng-icons/heroicons/outline';

interface SelectOption {
  value: string | number;
  label: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons({ heroChevronDownMicro, heroCheck })],
  templateUrl: './select.html',
  styleUrl: './select.css',
})
export class Select {
  @Input() label?: string;
  @Input() width: string = '100%';
  @Input() placeholder: string = 'Selecione uma opção';
  @Input() options: SelectOption[] = [];
  @Input() id: string = `input-${Math.random().toString(36).substring(2, 9)}`;

  @Input() autoSelectValue: boolean = false;

  isOpen: boolean = false;

  selectedLabel: string = '';

  ngOnInit() {
    if (this.autoSelectValue && this.options.length > 0) {
      this.selectedLabel = this.options[0].label;
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: SelectOption) {
    this.selectedLabel = option.label;
    this.isOpen = false;
  }

}
