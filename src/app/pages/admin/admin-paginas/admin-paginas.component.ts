import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { DataService } from "../../../services/data.service";

export interface Page {
  slug: string;
  titulo: string;
}

@Component({
  selector: "app-admin-paginas",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: "./admin-paginas.component.html",
  styleUrls: ["./admin-paginas.component.scss"],
})
export class AdminPaginasComponent implements OnInit {
  pages: Page[] = [
    { slug: "home", titulo: "Página Inicial" },
    { slug: "sobre", titulo: "Sobre" },
    { slug: "pastor", titulo: "Pastoral" },
    { slug: "ashbel", titulo: "Ashbel" },
    { slug: "calvino", titulo: "Calvino" },
    { slug: "lutero", titulo: "Lutero" },
    { slug: "escalas", titulo: "Escalas" },
  ];

  constructor(public router: Router, private dataService: DataService) {}

  ngOnInit(): void {}

  // Método para navegar para a página de edição
  navegarParaEditor(slug: string): void {
    this.router.navigate(["/admin/paginas", slug]);
  }
}
