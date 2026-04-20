import { Component, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDownMicro, heroPlusMicro } from '@ng-icons/heroicons/micro';
// IMPORTANTE: Importe o seu novo componente de linha aqui
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

  // A lista de filtros na tela. Já começa com 1 filtro em branco por padrão.
  activeRules: FilterRule[] = [
    { id: 1, data: null }
  ];

  nextId: number = 2; // Usado para criar IDs únicos ao adicionar linhas
  isAndOperator: boolean = true;

  // A VARIÁVEL QUE GUARDA OS RESULTADOS DA BUSCA
  filteredContacts: any[] = [];

  constructor(private db: Database) { }

  ngOnInit() {
    // Quando a tela abre, mostra todos os contatos (nenhum filtro aplicado ainda)
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
      // O TRUQUE MÁGICO: Se for o último, nós o apagamos e colocamos um NOVO no lugar.
      // Como o 'id' é novo (nextId++), o Angular destrói a linha velha e desenha uma linha virgem na tela!
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

  // ---> O MOTOR DE BUSCA <---
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

      // Avalia esse contato contra TODAS as linhas de filtro criadas
      const ruleResults = validRules.map(rule => {
        const field = rule.data.field;
        const operator = rule.data.operator;
        const values = rule.data.values; // ex: ['RN', 'SP']

        let isMatch = false;

        // Compara o banco de dados com a opção selecionada
        if (field === 'Estado') {
          isMatch = values.includes(contato.estado);
        } else if (field === 'Cidade') {
          isMatch = values.includes(contato.cidade);
        } else if (field === 'Planos') {
          // Se for array (Planos), checa se ele tem PELO MENOS UM dos planos selecionados
          isMatch = values.some((v: string) => contato.planos.includes(v));
        }

        // Aplica o "É" ou "Não é"
        return operator === 'É' ? isMatch : !isMatch;
      });

      // 3. Aplica o Operador Global (E / OU)
      if (this.isAndOperator) {
        // Se for "E", TODAS as regras precisam ter retornado true
        return ruleResults.every(result => result === true);
      } else {
        // Se for "OU", PELO MENOS UMA regra precisa ter retornado true
        return ruleResults.some(result => result === true);
      }
    });
  }
}