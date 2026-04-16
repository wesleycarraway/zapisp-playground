import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroTrashMini } from '@ng-icons/heroicons/mini';
import { heroChevronDownMicro } from '@ng-icons/heroicons/micro';
import { Inputc } from '../inputc/inputc';
import { Select } from "../select/select";
import { MultiSelect } from "../multi-select/multi-select";
import { Button } from '../button/button';
import { Database } from '../database';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NgIconComponent, Inputc, Select, MultiSelect, Button],
  viewProviders: [provideIcons({ heroTrashMini, heroChevronDownMicro })],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter {
  fieldsOptions: string[] = ['Estado', 'Cidade', 'Plano'];
  valuesOptions: string[] = [];

  // Opções do Segundo Select (Operador Lógico)
  isEqualOptions: string[] = ['É', 'Não é'];

  isAndOperator: boolean = true;

  constructor(private db: Database) { }

  toggleOperator() {
    this.isAndOperator = !this.isAndOperator;
  }

  // ---> FUNÇÃO DO PRIMEIRO SELECT <---
  loadFieldOptions(selectedField: string) {

    // A gente joga os dados do banco DIRETO na variável que o HTML lê!
    if (selectedField === 'Estado') {
      this.valuesOptions = this.db.estados;

    } else if (selectedField === 'Cidade') {
      this.valuesOptions = Object.values(this.db.cidadesPorEstado).flat();

    } else if (selectedField === 'Plano') {
      this.valuesOptions = this.db.planosDisponiveis;

    }
  }

  // ---> FUNÇÃO DO MULTI-SELECT (A NOVA FUNÇÃO) <---
  // Disparada quando você marca/desmarca as opções (ex: "RN", "SP")
  aplicarFiltroValores(valoresSelecionados: string[]) {
    console.log('O Multi-select enviou estes valores:', valoresSelecionados);

    // É aqui que faremos a mágica de cruzar os dados com os 20 contatos depois!
  }

}