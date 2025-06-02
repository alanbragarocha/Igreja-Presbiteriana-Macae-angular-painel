import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  DataService,
  DadosBancarios,
  DadosPix,
} from "../../../services/data.service";

@Component({
  selector: "app-admin-financeiro",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./admin-financeiro.component.html",
  styleUrls: ["./admin-financeiro.component.scss"],
})
export class AdminFinanceiroComponent implements OnInit {
  bancarioForm!: FormGroup;
  pixForm!: FormGroup;

  isSavingBancario = false;
  isSavingPix = false;
  saveSuccessBancario = false;
  saveSuccessPix = false;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Carregar dados bancários
    this.dataService.dadosBancarios$.subscribe((dados) => {
      this.inicializarFormularioBancario(dados);
    });

    // Carregar dados PIX
    this.dataService.dadosPix$.subscribe((dados) => {
      this.inicializarFormularioPix(dados);
    });
  }

  inicializarFormularioBancario(dados: DadosBancarios): void {
    this.bancarioForm = this.formBuilder.group({
      banco: [dados.banco, Validators.required],
      agencia: [dados.agencia, Validators.required],
      conta: [dados.conta, Validators.required],
      titular: [dados.titular, Validators.required],
      cnpj: [dados.cnpj, Validators.required],
    });
  }

  inicializarFormularioPix(dados: DadosPix): void {
    this.pixForm = this.formBuilder.group({
      chave: [dados.chave, Validators.required],
      tipo: [dados.tipo, Validators.required],
    });
  }

  salvarDadosBancarios(): void {
    if (this.bancarioForm.invalid) {
      return;
    }

    this.isSavingBancario = true;
    this.saveSuccessBancario = false;

    // Atualizar dados bancários
    const dadosBancarios: DadosBancarios = this.bancarioForm.value;
    this.dataService.atualizarDadosBancarios(dadosBancarios);

    // Feedback visual
    setTimeout(() => {
      this.isSavingBancario = false;
      this.saveSuccessBancario = true;

      setTimeout(() => {
        this.saveSuccessBancario = false;
      }, 3000);
    }, 800);
  }

  salvarDadosPix(): void {
    if (this.pixForm.invalid) {
      return;
    }

    this.isSavingPix = true;
    this.saveSuccessPix = false;

    // Atualizar dados PIX
    const dadosPix: DadosPix = this.pixForm.value;
    this.dataService.atualizarDadosPix(dadosPix);

    // Feedback visual
    setTimeout(() => {
      this.isSavingPix = false;
      this.saveSuccessPix = true;

      setTimeout(() => {
        this.saveSuccessPix = false;
      }, 3000);
    }, 800);
  }
}
