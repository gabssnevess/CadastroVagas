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

  // Get - tbl_VagasEmAberto
  async getVagas() {
    return await this.supabase.from('tbl_VagasEmAberto').select('*');
  }

  // Get - tbl_Clientes
  async getClientes() {
    return await this.supabase.from('tbl_Cliente').select('*');
  }
}