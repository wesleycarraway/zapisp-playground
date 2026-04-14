import { Component } from '@angular/core';
import { Inputc } from '../inputc/inputc';
import { Select } from "../select/select";

@Component({
  selector: 'app-filter',
  imports: [Inputc, Select],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter {
  options = [
    { value: 'option 1', label: 'Opção 1' },
    { value: 'option 2', label: 'Opção 2' },
  ];
}
