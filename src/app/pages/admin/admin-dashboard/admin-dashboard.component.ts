import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DataService } from "../../../services/data.service";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-admin-dashboard",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"],
})
export class AdminDashboardComponent implements OnInit {
  dadosForm!: FormGroup;
  isSaving = false;
  saveSuccess = false;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Inicialização do formulário com dados da home
    const homeContent = this.dataService.obterConteudoPagina("home") || {};

    this.dadosForm = this.formBuilder.group({
      titulo: [
        homeContent["titulo"] ||
          "Bem-vindo à Quarta Igreja Presbiteriana de Macaé",
        Validators.required,
      ],
      subtitulo: [
        homeContent["subtitulo"] ||
          "Um lugar para adorar a Deus, crescer na fé e servir ao próximo.",
        Validators.required,
      ],
      descricao: [
        homeContent["descricao"] ||
          "A Quarta IPM é uma igreja cristã presbiteriana...",
        Validators.required,
      ],
      // Dados do Pastor
      pastor_nome: [
        homeContent["pastor_nome"] || "Rev. Marcelo Carnaval Morett",
      ],
      pastor_cargo: [homeContent["pastor_cargo"] || "Pastor Titular"],
      pastor_bio_curta: [
        homeContent["pastor_bio_curta"] ||
          "Nascido em 1962, é mineiro, criado no Rio de Janeiro e mora em Macaé desde 1996. É casado com Martha Morett, que é médica psiquiatra infantil. Eles têm quatro filhos: Ana Clara, Ana Luíza, Ana Alícia e Davi.",
      ],
      pastor_formacao_curta: [
        homeContent["pastor_formacao_curta"] ||
          "O pastor Marcelo é Bacharel em teologia pelo Seminário Teológico Betel, no Rio de Janeiro. Pastoreou a Segunda Igreja Presbiteriana de Macaé por onze anos, antes de plantar a Quarta IPM, há 14 anos.",
      ],
      // Seção Reformadores
      reformadores_titulo: [
        homeContent["reformadores_titulo"] || "Figuras Históricas",
      ],
      reformadores_descricao: [
        homeContent["reformadores_descricao"] ||
          "Conheça algumas das figuras históricas mais importantes para a teologia reformada e a Igreja Presbiteriana.",
      ],
      // Dados de Lutero
      lutero_nome: [homeContent["lutero_nome"] || "Martinho Lutero"],
      lutero_descricao: [
        homeContent["lutero_descricao"] ||
          "Monge alemão e professor de teologia que iniciou a Reforma Protestante no século XVI, quando publicou suas 95 teses contra as indulgências.",
      ],
      // Dados de Calvino
      calvino_nome: [homeContent["calvino_nome"] || "João Calvino"],
      calvino_descricao: [
        homeContent["calvino_descricao"] ||
          "Teólogo francês cuja interpretação sistemática das doutrinas bíblicas formou a base teológica do presbiterianismo e outras denominações reformadas.",
      ],
      // Dados de Ashbel
      ashbel_nome: [homeContent["ashbel_nome"] || "Ashbel Green Simonton"],
      ashbel_descricao: [
        homeContent["ashbel_descricao"] ||
          "Missionário norte-americano que fundou a Igreja Presbiteriana no Brasil em 1859, iniciando o trabalho presbiteriano em nosso país.",
      ],
      // Seção da Agenda
      agenda_titulo: [homeContent["agenda_titulo"] || "Nossa Agenda"],
      agenda_descricao: [
        homeContent["agenda_descricao"] ||
          "Confira nossos próximos eventos e participe conosco destes momentos especiais de comunhão, adoração e aprendizado.",
      ],
      // Seção de Localização
      localizacao_titulo: [homeContent["localizacao_titulo"] || "Como Chegar"],
      localizacao_descricao: [
        homeContent["localizacao_descricao"] ||
          "Veja nossa localização no mapa e venha nos visitar!",
      ],
      // Seção de Dízimos e Ofertas
      dizimos_titulo: [homeContent["dizimos_titulo"] || "Dízimos e Ofertas"],
      dizimos_descricao: [
        homeContent["dizimos_descricao"] ||
          "Contribua para nossa obra através dos canais abaixo",
      ],
      // Informações de Banco
      banco_titulo: [homeContent["banco_titulo"] || "Transferência Bancária"],
      banco_label: [homeContent["banco_label"] || "Banco:"],
      conta_label: [homeContent["conta_label"] || "Conta:"],
      titular_label: [homeContent["titular_label"] || "Titular:"],
      cnpj_label: [homeContent["cnpj_label"] || "CNPJ:"],
      // Informações de PIX
      pix_titulo: [homeContent["pix_titulo"] || "PIX"],
      chave_pix_label: [homeContent["chave_pix_label"] || "Chave PIX:"],
      tipo_pix_label: [homeContent["tipo_pix_label"] || "Tipo:"],
      botao_pix: [homeContent["botao_pix"] || "Copiar Chave PIX"],
    });
  }

  // Método para rolar para a seção de edição de conteúdo
  scrollToContent(): void {
    const element = document.getElementById("content-editor");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  onSubmit(): void {
    if (this.dadosForm.invalid) {
      return;
    }

    this.isSaving = true;
    this.saveSuccess = false;

    // Salva os dados da home
    this.dataService.atualizarConteudoPagina("home", this.dadosForm.value);

    // Simula um delay para feedback visual
    setTimeout(() => {
      this.isSaving = false;
      this.saveSuccess = true;

      // Remove a mensagem de sucesso após 3 segundos
      setTimeout(() => {
        this.saveSuccess = false;
      }, 3000);
    }, 800);
  }
}
