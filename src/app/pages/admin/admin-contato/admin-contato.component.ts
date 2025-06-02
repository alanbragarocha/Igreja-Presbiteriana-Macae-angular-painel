import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { DataService, Contato } from "../../../services/data.service";

@Component({
  selector: "app-admin-contato",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./admin-contato.component.html",
  styleUrls: ["./admin-contato.component.scss"],
})
export class AdminContatoComponent implements OnInit {
  contatoForm!: FormGroup;
  redesForm!: FormGroup;

  isSavingContato = false;
  isSavingRedes = false;
  saveSuccessContato = false;
  saveSuccessRedes = false;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Carregar dados de contato
    this.dataService.contato$.subscribe((contato) => {
      this.inicializarFormularios(contato);
    });
  }

  inicializarFormularios(contato: Contato): void {
    // Formulário para informações básicas de contato
    this.contatoForm = this.formBuilder.group({
      endereco: [contato.endereco, Validators.required],
      telefone: [contato.telefone, Validators.required],
      email: [contato.email, [Validators.required, Validators.email]],
    });

    // Formulário para redes sociais
    this.redesForm = this.formBuilder.group({
      facebook: [contato.redesSociais.facebook, Validators.required],
      instagram: [contato.redesSociais.instagram, Validators.required],
      youtube: [contato.redesSociais.youtube, Validators.required],
      whatsapp: [contato.redesSociais.whatsapp, Validators.required],
    });
  }

  salvarInfoContato(): void {
    if (this.contatoForm.invalid) {
      return;
    }

    this.isSavingContato = true;
    this.saveSuccessContato = false;

    // Salvar informações básicas de contato
    const dadosContato = this.contatoForm.value;

    // Obter o valor atual do contato
    this.dataService.contato$
      .subscribe((contato) => {
        const contatoAtualizado: Contato = {
          ...contato,
          endereco: dadosContato.endereco,
          telefone: dadosContato.telefone,
          email: dadosContato.email,
        };

        // Atualizar o contato
        this.dataService.atualizarContato(contatoAtualizado);

        // Feedback visual
        setTimeout(() => {
          this.isSavingContato = false;
          this.saveSuccessContato = true;

          setTimeout(() => {
            this.saveSuccessContato = false;
          }, 3000);
        }, 800);
      })
      .unsubscribe(); // Garantir que inscrição seja executada apenas uma vez
  }

  salvarRedesSociais(): void {
    if (this.redesForm.invalid) {
      return;
    }

    this.isSavingRedes = true;
    this.saveSuccessRedes = false;

    // Salvar informações de redes sociais
    const dadosRedes = this.redesForm.value;

    // Obter o valor atual do contato
    this.dataService.contato$
      .subscribe((contato) => {
        const contatoAtualizado: Contato = {
          ...contato,
          redesSociais: {
            facebook: dadosRedes.facebook,
            instagram: dadosRedes.instagram,
            youtube: dadosRedes.youtube,
            whatsapp: dadosRedes.whatsapp,
          },
        };

        // Atualizar o contato
        this.dataService.atualizarContato(contatoAtualizado);

        // Feedback visual
        setTimeout(() => {
          this.isSavingRedes = false;
          this.saveSuccessRedes = true;

          setTimeout(() => {
            this.saveSuccessRedes = false;
          }, 3000);
        }, 800);
      })
      .unsubscribe(); // Garantir que inscrição seja executada apenas uma vez
  }
}
