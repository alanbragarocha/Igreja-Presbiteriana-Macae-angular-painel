import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DataService } from "../../../services/data.service";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-admin-pastor",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: "./admin-pastor.component.html",
  styleUrls: ["./admin-pastor.component.scss"],
})
export class AdminPastorComponent implements OnInit {
  pastorForm!: FormGroup;
  isSaving = false;
  saveSuccess = false;
  debugInfo: string = "";

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Inicialização do formulário com dados da página do pastor
    const pastorContent = this.dataService.obterConteudoPagina("pastor") || {};

    // Debug info
    console.log("Conteúdo recuperado para pastor:", pastorContent);
    this.debugInfo =
      "Conteúdo carregado: " + Object.keys(pastorContent).length + " campos";

    this.pastorForm = this.formBuilder.group({
      // Seção Principal
      "pastor-1": [
        pastorContent["pastor-1"] || "Nosso Pastor",
        Validators.required,
      ],
      "pastor-2": [
        pastorContent["pastor-2"] ||
          "Conheça o Rev. Marcelo Carnaval, pastor da Quarta Igreja Presbiteriana de Macaé",
        Validators.required,
      ],
      // Seção Trajetória Pastoral
      "pastor-4": [
        pastorContent["pastor-4"] || "Trajetória Pastoral",
        Validators.required,
      ],
      "pastor-5": [
        pastorContent["pastor-5"] ||
          "Rev. Marcelo Carnaval tem dedicado sua vida ao ministério pastoral há mais de 15 anos. Formado em Teologia pelo Seminário Presbiteriano do Sul, possui também mestrado em Teologia Pastoral.",
        Validators.required,
      ],
      // Seção Família
      "pastor-6": [pastorContent["pastor-6"] || "Família", Validators.required],
      "pastor-7": [
        pastorContent["pastor-7"] ||
          "É casado com Martha Morett, que é médica psiquiatra infantil. Eles têm quatro filhos: Ana Clara, Ana Luíza, Ana Alícia e Davi.",
        Validators.required,
      ],
      // Seção Ministério em Macaé
      "pastor-8": [
        pastorContent["pastor-8"] || "Ministério em Macaé",
        Validators.required,
      ],
      "pastor-9": [
        pastorContent["pastor-9"] ||
          "O pastor Marcelo está em Macaé desde 1996. Pastoreou a Segunda Igreja Presbiteriana de Macaé por onze anos, antes de fundar a Quarta IPM, há 14 anos.",
        Validators.required,
      ],
      // Seção Minha Família
      "pastor-11": [
        pastorContent["pastor-11"] || "Minha Família",
        Validators.required,
      ],
      "pastor-12": [
        pastorContent["pastor-12"] ||
          "Conheça um pouco mais da família do Rev. Marcelo",
        Validators.required,
      ],
      "pastor-13": [
        pastorContent["pastor-13"] ||
          "A família é o alicerce do ministério pastoral. Somos gratos a Deus pela unidade e pelo apoio mútuo em nossa caminhada.",
        Validators.required,
      ],
      "pastor-14": [
        pastorContent["pastor-14"] ||
          '"Quanto a mim e à minha casa, serviremos ao Senhor" (Josué 24:15)',
        Validators.required,
      ],
      // Seção Formação e Ministério
      "pastor-18": [
        pastorContent["pastor-18"] || "Formação e Ministério",
        Validators.required,
      ],
      "pastor-19": [
        pastorContent["pastor-19"] ||
          "Conheça a trajetória acadêmica e ministerial do Rev. Marcelo Carnaval",
        Validators.required,
      ],
      // Áreas de Atuação
      "pastor-33": [
        pastorContent["pastor-33"] || "Áreas de Atuação",
        Validators.required,
      ],
      "pastor-34": [
        pastorContent["pastor-34"] ||
          "Principais áreas de atuação ministerial do Rev. Marcelo",
        Validators.required,
      ],
      // Publicações e Estudos
      "pastor-46": [
        pastorContent["pastor-46"] || "Publicações e Estudos",
        Validators.required,
      ],
      "pastor-47": [
        pastorContent["pastor-47"] ||
          "Materiais e estudos desenvolvidos pelo Rev. Marcelo",
        Validators.required,
      ],
      // Gratidão
      "pastor-60": [
        pastorContent["pastor-60"] || "Gratidão",
        Validators.required,
      ],
      "pastor-61": [
        pastorContent["pastor-61"] ||
          "Sou grato a Deus pela oportunidade de servir à Sua igreja e ao povo de Macaé. Meu desejo é continuar sendo um instrumento nas mãos do Senhor para edificação do Seu reino.",
        Validators.required,
      ],
      "pastor-62": [
        pastorContent["pastor-62"] ||
          '"A graça do Senhor Jesus Cristo, e o amor de Deus, e a comunhão do Espírito Santo sejam com todos vós" - 2 Coríntios 13:13',
        Validators.required,
      ],
    });
  }

  onSubmit(): void {
    if (this.pastorForm.invalid) {
      return;
    }

    this.isSaving = true;
    this.saveSuccess = false;

    // Debug antes de salvar
    console.log("Valor do formulário antes de salvar:", this.pastorForm.value);

    // Salva os dados da página do pastor
    this.dataService.atualizarConteudoPagina("pastor", this.pastorForm.value);

    // Verificar se os dados foram salvos corretamente
    setTimeout(() => {
      const pastorContent = this.dataService.obterConteudoPagina("pastor");
      console.log("Conteúdo recuperado após salvar:", pastorContent);

      if (pastorContent) {
        const camposSalvos = Object.keys(pastorContent).length;
        this.debugInfo = `${camposSalvos} campos foram salvos com sucesso. As alterações já estão disponíveis no front-end!`;
      } else {
        this.debugInfo =
          "Nenhum campo foi salvo. Verifique o console para mais detalhes.";
      }

      this.isSaving = false;
      this.saveSuccess = true;

      // A mensagem de sucesso permanecerá visível por mais tempo
      setTimeout(() => {
        this.saveSuccess = false;
      }, 5000);
    }, 800);
  }
}
