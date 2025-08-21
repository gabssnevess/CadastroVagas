import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class Supabase {
  private API_URL: string = "https://cmtlvwfzwjusparliaxz.supabase.co";
  private API_KEY: string = "sb_publishable_DNkkuqRTZh-oK2U_2s7sXg_UecrLPR3";
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(this.API_URL, this.API_KEY);
  }

  // Login
  async login(email: string, password: string) {
    return await this.supabase.auth.signInWithPassword({
      email: email,
      password: password
    });
  }

  // Logout
  async logOut() {
    return await this.supabase.auth.signOut();
  }

  // Get - User
  async getUser() {
    return await this.supabase.auth.getUser();
  }

  // Get - Session
  async getSession() {
    return await this.supabase.auth.getSession();
  }

  // Get - tbl_VagasEmAberto
  async getVagas() {
    return await this.supabase.from('tbl_VagasEmAberto').select('*');
  }

  // Get - tbl_Clientes
  async getClientes() {
    return await this.supabase.from('tbl_Cliente').select('*');
  }

  // Post - tbl_VagasEmAberto
  async postVaga(dataAbertura: Date, dataPrevista: Date, status: string, statusAberto: string, recrutador: string, cliente: string,
    uf: string, cidade: string, situacao: string, cobreFerias: string, tipoContratacao: string, observacoes: string
  ) {
    return await this.supabase.from('tbl_VagasEmAberto').insert([{
      data_abertura: dataAbertura,
      data_prevista_inicio: dataPrevista,
      status: status,
      status_em_aberto: statusAberto,
      recrutador: recrutador,
      cliente: cliente,
      uf: uf,
      cidade: cidade,
      situacao: situacao,
      cobre_ferias: cobreFerias,
      tipo_contratacao: tipoContratacao,
      observacoes: observacoes
    }])
  }
}