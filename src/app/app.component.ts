import { Component, OnInit } from "@angular/core";
import { RouterOutlet, Router, NavigationEnd, Event } from "@angular/router";
import { CommonModule } from "@angular/common";
import { filter } from "rxjs/operators";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "Igreja Presbiteriana de Macaé";
  private wasInAdmin = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Monitorar mudanças de rota para detectar quando o usuário sai da área administrativa
    this.router.events
      .pipe(
        filter(
          (event: Event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        // Verifica se o usuário estava na área administrativa e saiu
        const isNowInAdmin = event.url.includes("/admin");

        if (this.wasInAdmin && !isNowInAdmin) {
          console.log(
            "Usuário saiu da área administrativa - encerrando sessão"
          );
          // Forçar reautenticação ao sair da área administrativa
          this.authService.forceReauthOnExit();
        }

        // Atualiza o estado para a próxima verificação
        this.wasInAdmin = isNowInAdmin;
      });
  }
}
