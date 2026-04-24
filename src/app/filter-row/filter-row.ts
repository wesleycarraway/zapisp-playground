import { Component, EventEmitter, Output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroTrashMini } from '@ng-icons/heroicons/mini';
import { Select } from '../select/select';
import { MultiSelect } from '../multi-select/multi-select';
import { Database } from '../database';

@Component({
  selector: 'app-filter-row',
  standalone: true,
  imports: [NgIconComponent, Select, MultiSelect],
  viewProviders: [provideIcons({ heroTrashMini })],
  templateUrl: './filter-row.html'
})
export class FilterRow {

  // Avisa o pai quando clicar na lixeira
  @Output() removeRow = new EventEmitter<void>();

  // Avisa o pai sempre que os dados dessa linha mudarem
  @Output() ruleChange = new EventEmitter<any>();

  fieldOptions: string[] = ['Estado', 'Cidade', 'Planos', 'Tags'];
  operatorOptions: string[] = ['É', 'Não é'];
  valueOptions: string[] = []; // A lista dinâmica específica DESSA linha

  // O estado atual das seleções
  selectedField: string = '';
  selectedOperator: string = 'É';
  selectedValues: string[] = [];

  constructor(private db: Database) { }

  onFieldChange(field: string) {
    this.selectedField = field;
    this.selectedValues = []; // Limpa os valores se o usuário trocar o campo

    if (field === 'Estado') {
      this.valueOptions = this.db.estados;
    } else if (field === 'Cidade') {
      this.valueOptions = Object.values(this.db.cidadesPorEstado).flat();
    } else if (field === 'Planos') {
      this.valueOptions = this.db.planosDisponiveis;
    } else if (field === 'Tags') {
      this.valueOptions = this.db.tagsDisponiveis;
    }

    if (field === 'Tags' || field === 'Planos') {
      this.operatorOptions = ['É qualquer um de', 'Inclui ambos', 'Não inclui'];
      this.selectedOperator = 'É qualquer um de'; // Valor padrão para listas
    } else {
      this.operatorOptions = ['É', 'Não é'];
      this.selectedOperator = 'É'; // Valor padrão para texto simples
    }

    this.emitCurrentRule();
  }

  onOperatorChange(operator: string) {
    this.selectedOperator = operator;
    this.emitCurrentRule();
  }

  onValuesChange(values: string[]) {
    this.selectedValues = values;
    this.emitCurrentRule();
  }

  // Junta os 3 dados e envia para o componente Pai
  private emitCurrentRule() {
    this.ruleChange.emit({
      field: this.selectedField,
      operator: this.selectedOperator,
      values: this.selectedValues
    });
  }
}