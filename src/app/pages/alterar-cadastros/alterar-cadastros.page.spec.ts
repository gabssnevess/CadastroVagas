import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlterarCadastrosPage } from './alterar-cadastros.page';

describe('AlterarCadastrosPage', () => {
  let component: AlterarCadastrosPage;
  let fixture: ComponentFixture<AlterarCadastrosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarCadastrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
