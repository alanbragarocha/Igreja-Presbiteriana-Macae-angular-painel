import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../services/auth.service";
import { DataService } from "../../services/data.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = "";
  isLoading: boolean = false;
  redirectUrl: string = "/admin";

  // CMS - Sistema de gerenciamento de conteúdo
  cms: { [key: string]: string } = {
    "login-0": "Área Restrita",
    "login-1": "Acesse o painel administrativo da igreja",
    "login-2": "Usuário",
    "login-3": "Por favor, informe seu usuário",
    "login-4": "Senha",
    "login-5": "Por favor, informe sua senha",
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private dataService: DataService
  ) {
    console.log("LoginComponent: Inicializando componente de login");

    // Garantir que qualquer sessão inconsistente seja limpa ao entrar na página de login
    this.authService.logout();

    // Verificar se há parâmetros de redirecionamento ou erro na URL
    this.route.queryParams.subscribe((params) => {
      if (params["redirect"]) {
        this.redirectUrl = `/${params["redirect"]}`;
      }

      // Tratar mensagens de erro específicas
      if (params["error"]) {
        switch (params["error"]) {
          case "access_denied":
            this.errorMessage =
              "Você não tem permissão para acessar a área administrativa.";
            break;
          case "session_expired":
            this.errorMessage =
              "Sua sessão expirou. Por favor, faça login novamente.";
            break;
          case "insufficient_permissions":
            this.errorMessage =
              "Você precisa ter privilégios de administrador.";
            break;
          default:
            this.errorMessage =
              "Ocorreu um erro de autenticação. Por favor, faça login.";
        }
      }
    });

    // Carregar conteúdo da página de login do storage
    const conteudo = this.dataService.obterConteudoPagina("login");
    if (conteudo) {
      this.cms = { ...this.cms, ...conteudo };
    }
  }

  ngOnInit(): void {
    console.log("LoginComponent inicializado");
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  // Getter para fácil acesso aos campos do formulário
  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    // Limpar qualquer erro anterior
    this.errorMessage = "";

    // Se o formulário é inválido, mostrar mensagens de erro específicas
    if (this.loginForm.invalid) {
      if (this.f["username"].errors?.["required"]) {
        this.errorMessage = "O nome de usuário é obrigatório.";
      } else if (this.f["password"].errors?.["required"]) {
        this.errorMessage = "A senha é obrigatória.";
      } else {
        this.errorMessage = "Por favor, preencha todos os campos corretamente.";
      }
      return;
    }

    this.isLoading = true;

    // Validação mais rigorosa dos valores de entrada
    const username = this.f["username"].value?.trim() || "";
    const password = this.f["password"].value || "";

    // Validações estendidas antes de chamar o serviço
    if (!username) {
      this.isLoading = false;
      this.errorMessage = "O nome de usuário não pode estar em branco.";
      return;
    }

    if (!password) {
      this.isLoading = false;
      this.errorMessage = "A senha não pode estar em branco.";
      return;
    }

    // Verificar comprimento mínimo da senha
    if (password.length < 4) {
      this.isLoading = false;
      this.errorMessage = "A senha deve ter pelo menos 4 caracteres.";
      return;
    }

    console.log(`LoginComponent: Tentativa de login para usuário: ${username}`);

    // Tenta fazer login usando o AuthService
    this.authService.login(username, password).subscribe({
      next: (user) => {
        this.isLoading = false;
        if (user) {
          console.log(
            `Login bem-sucedido para: ${user.username}, role: ${user.role}`
          );

          // Verificar se o usuário tem permissão para acessar área administrativa
          if (this.redirectUrl?.includes("admin") && user.role !== "admin") {
            this.errorMessage =
              "Você não tem permissão para acessar a área administrativa.";
            this.authService.logout();
            return;
          }

          // Login bem-sucedido, redirecionar para o painel administrativo ou URL especificada
          console.log(`Redirecionando para ${this.redirectUrl}`);
          this.router.navigate([this.redirectUrl]);
        } else {
          // Login falhou - mensagem específica
          console.log("Login falhou: credenciais inválidas");
          this.errorMessage =
            "Usuário ou senha inválidos. Por favor, tente novamente.";
          // Limpar o campo de senha para maior segurança
          this.loginForm.get("password")?.reset();
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage =
          "Ocorreu um erro durante o login. Tente novamente mais tarde.";
        console.error("Erro de login:", error);
        // Limpar o campo de senha para maior segurança
        this.loginForm.get("password")?.reset();
      },
    });
  }
}
