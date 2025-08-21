import { Component, OnInit } from '@angular/core';
import { Supabase } from '../services/supabase/supabase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
  providers: [Supabase]
})
export class HomePage implements OnInit {
  constructor(private supabase: Supabase) {}
  async ngOnInit() {
    await this.getClientes();
  }


  clientes: any[] = [];
  async getClientes() {
    const {data, error} = await this.supabase.getClientes();
    if (error) {
      console.error("Erro: ", error);
    } else {
      this.clientes = data;
    }
  }
}
