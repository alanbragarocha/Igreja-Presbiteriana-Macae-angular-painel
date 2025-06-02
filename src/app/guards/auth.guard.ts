import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  UrlTree,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log("AuthGuard: Verificando autenticação para rota:", state.url);

    // Verificação estrita de autenticação
    if (this.authService.isAuthenticated) {
      // Verificar se é uma rota administrativa e se o usuário tem permissão de admin
      if (state.url.includes("/admin") && !this.authService.isAdmin) {
        console.log("Usuário autenticado, mas sem permissões de administrador");
        alert("Você não tem permissão para acessar esta área administrativa");
        this.authService.logout();
        return this.router.parseUrl(
          "/login?redirect=admin&error=access_denied"
        );
      }

      // Usuário está autenticado e tem permissões adequadas, permitir acesso
      console.log(
        "Usuário autenticado. Acesso permitido ao painel administrativo."
      );
      return true;
    }

    // Se não estiver autenticado, redireciona para a página de login
    console.log("Usuário não autenticado. Redirecionando para login.");

    // Armazenar URL de destino para redirecionamento após login
    const returnUrl = state.url;
    localStorage.setItem("returnUrl", returnUrl);

    // Forçar limpeza de qualquer dado de sessão inconsistente
    this.authService.logout();

    // Redirecionar para a página de login
    return this.router.parseUrl("/login?redirect=admin");
  }
}
