import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { delay, map, tap } from "rxjs/operators";

export interface User {
  id: number;
  username: string;
  name: string;
  role: "admin" | "editor";
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> =
    this.currentUserSubject.asObservable();

  // Simula um usuário válido para autenticação
  private validUsers = [
    {
      id: 1,
      username: "admin",
      password: "admin123",
      name: "Administrador",
      role: "admin" as const,
    },
    {
      id: 2,
      username: "editor",
      password: "editor123",
      name: "Editor",
      role: "editor" as const,
    },
  ];

  constructor() {
    // Carregar usuários salvos do localStorage (se existirem)
    this.loadUsersFromStorage();

    // Verifica se já há um usuário logado no localStorage
    this.loadUserFromStorage();
  }

  // Carrega os usuários armazenados no localStorage
  private loadUsersFromStorage(): void {
    const storedUsers = localStorage.getItem("validUsers");

    if (storedUsers) {
      try {
        const users = JSON.parse(storedUsers);

        // Verificar se temos um array de usuários válidos
        if (Array.isArray(users) && users.length > 0) {
          console.log(
            `AuthService: Carregados ${users.length} usuários do localStorage`
          );
          this.validUsers = users;
        }
      } catch (err) {
        console.error("Erro ao carregar usuários do localStorage:", err);
      }
    } else {
      // Se não há usuários armazenados, salvar os usuários padrão
      this.saveUsersToStorage();
    }
  }

  // Salva os usuários no localStorage
  private saveUsersToStorage(): void {
    localStorage.setItem("validUsers", JSON.stringify(this.validUsers));
    console.log(
      `AuthService: ${this.validUsers.length} usuários salvos no localStorage`
    );
  }

  // Carrega o usuário armazenado no localStorage
  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem("currentUser");
    const lastLogin = localStorage.getItem("lastLogin");

    console.log("AuthService: Verificando dados de sessão armazenados");

    // Verificar se existe uma sessão válida (30 minutos)
    const isSessionValid = lastLogin
      ? new Date().getTime() - new Date(lastLogin).getTime() < 30 * 60 * 1000
      : false;

    if (storedUser && isSessionValid) {
      try {
        const user = JSON.parse(storedUser);

        // Verificações adicionais de segurança para o usuário
        if (!user || !user.id || !user.username || !user.role) {
          throw new Error("Dados de usuário incompletos ou inválidos");
        }

        // Verificar se o usuário realmente existe em nossa base
        const userExists = this.validUsers.some(
          (u) => u.id === user.id && u.username === user.username
        );

        if (!userExists) {
          throw new Error("Usuário não encontrado na base de dados");
        }

        // Se todas as verificações passaram, carregar o usuário
        this.currentUserSubject.next(user);
        console.log(
          `Sessão válida encontrada, usuário ${user.username} carregado.`
        );

        // Atualizar o timestamp para renovar a sessão
        localStorage.setItem("lastLogin", new Date().toISOString());
      } catch (err) {
        console.log(
          "Erro ao carregar usuário do localStorage, realizando logout",
          err
        );
        localStorage.removeItem("currentUser");
        localStorage.removeItem("lastLogin");
        localStorage.removeItem("returnUrl");
        this.currentUserSubject.next(null);
      }
    } else if (storedUser && !isSessionValid) {
      // Sessão expirada
      console.log("Sessão expirada, realizando logout automático");
      this.logout();
    } else {
      console.log("Nenhuma sessão válida encontrada");
    }
  }

  // Método para realizar o login
  login(username: string, password: string): Observable<User | null> {
    console.log("AuthService: Tentativa de login para:", username);

    // Validação rigorosa para garantir que username e password sejam fornecidos e não sejam apenas espaços
    if (
      !username ||
      !password ||
      username.trim() === "" ||
      password.trim() === ""
    ) {
      console.log("AuthService: Login falhou - credenciais vazias");
      return of(null).pipe(delay(800));
    }

    // Busca o usuário pelo nome de usuário e senha (ambos devem corresponder exatamente)
    const user = this.validUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      console.log("AuthService: Usuário autenticado com sucesso:", username);

      // Remover a senha antes de armazenar o usuário
      const { password, ...userWithoutPassword } = user;

      // Simular um delay de rede
      return of(userWithoutPassword as User).pipe(
        delay(800),
        tap((user) => {
          this.currentUserSubject.next(user);
          localStorage.setItem("currentUser", JSON.stringify(user));
          // Registrar timestamp do login para auditoria
          localStorage.setItem("lastLogin", new Date().toISOString());
        })
      );
    } else {
      console.log("AuthService: Login falhou - credenciais inválidas");
      return of(null).pipe(delay(800));
    }
  }

  // Método para realizar logout
  logout(): void {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("lastLogin");
    localStorage.removeItem("returnUrl");
    this.currentUserSubject.next(null);
    console.log("AuthService: Logout realizado com sucesso");
  }

  // Método para forçar a exigência de nova autenticação ao sair da área admin
  forceReauthOnExit(): void {
    console.log(
      "AuthService: Forçando reautenticação ao sair da área administrativa"
    );
    this.logout();
  }

  // Verificar se o usuário está autenticado
  get isAuthenticated(): boolean {
    // Verificar se existe um usuário e também se a sessão é válida
    const storedUser = localStorage.getItem("currentUser");
    const lastLogin = localStorage.getItem("lastLogin");

    // Verificações básicas iniciais
    if (!storedUser || !lastLogin || !this.currentUserSubject.value) {
      console.log("Autenticação falhou: dados incompletos na sessão");
      return false;
    }

    try {
      // Verificar se o usuário armazenado é válido
      const user = JSON.parse(storedUser);
      if (!user || !user.id || !user.role) {
        console.log("Autenticação falhou: dados de usuário inválidos");
        return false;
      }

      // Verificar se a sessão não expirou (30 minutos)
      const loginTime = new Date(lastLogin).getTime();
      const currentTime = new Date().getTime();
      const sessionValid = currentTime - loginTime < 30 * 60 * 1000;

      if (!sessionValid) {
        console.log("Sessão expirada, realizando logout automático");
        // Limpar sessão expirada
        this.logout();
        return false;
      }

      // Verificação adicional: se o usuário armazenado corresponde ao usuário no subject
      if (user.id !== this.currentUserSubject.value.id) {
        console.log("Inconsistência entre dados da sessão e memória");
        this.logout();
        return false;
      }

      return true;
    } catch (err) {
      console.error("Erro ao verificar autenticação:", err);
      this.logout();
      return false;
    }
  }

  // Verificar se o usuário tem permissão de admin
  get isAdmin(): boolean {
    return (
      this.isAuthenticated && this.currentUserSubject.value?.role === "admin"
    );
  }

  // Obter o usuário atual
  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Verificar se um usuário tem uma sessão recente (nos últimos 30 minutos)
  get hasRecentSession(): boolean {
    const lastLogin = localStorage.getItem("lastLogin");
    if (lastLogin) {
      const loginTime = new Date(lastLogin).getTime();
      const currentTime = new Date().getTime();
      // Sessão é válida por 30 minutos
      return currentTime - loginTime < 30 * 60 * 1000;
    }
    return false;
  }

  // Retorna todos os usuários do sistema para o dashboard de administração
  getAllUsers(): User[] {
    // Remove a senha antes de retornar os usuários
    return this.validUsers.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword as User;
    });
  }

  // Adicionar um novo usuário ao sistema
  addUser(
    nome: string,
    username: string,
    password: string,
    role: "admin" | "editor"
  ): User | null {
    if (!nome || !username || !password || !role) {
      console.log(
        "AuthService: Falha ao adicionar usuário - dados incompletos"
      );
      return null;
    }

    // Verificar se o username já existe
    const usuarioExistente = this.validUsers.find(
      (u) => u.username === username
    );
    if (usuarioExistente) {
      console.log(
        "AuthService: Falha ao adicionar usuário - username já existe"
      );
      return null;
    }

    // Gerar novo ID (maior ID existente + 1)
    const newId = Math.max(...this.validUsers.map((u) => u.id)) + 1;

    // Criar novo usuário
    const novoUsuario = {
      id: newId,
      username: username,
      password: password,
      name: nome,
      role: role,
    };

    // Adicionar à lista de usuários válidos
    this.validUsers.push(novoUsuario);

    // Persistir os usuários no localStorage
    this.saveUsersToStorage();

    console.log(`AuthService: Usuário ${username} adicionado com sucesso`);

    // Retornar o usuário sem a senha
    const { password: _, ...userWithoutPassword } = novoUsuario;
    return userWithoutPassword as User;
  }

  // Remover um usuário do sistema
  removeUser(userId: number): boolean {
    const initialLength = this.validUsers.length;

    // Não permitir remover o usuário admin principal (id 1)
    if (userId === 1) {
      console.log(
        "AuthService: Não é permitido remover o usuário administrador principal"
      );
      return false;
    }

    // Filtrar para remover o usuário com o ID informado
    this.validUsers = this.validUsers.filter((user) => user.id !== userId);

    // Verificar se algum usuário foi removido
    if (this.validUsers.length < initialLength) {
      // Persistir as mudanças
      this.saveUsersToStorage();
      console.log(`AuthService: Usuário ID ${userId} removido com sucesso`);
      return true;
    }

    console.log(
      `AuthService: Usuário ID ${userId} não encontrado para remoção`
    );
    return false;
  }
}
