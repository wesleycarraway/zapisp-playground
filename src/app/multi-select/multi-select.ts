import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDownMicro } from '@ng-icons/heroicons/micro';
import { heroCheck } from '@ng-icons/heroicons/outline';
import { Inputc } from '../inputc/inputc';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [NgIconComponent, Inputc],
  viewProviders: [provideIcons({ heroChevronDownMicro, heroCheck })],
  templateUrl: './multi-select.html',
  styleUrl: './multi-select.css',
})
export class MultiSelect {
  @Input() label?: string;
  @Input() placeholder: string = 'Selecionar';
  @Input() options: string[] = [];
  @Input() width: string = '100%';

  @Output() valuesChanged = new EventEmitter<string[]>();

  isOpen: boolean = false;

  searchTerm: string = '';

  @Input() selectedValues: string[] = [];

  get filteredOptions(): string[] {
    if (!this.searchTerm.trim()) {
      return this.options;
    }

    const term = this.searchTerm.toLowerCase();

    return this.options.filter(option =>
      option.toLowerCase().includes(term)
    );
  }

  onSearch(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.searchTerm = '';
    }
  }

  // Lógica de marcar/desmarcar
  toggleOption(option: string) {
    const index = this.selectedValues.indexOf(option);

    if (index > -1) {
      // Se já estava na lista, a gente remove (desmarca)
      this.selectedValues.splice(index, 1);
    } else {
      // Se não estava, a gente adiciona (marca)
      this.selectedValues.push(option);
    }

    this.valuesChanged.emit(this.selectedValues);
  }

  isSelected(option: string): boolean {
    return this.selectedValues.includes(option);
  }

  get selectedCount(): number {
    return this.selectedValues.length;
  }

  get displayText(): string {
    if (this.selectedCount === 0) return this.placeholder;

    return this.selectedValues.join(', ');
  }
}
