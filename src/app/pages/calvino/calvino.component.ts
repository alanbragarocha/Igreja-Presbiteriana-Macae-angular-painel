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

interface Denominacao {
  name: string;
  description: string;
}

interface Curiosidade {
  title: string;
  description: string;
}

@Component({
  selector: "app-calvino",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./calvino.component.html",
  styleUrls: ["./calvino.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalvinoComponent implements OnInit {
  // CMS - Sistema de gerenciamento de conteúdo
  cms: { [key: string]: string } = {
    "calvino-0": "",
    "calvino-1": "João Calvino",
    "calvino-2": "Teólogo e reformador protestante da Suíça",
    "calvino-3": "",
    "calvino-4": "Biografia",
    "calvino-5":
      "João Calvino (10 de julho de 1509 – 27 de maio de 1564) foi um teólogo cristão francês, pastor e reformador em Genebra durante a Reforma Protestante. Originalmente formado como humanista jurista, ele se converteu ao protestantismo e fugiu da perseguição católica na França, refugiando-se na Suíça.",
    "calvino-6":
      "É mais conhecido por sua obra 'As Institutas da Religião Cristã', publicada pela primeira vez em 1536, e pelo desenvolvimento de um sistema teológico posteriormente denominado calvinismo, que enfatiza a soberania de Deus na salvação.",
    "calvino-7":
      "Sua influência se estendeu além da teologia, abrangendo também áreas como política, economia e educação. O sistema presbiteriano de governo eclesiástico tem suas raízes nas práticas estabelecidas por Calvino em Genebra.",
    "calvino-8": "",
    "calvino-9": "Cronologia",
    "calvino-10": "Os eventos mais importantes da vida de João Calvino",
    "calvino-11": "",
    "calvino-12": "Genebra: A Cidade de Calvino",
    "calvino-13": "Como Genebra se transformou sob a influência do reformador",
    "calvino-14": "A Transformação de Genebra",
    "calvino-15":
      "Quando Calvino chegou a Genebra em 1536, a cidade já havia abraçado a Reforma, mas estava em um estado de desordem considerável. Sob sua liderança, Genebra experimentou transformações significativas.",
    "calvino-16":
      "Ele estabeleceu um consistório eclesiástico para supervisionar a disciplina moral, fundou a Academia de Genebra (hoje Universidade de Genebra) para treinar pastores, e implementou reformas sociais que incluíam assistência aos pobres e refugiados religiosos.",
    "calvino-17":
      "Genebra tornou-se um modelo de cidade protestante e um refúgio para protestantes perseguidos de toda a Europa. Os historiadores frequentemente se referem a ela como a 'Roma Protestante' durante este período.",
    "calvino-18": "",
    "calvino-19": "Legado Teológico",
    "calvino-20":
      "As principais contribuições teológicas de Calvino que influenciam o cristianismo até hoje",
    "calvino-21": "",
    "calvino-22":
      "O conhecimento de Deus e o de nós mesmos estão interligados; de fato, é difícil determinar qual deles precede o outro e dá origem ao outro.",
    "calvino-23":
      "João Calvino, Institutas da Religião Cristã, Livro I, Capítulo 1",
    "calvino-24": "",
    "calvino-25": "Denominações Calvinistas",
    "calvino-26":
      "Igrejas ao redor do mundo influenciadas pelo pensamento de Calvino",
    "calvino-27": "",
    "calvino-28": "Curiosidades",
    "calvino-29": "Fatos interessantes sobre João Calvino que poucos conhecem",
    "calvino-30": "",
    "calvino-31":
      "Sola Scriptura, Sola Fide, Sola Gratia, Solus Christus, Soli Deo Gloria",
    "calvino-32":
      "Os cinco princípios da Reforma Protestante que guiaram o trabalho teológico de João Calvino e continuam centrais para as igrejas reformadas.",
  };

  timelineEvents: TimelineEvent[] = [
    {
      year: "1509",
      title: "Nascimento",
      description:
        "João Calvino nasce em 10 de julho em Noyon, França, filho de Gérard Cauvin, um secretário episcopal.",
    },
    {
      year: "1523",
      title: "Educação em Paris",
      description:
        "Aos 14 anos, Calvino vai para Paris estudar humanidades e direito na Universidade.",
    },
    {
      year: "1533",
      title: "Conversão",
      description:
        'Calvino experimenta uma "conversão súbita", abandonando o catolicismo romano para abraçar a fé reformada.',
    },
    {
      year: "1536",
      title: "Institutas da Religião Cristã",
      description:
        "Publica a primeira edição das Institutas, sua obra-prima teológica, aos 27 anos de idade.",
    },
    {
      year: "1536",
      title: "Chegada a Genebra",
      description:
        "Guillaume Farel convence Calvino a ficar em Genebra para ajudar na reforma da cidade.",
    },
    {
      year: "1538",
      title: "Exílio em Estrasburgo",
      description:
        "Expulso de Genebra, Calvino parte para Estrasburgo onde serve como pastor da igreja francesa.",
    },
    {
      year: "1541",
      title: "Retorno a Genebra",
      description:
        "Convidado a retornar a Genebra, Calvino implementa reformas eclesiásticas e sociais na cidade.",
    },
    {
      year: "1559",
      title: "Academia de Genebra",
      description:
        "Funda a Academia de Genebra, que mais tarde se tornaria a Universidade de Genebra.",
    },
    {
      year: "1564",
      title: "Falecimento",
      description:
        "Morre em 27 de maio em Genebra, aos 54 anos, deixando um legado teológico e eclesiástico duradouro.",
    },
  ];

  legados: Legado[] = [
    {
      icon: "fas fa-book",
      title: "Teologia Sistemática",
      description:
        "Desenvolveu uma abordagem sistemática e coerente para a teologia cristã, expressa nas Institutas.",
    },
    {
      icon: "fas fa-church",
      title: "Governo Eclesiástico",
      description:
        "Estabeleceu o sistema presbiteriano de governo da igreja, baseado em conselhos de presbíteros.",
    },
    {
      icon: "fas fa-university",
      title: "Educação",
      description:
        "Promoveu a educação teológica e fundou a Academia de Genebra, modelo para muitas universidades.",
    },
    {
      icon: "fas fa-balance-scale",
      title: "Ética Social",
      description:
        "Influenciou o desenvolvimento de sistemas políticos democráticos e a ética do trabalho.",
    },
  ];

  denominacoes: Denominacao[] = [
    {
      name: "Igreja Presbiteriana",
      description:
        "Adota o sistema de governo presbiteriano e enfatiza a soberania de Deus e a autoridade das Escrituras.",
    },
    {
      name: "Igreja Reformada",
      description:
        "Segue diretamente a tradição calvinista europeia, especialmente na Holanda, Suíça e França.",
    },
    {
      name: "Igreja Congregacional",
      description:
        "Incorpora elementos da teologia calvinista com ênfase na autonomia das congregações locais.",
    },
    {
      name: "Igreja Batista Reformada",
      description:
        "Combina princípios batistas com a teologia reformada calvinista.",
    },
    {
      name: "Igreja Reformada Presbiteriana",
      description:
        "Mantém uma adesão estrita aos princípios calvinistas e aos padrões de Westminster.",
    },
  ];

  curiosidades: Curiosidade[] = [
    {
      title: "Formação em Direito",
      description:
        "Antes de se tornar teólogo, Calvino estudou direito e era um humanista educado, o que influenciou sua abordagem metodológica e sistemática da teologia.",
    },
    {
      title: "Produção Literária",
      description:
        "Além das Institutas, escreveu comentários sobre quase todos os livros da Bíblia, tratados teológicos e milhares de cartas.",
    },
    {
      title: "Rotina Diária",
      description:
        "Em Genebra, Calvino tinha uma rotina disciplinada: pregava e lecionava diariamente, escrevia, aconselhava e recebia refugiados protestantes de toda a Europa.",
    },
    {
      title: "Embaixadores da Fé",
      description:
        "De Genebra, enviou centenas de pastores treinados para estabelecer igrejas reformadas por toda a Europa, incluindo França, Itália, Escócia e Países Baixos.",
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
