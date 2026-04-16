import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroTrashMini } from '@ng-icons/heroicons/mini';
import { heroChevronDownMicro } from '@ng-icons/heroicons/micro';
import { Inputc } from '../inputc/inputc';
import { Select } from "../select/select";
import { MultiSelect } from "../multi-select/multi-select";
import { Button } from '../button/button';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NgIconComponent, Inputc, Select, MultiSelect, Button],
  viewProviders: [provideIcons({ heroTrashMini, heroChevronDownMicro })],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter {
  isAndOperator: boolean = true;

  toggleOperator() {
    this.isAndOperator = !this.isAndOperator;
  }

  options = [
    { value: 'option 1', label: 'Opção 1' },
    { value: 'option 2', label: 'Opção 2' },
  ];

  isEqualOptions = [
    { value: '==', label: 'É' },
    { value: '!', label: 'Não é' },
  ];
}
