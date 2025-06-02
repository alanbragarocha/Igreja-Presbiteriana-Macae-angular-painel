import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const authInterceptorFn: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar se a requisição está relacionada ao admin
  if (request.url.includes("/admin")) {
    // Verifica autenticação para requisições administrativas
    if (!authService.isAuthenticated) {
      console.log(
        "Interceptor: Tentativa de acesso não autorizado a rota administrativa"
      );
      // Se não estiver autenticado, forçar logout e redirecionar
      authService.logout();
      router.navigate(["/login"], { queryParams: { redirect: "admin" } });
      return throwError(
        () => new Error("Acesso não autorizado. Por favor, faça login.")
      );
    }

    // Verifica se tem permissão de administrador
    if (!authService.isAdmin) {
      console.log(
        "Interceptor: Usuário sem permissão de administrador tentando acessar rota protegida"
      );
      authService.logout();
      router.navigate(["/login"], {
        queryParams: {
          redirect: "admin",
          error: "access_denied",
        },
      });
      return throwError(
        () =>
          new Error(
            "Você não tem permissão para acessar recursos administrativos."
          )
      );
    }
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      // Se recebemos um erro 401 (Não autorizado), redirecionar para o login
      if (error.status === 401) {
        console.log("Interceptor: Recebido erro 401 de autenticação");
        authService.logout();
        router.navigate(["/login"]);
      }
      return throwError(() => error);
    })
  );
};
