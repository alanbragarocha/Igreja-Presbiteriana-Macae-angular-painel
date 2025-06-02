import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthService, User } from "../../../services/auth.service";

@Component({
  selector: "app-admin-usuarios",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./admin-usuarios.component.html",
  styleUrls: ["./admin-usuarios.component.scss"],
})
export class AdminUsuariosComponent implements OnInit {
  novo: {
    nome: string;
    email: string;
    username: string;
    senha: string;
    role: string;
  } = {
    nome: "",
    email: "",
    username: "",
    senha: "",
    role: "editor",
  };

  // Lista dos usuários do sistema (autenticação)
  usuariosSistema: User[] = [];
  // Exibe ou oculta o dashboard
  mostrarDashboard: boolean = false;

  // Feedback para o usuário
  mensagem: { texto: string; tipo: "sucesso" | "erro" } | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Carregar usuários do sistema de autenticação
    this.carregarUsuariosSistema();
  }

  carregarUsuariosSistema() {
    // Obter os usuários do serviço de autenticação
    this.usuariosSistema = this.authService.getAllUsers();
  }

  criar() {
    if (
      !this.novo.nome ||
      !this.novo.email ||
      !this.novo.senha ||
      !this.novo.username
    ) {
      this.mensagem = {
        texto: "Preencha todos os campos obrigatórios.",
        tipo: "erro",
      };
      return;
    }

    // Adicionar o usuário ao serviço de autenticação
    const novoUsuarioSistema = this.authService.addUser(
      this.novo.nome,
      this.novo.username,
      this.novo.senha,
      this.novo.role as "admin" | "editor"
    );

    if (novoUsuarioSistema) {
      // Recarregar a lista de usuários do sistema para mostrar o novo usuário adicionado
      this.carregarUsuariosSistema();

      // Limpar o formulário
      this.novo = {
        nome: "",
        email: "",
        username: "",
        senha: "",
        role: "editor",
      };

      // Mostrar mensagem de sucesso
      this.mensagem = {
        texto: "Usuário adicionado com sucesso!",
        tipo: "sucesso",
      };

      // Limpar a mensagem após 5 segundos
      setTimeout(() => {
        this.mensagem = null;
      }, 5000);
    } else {
      // Exibir mensagem de erro
      this.mensagem = {
        texto:
          "Não foi possível adicionar o usuário. Verifique se o nome de usuário já existe.",
        tipo: "erro",
      };
    }
  }

  remover(id: number) {
    // Não permitir remover o admin principal
    if (id === 1) {
      this.mensagem = {
        texto: "Não é permitido remover o usuário administrador principal.",
        tipo: "erro",
      };
      return;
    }

    // Remover do sistema de autenticação
    const removido = this.authService.removeUser(id);

    if (removido) {
      // Recarregar a lista após a remoção
      this.carregarUsuariosSistema();

      // Feedback para o usuário
      this.mensagem = {
        texto: "Usuário removido com sucesso!",
        tipo: "sucesso",
      };

      // Limpar a mensagem após 5 segundos
      setTimeout(() => {
        this.mensagem = null;
      }, 5000);
    } else {
      // Se não foi possível remover
      this.mensagem = {
        texto: "Não foi possível remover o usuário.",
        tipo: "erro",
      };
    }
  }

  // Sugerir um nome de usuário com base no email
  sugerirUsername() {
    if (this.novo.email && !this.novo.username) {
      const emailParts = this.novo.email.split("@");
      if (emailParts.length > 0) {
        this.novo.username = emailParts[0];
      }
    }
  }

  toggleDashboard() {
    this.mostrarDashboard = !this.mostrarDashboard;
  }
}
