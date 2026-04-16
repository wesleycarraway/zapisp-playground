import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDownMicro } from '@ng-icons/heroicons/micro';
import { heroCheck } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [NgIconComponent],
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

  selectedValues: string[] = [];

  toggleDropdown() {
    this.isOpen = !this.isOpen;
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

  // Gera o texto separado por vírgulas
  get displayText(): string {
    if (this.selectedCount === 0) return this.placeholder;

    return this.selectedValues.join(', ');
  }
}
