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

  // Variáveis
  public situacao  : string = "";
  public observacao: string = "";

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

  // Alteração de cadastro
  public mostrarFormulario = false;
  ToggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  // Guardando itens para serem alterados
  linhaSelecionada: any[] = [];
  async GuardarItems(id: number) {
    const {data, error} = await this.supabase.getVagasId(id);
    if (error) {
      this.PresentAlert('', '');
    } else {
      this.linhaSelecionada = data;
    }
  }

  // Alterar vaga
  async AlterarVaga(id: number, situacao: string, observacao: string) {
    // Tratativa - nenhum dado inserido
    if(situacao === "" && observacao === "") {
      this.PresentAlert('🟡 Atenção!', 'Nenhum dado foi alterado.');
      return;
    }
    // Tratativa - Alterou uma coisa só
    if(situacao === "") {
      situacao = this.linhaSelecionada[0].situacao;
    }
    if(observacao === "") {
      observacao = this.linhaSelecionada[0].observacao;
    }
    // Cadastrando
    const {error} = await this.supabase.updateVaga(id, situacao, observacao);
    if(error) {
      this.PresentAlert('🔴 Erro!', 'Ocorreu um erro ao salvar os dados, verifique sua conexão.');
    } else {
      await this.PresentAlert('🟢 Dados Alterados!', 'Sua página será recarregada.');
      window.location.reload();
    }
  }
}