import { Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./pages/home/home.component").then((m) => m.HomeComponent),
    title: "Igreja Presbiteriana de Macaé",
  },
  {
    path: "login",
    loadComponent: () =>
      import("./pages/login/login.component").then((m) => m.LoginComponent),
    title: "Login - Igreja Presbiteriana de Macaé",
  },
  {
    path: "admin",
    loadComponent: () =>
      import("./pages/admin/admin.component").then((m) => m.AdminComponent),
    canActivate: [AuthGuard],
    title: "Painel Administrativo - Igreja Presbiteriana de Macaé",
    children: [
      {
        path: "",
        loadComponent: () =>
          import(
            "./pages/admin/admin-dashboard/admin-dashboard.component"
          ).then((m) => m.AdminDashboardComponent),
      },
      {
        path: "eventos",
        loadComponent: () =>
          import("./pages/admin/admin-eventos/admin-eventos.component").then(
            (m) => m.AdminEventosComponent
          ),
      },
      {
        path: "contato",
        loadComponent: () =>
          import("./pages/admin/admin-contato/admin-contato.component").then(
            (m) => m.AdminContatoComponent
          ),
      },
      {
        path: "financeiro",
        loadComponent: () =>
          import(
            "./pages/admin/admin-financeiro/admin-financeiro.component"
          ).then((m) => m.AdminFinanceiroComponent),
      },
      {
        path: "paginas",
        loadComponent: () =>
          import("./pages/admin/admin-paginas/admin-paginas.component").then(
            (m) => m.AdminPaginasComponent
          ),
      },

      {
        path: "paginas/:slug",
        loadComponent: () =>
          import("./pages/admin/page-editor/page-editor.component").then(
            (m) => m.PageEditorComponent
          ),
      },
      {
        path: "pastor",
        loadComponent: () =>
          import("./pages/admin/admin-pastor/admin-pastor.component").then(
            (m) => m.AdminPastorComponent
          ),
      },
      {
        path: "usuarios",
        loadComponent: () =>
          import("./pages/admin/admin-usuarios/admin-usuarios.component").then(
            (m) => m.AdminUsuariosComponent
          ),
      },
    ],
  },
  {
    path: "sobre",
    loadComponent: () =>
      import("./pages/sobre/sobre.component").then((m) => m.SobreComponent),
    title: "Sobre - Igreja Presbiteriana de Macaé",
  },
  {
    path: "pastor",
    loadComponent: () =>
      import("./pages/pastor/pastor.component").then((m) => m.PastorComponent),
    title: "Pastor - Igreja Presbiteriana de Macaé",
  },
  {
    path: "escalas",
    loadComponent: () =>
      import("./pages/escalas/escalas.component").then(
        (m) => m.EscalasComponent
      ),
    title: "Escalas - Igreja Presbiteriana de Macaé",
  },
  {
    path: "lutero",
    loadComponent: () =>
      import("./pages/lutero/lutero.component").then((m) => m.LuteroComponent),
    title: "Martinho Lutero - Igreja Presbiteriana de Macaé",
  },
  {
    path: "calvino",
    loadComponent: () =>
      import("./pages/calvino/calvino.component").then(
        (m) => m.CalvinoComponent
      ),
    title: "João Calvino - Igreja Presbiteriana de Macaé",
  },
  {
    path: "ashbel",
    loadComponent: () =>
      import("./pages/ashbel/ashbel.component").then((m) => m.AshbelComponent),
    title: "Ashbel Green Simonton - Igreja Presbiteriana de Macaé",
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full",
  },
];
