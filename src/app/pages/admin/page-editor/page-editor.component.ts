import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  startWith,
} from "rxjs";
import { DataService } from "../../../services/data.service";

export interface EditableContent {
  slug: string;
  valor: string;
}

@Component({
  selector: "app-page-editor",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./page-editor.component.html",
  styleUrls: ["./page-editor.component.scss"],
})
export class PageEditorComponent implements OnInit {
  pageSlug!: string;
  pageTitle: string = "";
  busca$ = new BehaviorSubject<string>("");
  conteudos$ = new BehaviorSubject<EditableContent[]>([]);
  filtrados$ = combineLatest([
    this.conteudos$,
    this.busca$.pipe(debounceTime(200), startWith("")),
  ]).pipe(
    map(([lista, termo]) =>
      lista.filter(
        (it) =>
          it.slug.toLowerCase().includes(termo.toLowerCase()) ||
          it.valor.toLowerCase().includes(termo.toLowerCase())
      )
    )
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private data: DataService
  ) {}

  ngOnInit() {
    this.pageSlug = this.route.snapshot.paramMap.get("slug")!;

    // Definir título da página com base no slug
    switch (this.pageSlug) {
      case "home":
        this.pageTitle = "Página Inicial";
        break;
      case "sobre":
        this.pageTitle = "Sobre";
        break;
      case "pastor":
        this.pageTitle = "Pastoral";
        break;
      case "ashbel":
        this.pageTitle = "Ashbel";
        break;
      case "calvino":
        this.pageTitle = "Calvino";
        break;
      case "lutero":
        this.pageTitle = "Lutero";
        break;
      case "escalas":
        this.pageTitle = "Escalas";
        break;
      default:
        this.pageTitle = "Editor de Página";
    }

    const conteudo = this.data.obterConteudoPagina(this.pageSlug) || {};
    const lista = Object.keys(conteudo).map((k) => ({
      slug: k,
      valor: conteudo[k],
    }));
    this.conteudos$.next(lista);

    console.log(`Editando página: ${this.pageSlug}, conteúdo:`, conteudo);
  }

  salvar(item: EditableContent) {
    const obj: any = {};
    obj[item.slug] = item.valor;
    this.data.atualizarConteudoPagina(this.pageSlug, obj);
    console.log(`Item salvo: ${item.slug} da página ${this.pageSlug}`);

    // Fornecer feedback visual ao usuário
    alert(`Campo "${item.slug}" salvo com sucesso!`);
  }

  voltarParaListagem() {
    this.router.navigate(["/admin/paginas"]);
  }
}
