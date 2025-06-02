import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  HostListener,
  ApplicationRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { DataService } from "../../services/data.service";
import { Subscription } from "rxjs";
import { Title } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { Location } from "@angular/common";
import { AuthService } from "../../services/auth.service";

interface Foto {
  src: string;
  alt: string;
  titulo: string;
}

@Component({
  selector: "app-pastor",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./pastor.component.html",
  styleUrls: ["./pastor.component.scss"],
})
export class PastorComponent implements OnInit, OnDestroy {
  lightboxAtivo = false;
  fotoSelecionada: Foto | null = null;
  private subscription: Subscription = new Subscription();
  isAuthenticated = false;

  // CMS - Sistema de gerenciamento de conteúdo
  cms: { [key: string]: string } = {
    "pastor-0": "",
    "pastor-1": "Nosso Pastor",
    "pastor-2":
      "Conheça o Rev. Marcelo Carnaval, pastor da Quarta Igreja Presbiteriana de Macaé",
    "pastor-3": "",
    "pastor-4": "Trajetória Pastoral",
    "pastor-5":
      "Rev. Marcelo Carnaval tem dedicado sua vida ao ministério pastoral há mais de 15 anos. Formado em Teologia pelo Seminário Presbiteriano do Sul, possui também mestrado em Teologia Pastoral.",
    "pastor-6": "Família",
    "pastor-7":
      "É casado com Martha Morett, que é médica psiquiatra infantil. Eles têm quatro filhos: Ana Clara, Ana Luíza, Ana Alícia e Davi.",
    "pastor-8": "Ministério em Macaé",
    "pastor-9":
      "O pastor Marcelo está em Macaé desde 1996. Pastoreou a Segunda Igreja Presbiteriana de Macaé por onze anos, antes de fundar a Quarta IPM, há 14 anos.",
    "pastor-10": "",
    "pastor-11": "Minha Família",
    "pastor-12": "Conheça um pouco mais da família do Rev. Marcelo",
    "pastor-13":
      "A família é o alicerce do ministério pastoral. Somos gratos a Deus pela unidade e pelo apoio mútuo em nossa caminhada.",
    "pastor-14":
      '"Quanto a mim e à minha casa, serviremos ao Senhor" (Josué 24:15)',
    "pastor-15": "",
    "pastor-16": "×",
    "pastor-17": "",
    "pastor-18": "Formação e Ministério",
    "pastor-19":
      "Conheça a trajetória acadêmica e ministerial do Rev. Marcelo Carnaval",
    "pastor-20": "Início do Chamado",
    "pastor-21": "1990",
    "pastor-22":
      "Sentiu o chamado para o ministério pastoral enquanto servia como presbítero em sua igreja de origem no Rio de Janeiro.",
    "pastor-23": "Formação Teológica",
    "pastor-24": "1991-1995",
    "pastor-25":
      "Cursou Teologia no Seminário Teológico Betel, formando-se com distinção e recebendo o Prêmio de Excelência Acadêmica.",
    "pastor-26": "Ordenação ao Ministério",
    "pastor-27": "1996",
    "pastor-28":
      "Foi ordenado ao Sagrado Ministério pelo Presbitério do Norte Fluminense, iniciando seu trabalho pastoral em Macaé.",
    "pastor-29": "Fundação da Quarta IPM",
    "pastor-30": "2010",
    "pastor-31":
      "Após 11 anos pastoreando a Segunda Igreja Presbiteriana de Macaé, foi designado para fundar e liderar a Quarta Igreja Presbiteriana de Macaé.",
    "pastor-32": "",
    "pastor-33": "Áreas de Atuação",
    "pastor-34": "Principais áreas de atuação ministerial do Rev. Marcelo",
    "pastor-35": "Ensino Bíblico",
    "pastor-36": "Escola Bíblica Dominical",
    "pastor-37": "Estudos Bíblicos Semanais",
    "pastor-38": "Aconselhamento Pastoral",
    "pastor-39": "Capacitação de Líderes",
    "pastor-40": "Pregação Expositiva",
    "pastor-41": "Ação Social",
    "pastor-42": "Projetos Sociais na Comunidade",
    "pastor-43": "Assistência a Famílias Carentes",
    "pastor-44": "Capelania em Hospitais",
    "pastor-45": "",
    "pastor-46": "Publicações e Estudos",
    "pastor-47": "Materiais e estudos desenvolvidos pelo Rev. Marcelo",
    "pastor-48": "Artigos Teológicos",
    "pastor-49":
      "Autor de diversos artigos para revistas e sites cristãos, abordando temas como vida familiar, doutrinas reformadas e vida cristã prática.",
    "pastor-50": "Material de Discipulado",
    "pastor-51":
      "Desenvolveu material próprio para discipulado de novos convertidos e treinamento de líderes, utilizado em várias igrejas presbiterianas do estado.",
    "pastor-52": "",
    "pastor-53": "Atuação Presbiterial",
    "pastor-54": "Contribuições para o Presbitério e Sínodo",
    "pastor-55": "Cargos Ocupados",
    "pastor-56": "Secretário Presbiterial (2012-2015)",
    "pastor-57": "Presidente do Presbitério (2016-2018)",
    "pastor-58": "Representante Sinodal (2019-2021)",
    "pastor-59": "",
    "pastor-60": "Gratidão",
    "pastor-61":
      "Sou grato a Deus pela oportunidade de servir à Sua igreja e ao povo de Macaé. Meu desejo é continuar sendo um instrumento nas mãos do Senhor para edificação do Seu reino.",
    "pastor-62":
      '"A graça do Senhor Jesus Cristo, e o amor de Deus, e a comunhão do Espírito Santo sejam com todos vós" - 2 Coríntios 13:13',
  };

  fotos: Foto[] = [
    {
      src: "assets/imagens/familia-pastor/01.jpeg",
      alt: "Martha Morett",
      titulo: "",
    },
    {
      src: "assets/imagens/familia-pastor/02.jpeg",
      alt: "Família do Pastor",
      titulo: "",
    },
    {
      src: "assets/imagens/familia-pastor/03.jpeg",
      alt: "Família do Pastor",
      titulo: "",
    },
    {
      src: "assets/imagens/familia-pastor/4.jpeg",
      alt: "Família do Pastor",
      titulo: "",
    },
    {
      src: "assets/imagens/familia-pastor/05.jpeg",
      alt: "Família do Pastor",
      titulo: "",
    },
    {
      src: "assets/imagens/familia-pastor/07.jpeg",
      alt: "Família do Pastor",
      titulo: "Momentos juntos",
    },
  ];

  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef,
    private appRef: ApplicationRef,
    private titleService: Title,
    private location: Location,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.scrollToTop();
    this.carregarConteudo();

    // Verificar autenticação
    this.subscription.add(
      this.authService.currentUser$.subscribe((user) => {
        this.isAuthenticated = !!user;
        console.log("Status de autenticação:", this.isAuthenticated);
      })
    );

    // Inscrever-se para atualizações de conteúdo
    this.subscription.add(
      this.dataService.paginasAtualizadas$.subscribe((update) => {
        if (update && update.pagina === "pastor") {
          console.log("Conteúdo do pastor atualizado, recarregando...");
          this.carregarConteudo();
        }
      })
    );
  }

  ngOnDestroy(): void {
    // Cancelar inscrições para evitar vazamentos de memória
    this.subscription.unsubscribe();
  }

  carregarConteudo(): void {
    const conteudoPastor = this.dataService.obterConteudoPagina("pastor");
    if (conteudoPastor) {
      console.log("Atualizando conteúdo do pastor:", conteudoPastor);
      // Atualiza o conteúdo
      this.cms = { ...this.cms, ...conteudoPastor };

      // Atualiza o título da página se necessário
      if (this.cms["pastor-1"]) {
        this.titleService.setTitle(
          `${this.cms["pastor-1"]} - Igreja Presbiteriana de Macaé`
        );
      }

      // Força a detecção de alterações para atualizar a visualização
      setTimeout(() => {
        this.cdr.markForCheck();
        this.cdr.detectChanges();
        // Garante que toda a aplicação seja atualizada
        this.appRef.tick();
        console.log("Conteúdo do pastor atualizado com sucesso:", this.cms);
      }, 0);
    } else {
      console.warn("Não foi encontrado conteúdo para a página do pastor!");
    }
  }

  abrirLightbox(foto: Foto): void {
    this.fotoSelecionada = foto;
    this.lightboxAtivo = true;
    document.body.style.overflow = "hidden"; // Impede rolagem quando lightbox estiver aberto
  }

  fecharLightbox(): void {
    this.lightboxAtivo = false;
    document.body.style.overflow = ""; // Restaura rolagem
  }

  @HostListener("document:keydown.escape")
  fecharLightboxComEsc(): void {
    if (this.lightboxAtivo) {
      this.fecharLightbox();
    }
  }

  @HostListener("window:click", ["$event"])
  fecharLightboxForaClick(event: MouseEvent): void {
    if (this.lightboxAtivo) {
      const target = event.target as HTMLElement;
      if (target.classList.contains("lightbox")) {
        this.fecharLightbox();
      }
    }
  }

  // Método para voltar à página anterior
  goBack(): void {
    this.location.back();
  }

  private scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
