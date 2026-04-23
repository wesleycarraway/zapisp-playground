import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Database } from './database';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('zapisp-playground');

  constructor(private db: Database) {
    const todosOsContatos = this.db.listarContatos();
    console.table(todosOsContatos);
  }
}
