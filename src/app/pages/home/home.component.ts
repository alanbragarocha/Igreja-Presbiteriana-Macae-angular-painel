// filepath: /home/braga/Documentos/Igreja/teste-angular-main/src/app/pages/home/home.component.ts
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import {
  DataService,
  DadosBancarios,
  DadosPix,
  Evento,
} from "../../services/data.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  // Usando o modo de detecção de alterações padrão para garantir atualizações
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HomeComponent implements OnInit {
  dadosBancarios: DadosBancarios;
  dadosPixId: DadosPix;
  eventos: Evento[];

  // CMS - Sistema de gerenciamento de conteúdo
  cms: { [key: string]: string } = {
    titulo: "Bem-vindo à Quarta Igreja Presbiteriana de Macaé",
    subtitulo:
      "Um lugar para adorar a Deus, crescer na fé e servir ao próximo.",
    descricao:
      "A Quarta IPM é uma igreja cristã presbiteriana. Somos filiados à IPB – Igreja Presbiteriana do Brasil, que é uma denominação histórica. Ela é fruto da Reforma Protestante do Século XVI e está presente em todo Brasil e boa parte do mundo. É uma igreja idônea, acolhedora e cristocêntrica. Aqui no Brasil nossa igreja está presente desde 1859, ano que marca a chegada do nosso primeiro missionário, o Rev. Ashbel Green Simonton.",
  };

  constructor(private dataService: DataService) {
    this.dadosBancarios = this.dataService.dadosBancarios;
    this.dadosPixId = this.dataService.dadosPix;
    this.eventos = this.dataService.eventos;

    // Carregar conteúdo personalizado da página
    const conteudoHome = this.dataService.obterConteudoPagina("home");
    if (conteudoHome) {
      // Mesclar o conteúdo personalizado com os valores padrão
      this.cms = { ...this.cms, ...conteudoHome };
    }
  }

  ngOnInit(): void {
    // Inscrever-se nas mudanças de dados para atualização em tempo real
    this.dataService.eventos$.subscribe((eventos) => {
      this.eventos = eventos;
    });

    this.dataService.dadosBancarios$.subscribe((dados) => {
      this.dadosBancarios = dados;
    });

    this.dataService.dadosPix$.subscribe((dados) => {
      this.dadosPixId = dados;
    });

    // Monitorar alterações nas páginas
    this.dataService.paginasAtualizadas$.subscribe((atualizacao) => {
      if (atualizacao.pagina === "home") {
        this.cms = { ...this.cms, ...atualizacao.conteudo };
        console.log("Conteúdo da home atualizado:", this.cms);
      }
    });
  }

  copiarChavePix(): void {
    navigator.clipboard
      .writeText(this.dadosPixId.chave)
      .then(() => {
        alert("Chave PIX copiada com sucesso!");
      })
      .catch((err) => {
        console.error("Erro ao copiar: ", err);
        alert(
          "Não foi possível copiar a chave PIX. Por favor, copie manualmente."
        );
      });
  }
}
