import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { Supabase } from 'src/app/services/supabase/supabase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class HeaderComponent implements OnInit {
  constructor(private supabase: Supabase, private router: Router, private alertController: AlertController) {}
  async ngOnInit() {
    await this.getSession();
    await this.getUser();
  }

  // Pegando o usuário logado
  usuario: any;
  async getUser() {
    const {data, error} = await this.supabase.getUser();
    if (error) {
      // console.error('Erro ao pegar usuário:', error);
      this.PresentAlert('🟡 Atenção!', 'Favor realizar login novamente.');
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

  // Logout
  async logOut() {
    await this.supabase.logOut();
    this.router.navigate(['/login']);
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

}
