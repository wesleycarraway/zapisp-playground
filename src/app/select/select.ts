import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDownMicro } from '@ng-icons/heroicons/micro';
import { heroCheck } from '@ng-icons/heroicons/outline';

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
  @Input() options: string[] = [];
  @Input() id: string = `input-${Math.random().toString(36).substring(2, 9)}`;

  @Input() autoSelectValue: boolean = false;

  @Output() valueChanged = new EventEmitter<string>();

  isOpen: boolean = false;

  @Input() selectedValue: string = '';

  ngOnInit() {
    if (this.autoSelectValue && this.options.length > 0) {
      this.selectedValue = this.options[0];
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selectedValue = option;
    this.isOpen = false;
    this.valueChanged.emit(option);
  }

}
