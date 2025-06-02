import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AuthService, User } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  currentUser: User | null = null;
  isAdminAuthorized: boolean = false;
  sessionExpiryTime: Date | null = null;
  notAuthorized: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log("AdminComponent: Inicializando componente administrativo");

    // Configurar tempo de expiração da sessão
    this.calculateSessionExpiry();

    // Verificação dupla de autenticação
    if (!this.authService.isAuthenticated) {
      console.log("AdminComponent: Acesso não autorizado detectado");
      this.notAuthorized = true;
      this.isAdminAuthorized = false;
      this.authService.logout();

      // Pequeno atraso antes de redirecionar para garantir que a mensagem seja exibida
      setTimeout(() => {
        this.router.navigate(["/login"], {
          queryParams: { redirect: "admin" },
        });
      }, 500);
      return;
    }

    // Verificar especificamente se tem permissão de administrador
    if (!this.authService.isAdmin) {
      console.log("AdminComponent: Usuário sem permissões de administrador");
      this.notAuthorized = true;
      this.isAdminAuthorized = false;
      alert(
        "Você precisa ter privilégios de administrador para acessar esta área."
      );
      this.authService.logout();

      // Pequeno atraso antes de redirecionar para garantir que a mensagem seja exibida
      setTimeout(() => {
        this.router.navigate(["/login"], {
          queryParams: {
            redirect: "admin",
            error: "insufficient_permissions",
          },
        });
      }, 500);
      return;
    }

    // Se chegou aqui, o usuário tem permissão
    this.isAdminAuthorized = true;
    this.notAuthorized = false;

    // Obter informações do usuário logado e monitorar alterações
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;

      // Verificação contínua de autenticação
      if (!user) {
        console.log(
          "AdminComponent: Usuário tornou-se inválido durante a sessão"
        );
        this.isAdminAuthorized = false;
        this.notAuthorized = true;
        this.router.navigate(["/login"]);
        return;
      }

      // Verificação contínua de permissão
      if (user.role !== "admin") {
        console.log("AdminComponent: Usuário sem permissão de administrador");
        this.isAdminAuthorized = false;
        this.notAuthorized = true;
        alert(
          "Você precisa ter privilégios de administrador para acessar esta área."
        );
        this.authService.logout();
        this.router.navigate(["/login"]);
      }
    });

    // Configurar um timer para verificar a autenticação periodicamente (a cada 1 minuto)
    const authCheckInterval = setInterval(() => {
      if (!this.authService.isAuthenticated || !this.authService.isAdmin) {
        console.log(
          "AdminComponent: Verificação periódica detectou problema de autenticação"
        );
        this.isAdminAuthorized = false;
        this.notAuthorized = true;
        clearInterval(authCheckInterval);
        this.authService.logout();
        this.router.navigate(["/login"], {
          queryParams: { redirect: "admin", error: "session_expired" },
        });
      } else {
        // Recalcular tempo de expiração
        this.calculateSessionExpiry();
      }
    }, 60000); // Verificar a cada minuto
  }

  // Método para calcular o tempo de expiração da sessão
  private calculateSessionExpiry(): void {
    const lastLogin = localStorage.getItem("lastLogin");
    if (lastLogin) {
      const loginTime = new Date(lastLogin).getTime();
      // Sessão válida por 30 minutos desde o último login
      this.sessionExpiryTime = new Date(loginTime + 30 * 60 * 1000);
    } else {
      this.sessionExpiryTime = null;
    }
  }

  logout(): void {
    console.log("Realizando logout e limpando as credenciais");
    this.authService.logout();
    this.router.navigate(["/login"]);

    // Mostrar notificação de logout
    setTimeout(() => {
      alert("Você foi desconectado com sucesso!");
    }, 100);
  }

  // Método para navegar para a página de login
  goToLogin(): void {
    this.router.navigate(["/login"], {
      queryParams: { redirect: "admin" },
    });
  }
}
