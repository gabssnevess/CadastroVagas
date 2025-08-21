import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Supabase } from 'src/app/services/supabase/supabase';

@Component({
  selector: 'app-alterar-cadastros',
  templateUrl: './alterar-cadastros.page.html',
  styleUrls: ['./alterar-cadastros.page.scss'],
  standalone: false,
})
export class AlterarCadastrosPage implements OnInit {
  constructor(private supabase: Supabase, private alertController: AlertController) { }
  async ngOnInit() {
    await this.GetVagas();
  }

  // Criando alertas
  async PresentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Pegar todos os registros
  tabela: any[] = [];
  async GetVagas() {
    const {data, error} = await this.supabase.getVagas();
    if (error) {
      this.PresentAlert('🔴 Erro!', 'Erro ao recuperar os dados.');
    } else {
      this.tabela = data;
    }
  }
}
