import {
  Component,
  OnInit,
  HostListener,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  Inject,
  AfterViewInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isMenuOpen = false;
  activeDropdown: string | null = null;
  isMobile = false;
  isAuthenticated = false;
  isAdmin = false;

  // CMS - Sistema de gerenciamento de conteúdo
  cms: { [key: string]: string } = {
    "header-0": "",
    "header-1": "Culto Domingo às 18h",
    "header-2": "Escola Dominical às 9h",
    "header-3": "",
    "header-4": "Quarta Igreja Presbiteriana de Macaé",
    "header-5": "IPM",
    "header-6": "",
    "header-7": "Início",
    "header-8": "Sobre",
    "header-9": "Pastor",
    "header-10": "Reforma",
    "header-11": "João Calvino",
    "header-12": "Martinho Lutero",
    "header-13": "Ashbel Simonton",
    "header-14": "Agenda",
    "header-15": "Localização",
    "header-16": "Dízimos e Ofertas",
    "header-17": "Escalas",
    "header-18": "Área Restrita",
    "header-19": "",
    "header-20": "",
    "header-21": "Início",
    "header-22": "Sobre",
    "header-23": "Pastor",
    "header-24": "Reforma",
    "header-25": "João Calvino",
    "header-26": "Martinho Lutero",
    "header-27": "Ashbel Simonton",
    "header-28": "Agenda",
    "header-29": "Localização",
    "header-30": "Dízimos e Ofertas",
    "header-31": "Escalas",
    "header-32": "Área Restrita",
  };

  constructor(
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Verificar se estamos em um dispositivo mobile
    this.checkIfMobile();

    // Verificar status de autenticação
    this.authService.currentUser$.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.isAdmin = user?.role === "admin";
      this.cdr.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    // Garantir que os elementos do DOM estejam prontos
    setTimeout(() => {
      this.checkIfMobile();
      this.cdr.markForCheck();
    }, 0);
  }

  // Verifica se estamos em um dispositivo mobile (largura < 992px)
  checkIfMobile(): void {
    this.isMobile = window.innerWidth < 992;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;

    // Adiciona ou remove a classe menu-open no body
    if (this.isMenuOpen) {
      this.renderer.addClass(this.document.body, "menu-open");

      // Remover qualquer elemento menu-overlay que exista
      const overlays = this.document.querySelectorAll(".menu-overlay");
      overlays.forEach((overlay) => {
        if (overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      });
    } else {
      this.renderer.removeClass(this.document.body, "menu-open");
    }

    this.cdr.markForCheck();
  }

  // Método para fechar o menu - aprimorado
  closeMenu(): void {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
      this.renderer.removeClass(this.document.body, "menu-open");

      // Forçar o fechamento do menu com um pequeno atraso
      // para garantir que a animação funcione corretamente
      setTimeout(() => {
        this.cdr.markForCheck();
      }, 50);
    }
  }

  toggleDropdown(event: MouseEvent, dropdownName: string): void {
    event.preventDefault();
    event.stopPropagation();

    // Em dispositivos móveis, permite a navegação em cascata
    if (this.isMobile) {
      this.activeDropdown =
        this.activeDropdown === dropdownName ? null : dropdownName;
    } else {
      // Em desktop, abre imediatamente
      this.activeDropdown =
        this.activeDropdown === dropdownName ? null : dropdownName;
    }

    this.cdr.markForCheck();
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent): void {
    // Fecha o dropdown quando clicar fora dele
    const target = event.target as HTMLElement;
    if (!target.closest(".dropdown-toggle") && !target.closest(".submenu")) {
      this.activeDropdown = null;
      this.cdr.markForCheck();
    }
  }

  @HostListener("window:resize")
  onResize(): void {
    // Fecha o menu em dispositivos móveis quando a janela for redimensionada
    this.checkIfMobile();
    if (this.isMenuOpen && !this.isMobile) {
      this.isMenuOpen = false;
      this.renderer.removeClass(this.document.body, "menu-open");
      this.cdr.markForCheck();
    }
  }

  // Detecta cliques em links e fecha o menu mobile se estiver aberto
  @HostListener("click", ["$event"])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    // Se clicar em um link (exceto dropdown), fecha o menu mobile
    if (
      target.tagName === "A" &&
      !target.classList.contains("dropdown-toggle")
    ) {
      if (this.isMenuOpen) {
        this.isMenuOpen = false;
        this.renderer.removeClass(this.document.body, "menu-open");
        this.cdr.markForCheck();
      }
    }
  }

  // Método específico para navegar e fechar o menu - nova solução
  navigateToPage(route: string): void {
    // Verificar se está tentando acessar área administrativa
    if (route.startsWith("/admin")) {
      // Verificar autenticação antes de permitir navegação para área admin
      if (!this.authService.isAuthenticated) {
        console.log(
          "Tentativa de acesso à área administrativa sem autenticação"
        );
        this.router.navigate(["/login"]);
        this.closeMenu();
        this.activeDropdown = null;
        this.cdr.markForCheck();
        return;
      }
    }

    // Destacar a navegação para a página do pastor
    if (route === "/pastor") {
      console.log("Navegando para a página do pastor");
    }

    // Programar a navegação para ocorrer após o fechamento do menu
    setTimeout(() => {
      this.router.navigate([route]).then(() => {
        // Rolar para o topo da página
        window.scrollTo(0, 0);
      });
    }, 100);

    // Fechar o menu e os dropdowns
    this.closeMenu();
    this.activeDropdown = null;
    this.cdr.markForCheck();
  }

  // Método para navegar para fragmentos específicos
  navigateToFragment(fragment: string): void {
    // Primeiro verificamos se já estamos na página inicial
    if (
      this.router.url.split("#")[0] === "/" ||
      this.router.url.split("#")[0] === ""
    ) {
      // Se estamos na página inicial, podemos scrollar diretamente para o elemento
      const element = this.document.getElementById(fragment);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Se não estamos na página inicial, navegamos para a página inicial com o fragmento
      this.router.navigate(["/"], { fragment: fragment }).then(() => {
        // Adicionamos um pequeno atraso para garantir que o fragmento seja rolado após a navegação
        setTimeout(() => {
          const element = this.document.getElementById(fragment);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);
      });
    }

    // Fecha o menu mobile após clicar com um pequeno atraso
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
      this.renderer.removeClass(this.document.body, "menu-open");

      // Atraso para permitir que a navegação ocorra primeiro
      setTimeout(() => {
        this.activeDropdown = null;
        this.cdr.markForCheck();
      }, 50);
    } else {
      this.activeDropdown = null;
      this.cdr.markForCheck();
    }
  }

  // Método específico para ir direto para a página do pastor
  goToPastor(): void {
    // Adicionar indicação visual da navegação
    const pastorLinks = this.document.querySelectorAll(
      ".pastor-top-link, .featured-link"
    );
    pastorLinks.forEach((link) => {
      if (link instanceof HTMLElement) {
        link.style.transition = "all 0.3s";
        link.style.backgroundColor = "var(--primary-color)";
        link.style.color = "white";

        setTimeout(() => {
          link.style.backgroundColor = "";
          link.style.color = "";
        }, 300);
      }
    });

    // Navegar para a página do pastor
    this.router.navigate(["/pastor"]).then(() => {
      // Garantir que a página role para o topo
      window.scrollTo(0, 0);

      // Fechar o menu e dropdowns
      this.closeMenu();
      this.activeDropdown = null;
      this.cdr.markForCheck();
    });
  }

  // Método melhorado para fechamento de menu e dropdowns
  closeAllMenus(): void {
    // Fechar menu mobile
    this.isMenuOpen = false;
    this.renderer.removeClass(this.document.body, "menu-open");

    // Fechar todos os dropdowns
    this.activeDropdown = null;

    // Atualizar a view
    this.cdr.markForCheck();
  }

  // Método para mostrar o dropdown do painel admin
  navigateToAdminPanel(event: MouseEvent, dropdownName: string): void {
    event.preventDefault();
    event.stopPropagation();

    // Sempre verificar autenticação antes de permitir acesso ao menu admin
    // Isso garante que mesmo que haja um estado inconsistente, sempre faça a validação
    const isAuthenticated = this.authService.isAuthenticated;

    // Verifica se o usuário está autenticado (usando a verificação mais recente)
    if (isAuthenticated) {
      console.log(
        "Usuário autenticado. Mostrando dropdown admin:",
        dropdownName
      );
      // Apenas alterna o dropdown para mostrar as opções do menu
      this.activeDropdown =
        this.activeDropdown === dropdownName ? null : dropdownName;
    } else {
      // Se não estiver autenticado, redireciona para a página de login
      console.log("Usuário não autenticado. Redirecionando para login.");
      this.router.navigate(["/login"], { queryParams: { redirect: "admin" } });
    }

    this.cdr.markForCheck();
  }
}
