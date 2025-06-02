import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { DataService, Evento } from "../../../services/data.service";

@Component({
  selector: "app-admin-eventos",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./admin-eventos.component.html",
  styleUrls: ["./admin-eventos.component.scss"],
})
export class AdminEventosComponent implements OnInit {
  eventoForm!: FormGroup;
  eventos: Evento[] = [];
  modoEdicao = false;
  eventoEditandoId: number | null = null;

  isSaving = false;
  saveSuccess = false;
  saveError = false;

  tiposEvento = [
    { value: "culto", label: "Culto" },
    { value: "estudo", label: "Estudo" },
    { value: "especial", label: "Evento Especial" },
    { value: "outro", label: "Outro" },
  ];

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Inicializa o formulário
    this.inicializarFormulario();

    // Carrega os eventos existentes
    this.dataService.eventos$.subscribe((eventos) => {
      this.eventos = eventos;
    });
  }

  inicializarFormulario(evento?: Evento): void {
    this.eventoForm = this.formBuilder.group({
      titulo: [evento?.titulo || "", Validators.required],
      data: [evento?.data || "", Validators.required],
      hora: [evento?.hora || "", Validators.required],
      descricao: [evento?.descricao || "", Validators.required],
      tipo: [evento?.tipo || "culto", Validators.required],
      local: [
        evento?.local || "Igreja Presbiteriana de Macaé",
        Validators.required,
      ],
    });

    if (evento) {
      this.modoEdicao = true;
      this.eventoEditandoId = evento.id;
    } else {
      this.modoEdicao = false;
      this.eventoEditandoId = null;
    }
  }

  onSubmit(): void {
    if (this.eventoForm.invalid) {
      return;
    }

    this.isSaving = true;
    this.saveSuccess = false;
    this.saveError = false;

    const eventoData = this.eventoForm.value;

    try {
      if (this.modoEdicao && this.eventoEditandoId) {
        // Atualizar evento existente
        this.dataService.atualizarEvento(this.eventoEditandoId, eventoData);
      } else {
        // Adicionar novo evento
        this.dataService.adicionarEvento(eventoData);
      }

      // Resetar formulário e mostrar mensagem de sucesso
      setTimeout(() => {
        this.isSaving = false;
        this.saveSuccess = true;
        this.inicializarFormulario();

        // Esconder mensagem após 3 segundos
        setTimeout(() => {
          this.saveSuccess = false;
        }, 3000);
      }, 800);
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
      this.isSaving = false;
      this.saveError = true;

      // Esconder mensagem de erro após 3 segundos
      setTimeout(() => {
        this.saveError = false;
      }, 3000);
    }
  }

  editarEvento(evento: Evento): void {
    this.inicializarFormulario(evento);

    // Rola a tela para o topo para ver o formulário
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  cancelarEdicao(): void {
    this.inicializarFormulario();
  }

  removerEvento(id: number): void {
    if (confirm("Tem certeza que deseja excluir este evento?")) {
      this.dataService.removerEvento(id);

      // Se estava editando este evento, limpa o formulário
      if (this.eventoEditandoId === id) {
        this.inicializarFormulario();
      }
    }
  }

  // Formata data para exibição
  formatarData(dataString: string): string {
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR");
  }
}
