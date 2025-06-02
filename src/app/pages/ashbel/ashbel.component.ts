import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface Legado {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: "app-ashbel",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./ashbel.component.html",
  styleUrls: ["./ashbel.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AshbelComponent implements OnInit {
  // CMS - Sistema de gerenciamento de conteúdo
  cms: { [key: string]: string } = {
    "ashbel-0": "",
    "ashbel-1": "Ashbel Green Simonton",
    "ashbel-2": "O pioneiro do presbiterianismo no Brasil",
    "ashbel-3": "",
    "ashbel-4": "Biografia",
    "ashbel-5":
      "Ashbel Green Simonton (20 de janeiro de 1833 – 9 de dezembro de 1867) foi um missionário presbiteriano americano que introduziu o presbiterianismo no Brasil. Nascido na Pensilvânia, Simonton formou-se em Princeton e sentiu um chamado missionário para levar o evangelho ao Brasil.",
    "ashbel-6":
      "Chegou ao Brasil em 12 de agosto de 1859, e em menos de três meses já pregava em português. Organizou a Primeira Igreja Presbiteriana do Rio de Janeiro em 1862 e fundou o primeiro seminário presbiteriano no Brasil.",
    "ashbel-7":
      "Apesar de sua morte prematura aos 34 anos devido à febre amarela, seu legado foi duradouro. Ele lançou as bases para o crescimento do presbiterianismo no Brasil, que hoje é uma das maiores denominações protestantes no país.",
    "ashbel-8": "",
    "ashbel-9": "Cronologia",
    "ashbel-10":
      "Os eventos mais importantes da vida de Ashbel Green Simonton e seu impacto no Brasil",
    "ashbel-11": "",
    "ashbel-12":
      "Vim para o Brasil plantar a semente do Evangelho nesta nação promissora. Minha oração é que Deus permita que essa semente cresça e espalhe suas raízes por toda esta terra.",
    "ashbel-13": "Ashbel Green Simonton, em seu diário, 1860",
    "ashbel-14": "",
    "ashbel-15": "Legado",
    "ashbel-16":
      "A influência duradoura de Simonton no protestantismo brasileiro",
    "ashbel-17": "",
    "ashbel-18": "Desenvolvimento Denominacional",
    "ashbel-19":
      "A contribuição de Simonton para o desenvolvimento de diferentes ramos do presbiterianismo no Brasil",
    "ashbel-20": "Igreja Presbiteriana do Brasil (IPB)",
    "ashbel-21":
      "Maior denominação presbiteriana no Brasil, diretamente descendente do trabalho iniciado por Simonton em 1859. Atualmente possui mais de 5.000 igrejas em todo o território nacional.",
    "ashbel-22": "Igreja Presbiteriana Independente (IPI)",
    "ashbel-23":
      "Formada em 1903 após debates sobre questões eclesiásticas, mantém a teologia reformada e conta com centenas de congregações por todo o Brasil.",
    "ashbel-24": "Igreja Presbiteriana Unida (IPU)",
    "ashbel-25":
      "Surgida em 1978, caracteriza-se por uma abordagem mais ecumênica e progressista dentro da tradição reformada no Brasil.",
    "ashbel-26": "Outras Denominações Presbiterianas",
    "ashbel-27":
      "Várias outras denominações presbiterianas menores surgiram ao longo do tempo, todas reconhecendo a importância histórica do trabalho pioneiro de Simonton.",
    "ashbel-28": "",
    "ashbel-29": "Curiosidades",
    "ashbel-30":
      "Fatos interessantes sobre a vida e o ministério de Ashbel Green Simonton",
    "ashbel-31": "",
    "ashbel-32":
      "Sola Scriptura, Sola Fide, Sola Gratia, Solus Christus, Soli Deo Gloria",
    "ashbel-33":
      "Os cinco princípios da Reforma Protestante que guiaram o ministério de Simonton e continuam a fundamentar a fé presbiteriana no Brasil até hoje.",
  };

  timelineEvents: TimelineEvent[] = [
    {
      year: "1833",
      title: "Nascimento",
      description:
        "Ashbel Green Simonton nasce em 20 de janeiro na Pensilvânia, Estados Unidos, em uma família presbiteriana devota.",
    },
    {
      year: "1855",
      title: "Formação Princeton",
      description:
        "Gradua-se pelo College of New Jersey (atual Universidade de Princeton) e ingressa no Seminário Teológico de Princeton.",
    },
    {
      year: "1858",
      title: "Chamado Missionário",
      description:
        "Inspirado por uma pregação sobre missões, decide se dedicar ao trabalho missionário no exterior e se candidata à Junta de Missões.",
    },
    {
      year: "1859",
      title: "Chegada ao Brasil",
      description:
        "Em 12 de agosto, chega ao Rio de Janeiro como o primeiro missionário presbiteriano enviado ao Brasil pela Igreja Presbiteriana dos Estados Unidos.",
    },
    {
      year: "1860",
      title: "Primeiro Culto em Português",
      description:
        "Apenas um ano após sua chegada, realiza o primeiro culto em português em sua residência no Rio de Janeiro.",
    },
    {
      year: "1862",
      title: "Primeira Igreja Presbiteriana",
      description:
        "Organiza a Primeira Igreja Presbiteriana do Brasil no Rio de Janeiro, com três membros fundadores.",
    },
    {
      year: "1864",
      title: "Imprensa Evangélica",
      description:
        'Funda o jornal "Imprensa Evangélica", o primeiro periódico protestante do Brasil, importante instrumento de divulgação da fé reformada.',
    },
    {
      year: "1864",
      title: "Chegada de Reforços",
      description:
        "Recebe a ajuda de Alexander Latimer Blackford (seu cunhado) e de Francis Joseph Christopher Schneider, ampliando o trabalho missionário.",
    },
    {
      year: "1865",
      title: "Presbitério do Rio de Janeiro",
      description:
        "Estabelece o Presbitério do Rio de Janeiro, a primeira organização presbiterial no Brasil.",
    },
    {
      year: "1867",
      title: "Falecimento",
      description:
        "Morre em 9 de dezembro, aos 34 anos, vítima de febre amarela, após apenas oito anos de trabalho missionário no Brasil.",
    },
  ];

  legados: Legado[] = [
    {
      icon: "fas fa-church",
      title: "Implantação do Presbiterianismo",
      description:
        "Estabeleceu as bases para a denominação que viria a se tornar uma das principais igrejas evangélicas históricas do Brasil.",
    },
    {
      icon: "fas fa-book",
      title: "Literatura Evangélica",
      description:
        "Pioneiro na produção e distribuição de literatura protestante em português, contribuindo para a divulgação da fé reformada.",
    },
    {
      icon: "fas fa-graduation-cap",
      title: "Educação",
      description:
        "Iniciou a tradição presbiteriana de investimento na educação, que mais tarde resultou na fundação de escolas e universidades.",
    },
    {
      icon: "fas fa-hands-helping",
      title: "Formação de Líderes",
      description:
        "Treinou os primeiros pastores brasileiros, incluindo José Manoel da Conceição, ex-padre católico e primeiro pastor protestante brasileiro.",
    },
  ];

  curiosidades: string[] = [
    "Simonton aprendeu português em tempo recorde, conseguindo pregar em português apenas um ano após sua chegada.",
    "Manteve um diário detalhado que é uma fonte valiosa sobre os primórdios do protestantismo no Brasil.",
    "Foi um dos primeiros a traduzir hinos protestantes para o português brasileiro.",
    "Demonstrou grande respeito pela cultura brasileira, adaptando sua abordagem missionária ao contexto local.",
    "Era conhecido por seu caráter humilde e por sua disposição para trabalhar incansavelmente, apesar das dificuldades climáticas e culturais.",
  ];

  constructor() {}

  ngOnInit(): void {}
}
