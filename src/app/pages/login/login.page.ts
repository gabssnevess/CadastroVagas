import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Supabase } from 'src/app/services/supabase/supabase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  constructor(private supabase: Supabase, private router: Router, private alertController: AlertController) { }
  async ngOnInit() {
  }

  // Variaveis do login
  public email: string = "";
  public senha: string = "";
  async login() {
    const {error} = await this.supabase.login(this.email, this.senha);
    if (error) {
      // console.error('Erro ao logar: ', error);
      this.PresentAlert('🔴 Erro!', 'Usuário ou senha incorretos, verifique e tente novamente.')
    } else {
      // console.log('Logado');
      this.router.navigate(['/home']);
    }
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