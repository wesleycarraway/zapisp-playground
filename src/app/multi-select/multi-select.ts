import { Component, Input, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDownMicro } from '@ng-icons/heroicons/micro';
import { heroCheck } from '@ng-icons/heroicons/outline';

interface SelectOption {
  value: string | number;
  label: string;
}

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
  @Input() options: SelectOption[] = [];
  @Input() width: string = '100%';

  isOpen: boolean = false;

  selectedValues: (string | number)[] = [];

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  // Lógica de marcar/desmarcar
  toggleOption(option: SelectOption) {
    const index = this.selectedValues.indexOf(option.value);

    if (index > -1) {
      // Se já estava na lista, a gente remove (desmarca)
      this.selectedValues.splice(index, 1);
    } else {
      // Se não estava, a gente adiciona (marca)
      this.selectedValues.push(option.value);
    }
  }

  isSelected(value: string | number): boolean {
    return this.selectedValues.includes(value);
  }

  get selectedCount(): number {
    return this.selectedValues.length;
  }

  // Gera o texto separado por vírgulas
  get displayText(): string {
    if (this.selectedCount === 0) return this.placeholder;

    // Pega as labels correspondentes aos valores selecionados e junta com vírgula
    const labels = this.selectedValues.map(val => {
      const option = this.options.find(opt => opt.value === val);
      return option ? option.label : '';
    });

    return labels.join(', ');
  }
}
