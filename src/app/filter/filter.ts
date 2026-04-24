import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDownMicro, heroPlusMicro } from '@ng-icons/heroicons/micro';
import { FilterRow } from '../filter-row/filter-row';
import { Database } from '../database';
import { Button } from '../button/button';

interface FilterRule {
  id: number;
  data: any; // Aqui ficará guardado o field, operator e values
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NgIconComponent, FilterRow, Button],
  viewProviders: [provideIcons({ heroChevronDownMicro, heroPlusMicro })],
  templateUrl: './filter.html',
})
export class Filter {
  @Output() apply = new EventEmitter<number>();

  // A lista de filtros na tela. Já começa com 1 filtro em branco por padrão.
  activeRules: FilterRule[] = [
    { id: 1, data: null }
  ];

  nextId: number = 2; // Usado para criar IDs únicos ao adicionar linhas
  isAndOperator: boolean = true;

  filteredContacts: any[] = [];

  constructor(private db: Database) { }

  ngOnInit() {
    this.filteredContacts = this.db.listarContatos();
  }

  toggleOperator() {
    this.isAndOperator = !this.isAndOperator;
    this.applyFilters();
  }

  // ADICIONA um novo filtro na tela
  addNewRule() {
    this.activeRules.push({ id: this.nextId++, data: null });
    this.applyFilters();
  }

  removeRule(ruleId: number) {
    if (this.activeRules.length > 1) {
      // Se tem mais de um, remove normalmente
      this.activeRules = this.activeRules.filter(rule => rule.id !== ruleId);
    } else {
      // Se for o último, nós o apagamos e colocamos um NOVO no lugar.
      this.activeRules = [{ id: this.nextId++, data: null }];
    }

    this.applyFilters();
  }

  // ATUALIZA os dados de uma linha específica quando o usuário clica nos selects
  updateRuleData(ruleId: number, newData: any) {
    const rule = this.activeRules.find(r => r.id === ruleId);
    if (rule) {
      rule.data = newData;
    }

    this.applyFilters();
  }

  applyFilters() {
    const allContacts = this.db.listarContatos();

    // 1. Pega apenas as linhas que estão 100% preenchidas
    const validRules = this.activeRules.filter(rule =>
      rule.data && rule.data.field && rule.data.operator && rule.data.values.length > 0
    );

    // Se não tem regra válida, retorna todo mundo
    if (validRules.length === 0) {
      this.filteredContacts = allContacts;
      return;
    }

    // 2. Filtra os contatos cruzando com as regras
    this.filteredContacts = allContacts.filter(contato => {

      const ruleResults = validRules.map(rule => {
        const { field, operator, values } = rule.data;
        let isMatch = false;

        if (field === 'Estado') {
          isMatch = values.includes(contato.estado);
          return operator === 'É' ? isMatch : !isMatch;
        } else if (field === 'Cidade') {
          isMatch = values.includes(contato.cidade);
          return operator === 'É' ? isMatch : !isMatch;
        }

        if (field === 'Tags' || field === 'Planos') {
          const contatoArray = field === 'Tags' ? contato.tags : contato.planos;

          if (operator === 'É qualquer um de') {
            return values.some((v: string) => contatoArray.includes(v));
          }

          else if (operator === 'Inclui ambos') {
            return values.every((v: string) => contatoArray.includes(v));
          }

          else if (operator === 'Não inclui') {
            return !values.some((v: string) => contatoArray.includes(v));
          }
        }

        return false;
      });

      // 3. Aplica o Operador Global (E / OU)
      if (this.isAndOperator) {
        return ruleResults.every(result => result === true);
      } else {
        return ruleResults.some(result => result === true);
      }
    });
  }

  onClearClick() {
    // 1. Reseta as variáveis do modal para o padrão de fábrica
    this.activeRules = [{ id: this.nextId++, data: null }];

    this.isAndOperator = true;

    // 2. Roda a busca de novo (agora sem regras, vai retornar todos os 20 contatos)
    this.applyFilters();
  }

  onApplyClick() {
    // Conta apenas os filtros que estão totalmente preenchidos
    const validRulesCount = this.activeRules.filter(rule =>
      rule.data && rule.data.field && rule.data.operator && rule.data.values.length > 0
    ).length;

    this.apply.emit(validRulesCount);
  }
}