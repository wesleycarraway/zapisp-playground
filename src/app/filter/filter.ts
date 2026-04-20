import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDownMicro } from '@ng-icons/heroicons/micro';
// IMPORTANTE: Importe o seu novo componente de linha aqui
import { FilterRow } from '../filter-row/filter-row';

interface FilterRule {
  id: number;
  data: any; // Aqui ficará guardado o field, operator e values
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NgIconComponent, FilterRow],
  viewProviders: [provideIcons({ heroChevronDownMicro })],
  templateUrl: './filter.html',
})
export class Filter {

  // A lista de filtros na tela. Já começa com 1 filtro em branco por padrão.
  activeRules: FilterRule[] = [
    { id: 1, data: null }
  ];

  nextId: number = 2; // Usado para criar IDs únicos ao adicionar linhas
  isAndOperator: boolean = true;

  toggleOperator() {
    this.isAndOperator = !this.isAndOperator;
  }

  // ADICIONA um novo filtro na tela
  addNewRule() {
    this.activeRules.push({ id: this.nextId++, data: null });
  }

  // REMOVE um filtro da tela baseado no ID
  removeRule(ruleId: number) {
    this.activeRules = this.activeRules.filter(rule => rule.id !== ruleId);
  }

  // ATUALIZA os dados de uma linha específica quando o usuário clica nos selects
  updateRuleData(ruleId: number, newData: any) {
    const rule = this.activeRules.find(r => r.id === ruleId);
    if (rule) {
      rule.data = newData;
    }

    // Apenas para você ver a mágica acontecendo no console
    console.log('Todos os filtros ativos:', this.activeRules);
  }
}