import { Component, OnInit } from '@angular/core';
import { Supabase } from '../services/supabase/supabase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  constructor(private supabase: Supabase, private router: Router) {}
  async ngOnInit() {
    await this.getSession();
    await this.getUser();
    await this.getClientes();
  }

  // Pegando o usuário logado
  usuario: any;
  async getUser() {
    const {data, error} = await this.supabase.getUser();
    if (error) {
      console.error('Erro ao pegar usuário:', error);
      this.router.navigate(['/login']);
    } else {
      this.usuario = data.user.email?.split('@', 1);
    }
  }

  // Pegando a sessão do usuário
  async getSession() {
    const { data, error } = await this.supabase.getSession();
    return data.session ?? null;
  }

  // Variaveis do formulário
  public dataAbertura: Date = new Date();
  public dataPrevista: Date = new Date();
  public status: string = "Aberto";
  public statusAberto: string = "Em dia";
  public recrutador: string = "";
  public cliente: string = "";
  public uf: string = "";
  public cidade: string = "";
  public situacao: string = "";
  public cobreFerias: string = "";
  public tipoContratacao: string = "";
  public observacoes: string = "";

  // Pegando os clientes do banco de dados
  clientes: any[] = [];
  async getClientes() {
    const {data, error} = await this.supabase.getClientes();
    if (error) {
      console.error("Erro: ", error);
    } else {
      this.clientes = data;
    }
  }

  // Cadastrando a vaga nova
  async postVaga() {
    const {data, error} = await this.supabase.postVaga(this.dataAbertura, this.dataPrevista, this.status, this.statusAberto, this.recrutador,
      this.cliente, this.uf, this.cidade, this.situacao, this.cobreFerias, this.tipoContratacao, this.observacoes
    );
    if (error) {
      console.error('Erro ao cadastrar: ', error);
    } else {
      console.log('Cadastro realizado.');
    }
  }

  // Logout
  async logOut() {
    await this.supabase.logOut();
    this.router.navigate(['/login']);
  }
}