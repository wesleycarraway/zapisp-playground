import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
// Importe apenas os ícones que você vai usar:
import { heroFunnel } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-dashboard',
  imports: [NgIconComponent],
  // Proveja os ícones para este componente:
  viewProviders: [provideIcons({ heroFunnel })],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
