import { Component } from "@angular/core";

@Component({
  selector: "app-sidebar",
  imports: [],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent {
  // CMS - Sistema de gerenciamento de conteúdo
  cms: { [key: string]: string } = {
    "sidebar-0": "Menu Lateral",
    "sidebar-1": "Links Rápidos",
    "sidebar-2": "Eventos Próximos",
    "sidebar-3": "Redes Sociais",
    "sidebar-4": "Contato",
  };
}
