import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // <-- Ferramenta que descobre onde o código está rodando
import { Contato } from './models';

@Injectable({
  providedIn: 'root'
})
export class Database {
  private readonly STORAGE_KEY = 'contatos_db';

  public readonly estados = ['RN', 'RJ', 'SP', 'CE'];
  public readonly cidadesPorEstado: Record<string, string[]> = {
    'RN': ['Natal', 'Pipa', 'Parnamirim'],
    'RJ': ['Rio de Janeiro'],
    'SP': ['São Paulo', 'Santos', 'Ribeirão Preto'],
    'CE': ['Fortaleza', 'Itapipoca']
  };
  public readonly planosDisponiveis = ['Master', 'Ultra', 'Mega'];

  public readonly tagsDisponiveis = ['Red', 'Green', 'Yellow', 'Blue', 'Purple'];

  private contatos: Contato[] = [];

  // Injetamos o PLATFORM_ID para saber se estamos no Servidor ou no Navegador
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    //TRAVA DE SEGURANÇA: Só roda se estiver no navegador
    if (isPlatformBrowser(this.platformId)) {
      this.carregarOuInicializarBanco();
    }
  }

  private carregarOuInicializarBanco() {
    const dadosSalvos = localStorage.getItem(this.STORAGE_KEY);

    if (dadosSalvos) {
      this.contatos = JSON.parse(dadosSalvos);
      console.log('Dados carregados do localStorage.');
    } else {
      console.log('Banco vazio. Gerando dados iniciais...');
      this.gerarContatosAleatorios(20);
      this.salvarNoNavegador();
    }
  }

  private salvarNoNavegador() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.contatos));
    }
  }

  listarContatos(): Contato[] {
    return this.contatos;
  }

  private gerarContatosAleatorios(quantidade: number) {
    const nomes = [
      'João Silva', 'Maria Oliveira', 'Pedro Santos', 'Ana Costa', 'Carlos Souza',
      'Beatriz Lima', 'Rafael Pereira', 'Luiza Ferreira', 'Marcos Alves', 'Julia Rocha',
      'Gabriel Melo', 'Larissa Nunes', 'Ricardo Barbosa', 'Camila Castro', 'Lucas Martins',
      'Isabela Duarte', 'Thiago Moraes', 'Fernanda Vieira', 'André Ramos', 'Sofia Machado'
    ];

    for (let i = 0; i < quantidade; i++) {
      const estado = this.estados[Math.floor(Math.random() * this.estados.length)];
      const cidades = this.cidadesPorEstado[estado];
      const cidade = cidades[Math.floor(Math.random() * cidades.length)];

      this.contatos.push({
        id: i + 1,
        nome: nomes[i],
        estado: estado,
        cidade: cidade,
        planos: this.sortearPlanos(),
        tags: this.sortearTags()
      });
    }
  }

  private sortearPlanos(): string[] {
    const qtde = Math.floor(Math.random() * 3) + 1;
    return [...this.planosDisponiveis]
      .sort(() => 0.5 - Math.random())
      .slice(0, qtde);
  }

  private sortearTags(): string[] {
    const qtde = Math.floor(Math.random() * 3) + 1;
    return [...this.tagsDisponiveis].sort(() => 0.5 - Math.random()).slice(0, qtde);
  }
}