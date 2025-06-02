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

interface Principio {
  titulo: string;
  descricao: string;
}

interface Curiosidade {
  title: string;
  description: string;
}

@Component({
  selector: "app-lutero",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./lutero.component.html",
  styleUrls: ["./lutero.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuteroComponent implements OnInit {
  // CMS - Sistema de gerenciamento de conteúdo
  cms: { [key: string]: string } = {
    "lutero-0": "",
    "lutero-1": "Martinho Lutero",
    "lutero-2": "O monge que mudou a história da igreja cristã",
    "lutero-3": "",
    "lutero-4": "Biografia",
    "lutero-5":
      "Martinho Lutero (10 de novembro de 1483 – 18 de fevereiro de 1546) foi um professor alemão de teologia, compositor, padre, monge e uma figura seminal na Reforma Protestante. Lutero desafiou o ensino da Igreja Católica Romana sobre a natureza da penitência, a autoridade do papa e a utilidade das indulgências.",
    "lutero-6":
      "Em 31 de outubro de 1517, Lutero pregou suas famosas 95 Teses na porta da Igreja do Castelo de Wittenberg, desafiando o sistema de indulgências da igreja. Este evento é amplamente considerado como o catalisador da Reforma Protestante.",
    "lutero-7":
      "Sua tradução da Bíblia para o alemão teve um impacto profundo na igreja e na cultura alemã, ajudando a padronizar o idioma alemão e influenciando o desenvolvimento de novos campos acadêmicos. Lutero também compôs hinos, incluindo 'Uma Fortaleza Segura É Nosso Deus', e deixou um legado duradouro que transformou o cristianismo e a sociedade ocidental.",
    "lutero-8": "",
    "lutero-9": "Cronologia",
    "lutero-10": "Os eventos mais importantes da vida de Martinho Lutero",
    "lutero-11": "",
    "lutero-12": "Wartburg: O Refúgio de Lutero",
    "lutero-13":
      "Local histórico onde Lutero realizou um de seus trabalhos mais importantes",
    "lutero-14": "O Castelo de Wartburg",
    "lutero-15":
      "Após ser excomungado pelo Papa e declarado fora-da-lei pelo Imperador Carlos V na Dieta de Worms em 1521, Lutero foi sequestrado por ordem de seu protetor, o príncipe Frederico da Saxônia, e escondido no Castelo de Wartburg.",
    "lutero-16":
      "Durante seu refúgio em Wartburg, de maio de 1521 a março de 1522, Lutero traduziu o Novo Testamento do grego para o alemão em apenas 11 semanas, um feito extraordinário que teve um impacto profundo na disseminação da Reforma.",
    "lutero-17":
      "Hoje, o Castelo de Wartburg é um Patrimônio Mundial da UNESCO e um local de peregrinação para protestantes do mundo inteiro, que visitam o quarto onde Lutero trabalhou e onde, segundo a tradição, ele teria arremessado um tinteiro contra o diabo.",
    "lutero-18": "",
    "lutero-19": "Legado Teológico",
    "lutero-20":
      "As principais contribuições teológicas de Lutero que influenciam o cristianismo até hoje",
    "lutero-21": "",
    "lutero-22":
      "A menos que eu seja convencido por testemunho das Escrituras ou por razão evidente, não posso e não vou retratar-me de nada, pois não é seguro nem honesto agir contra a consciência. Aqui estou, não posso fazer diferente. Que Deus me ajude. Amém.",
    "lutero-23": "Martinho Lutero, Dieta de Worms, 1521",
    "lutero-24": "",
    "lutero-25": "Os Princípios da Reforma",
    "lutero-26": "Os fundamentos teológicos defendidos por Lutero",
    "lutero-27": "",
    "lutero-28": "Curiosidades",
    "lutero-29": "Fatos interessantes sobre Martinho Lutero",
    "lutero-30": "",
    "lutero-31":
      "Sola Scriptura, Sola Fide, Sola Gratia, Solus Christus, Soli Deo Gloria",
    "lutero-32":
      "Os cinco princípios da Reforma Protestante iniciada por Lutero que continuam a fundamentar a fé protestante até hoje.",
  };

  timelineEvents: TimelineEvent[] = [
    {
      year: "1483",
      title: "Nascimento",
      description:
        "Martinho Lutero nasce em 10 de novembro em Eisleben, Alemanha, filho de Hans e Margarethe Lutero.",
    },
    {
      year: "1505",
      title: "Entrada no Mosteiro",
      description:
        "Após quase ser atingido por um raio durante uma tempestade, Lutero abandona seus estudos de Direito e ingressa no mosteiro agostiniano.",
    },
    {
      year: "1507",
      title: "Ordenação Sacerdotal",
      description:
        "É ordenado sacerdote e celebra sua primeira missa, vivendo intensamente a espiritualidade monástica.",
    },
    {
      year: "1510",
      title: "Viagem a Roma",
      description:
        "Viaja a Roma a serviço de sua ordem e fica chocado com a corrupção e mundanidade do clero romano.",
    },
    {
      year: "1512",
      title: "Doutorado em Teologia",
      description:
        "Recebe o título de Doutor em Teologia e assume a cátedra de estudos bíblicos na Universidade de Wittenberg.",
    },
    {
      year: "1517",
      title: "As 95 Teses",
      description:
        "Em 31 de outubro, afixa suas 95 teses na porta da Igreja do Castelo de Wittenberg, contestando a venda de indulgências e práticas da igreja.",
    },
    {
      year: "1521",
      title: "Dieta de Worms",
      description:
        'Convocado pelo imperador Carlos V, Lutero se recusa a retratar-se diante da Dieta (assembleia) de Worms, com a famosa declaração: "Aqui estou. Não posso fazer diferente. Que Deus me ajude."',
    },
    {
      year: "1521-1522",
      title: "Castelo de Wartburg",
      description:
        "Escondido no Castelo de Wartburg sob proteção do príncipe Frederico da Saxônia, traduz o Novo Testamento para o alemão.",
    },
    {
      year: "1525",
      title: "Casamento",
      description:
        "Casa-se com Katharina von Bora, uma ex-freira, com quem teve seis filhos.",
    },
    {
      year: "1529",
      title: "Catecismos",
      description:
        "Publica os Catecismos Maior e Menor, documentos fundamentais para a educação religiosa protestante.",
    },
    {
      year: "1530",
      title: "Confissão de Augsburgo",
      description:
        "Philipp Melanchthon apresenta a Confissão de Augsburgo, documento que sistematiza a teologia luterana.",
    },
    {
      year: "1546",
      title: "Falecimento",
      description:
        "Morre em 18 de fevereiro em Eisleben, sua cidade natal, aos 62 anos.",
    },
  ];

  legados: Legado[] = [
    {
      icon: "fas fa-book",
      title: "Tradução da Bíblia",
      description:
        "Sua tradução da Bíblia para o alemão não só tornou as Escrituras acessíveis ao povo comum como também padronizou o idioma alemão moderno.",
    },
    {
      icon: "fas fa-music",
      title: "Hinologia",
      description:
        'Revolucionou a música sacra, compondo hinos em alemão para participação congregacional, incluindo "Castelo Forte é Nosso Deus".',
    },
    {
      icon: "fas fa-church",
      title: "Renovação da Igreja",
      description:
        "Reformulou a liturgia e a prática eclesiástica, enfatizando a pregação da Palavra e a participação dos leigos.",
    },
    {
      icon: "fas fa-graduation-cap",
      title: "Educação Popular",
      description:
        "Defendeu a educação universal, incluindo meninas, e a alfabetização para que todos pudessem ler a Bíblia.",
    },
  ];

  principios: Principio[] = [
    {
      titulo: "Sola Scriptura (Somente a Escritura)",
      descricao:
        "A Bíblia é a única autoridade infalível para fé e prática, superior à tradição e ao magistério eclesiástico.",
    },
    {
      titulo: "Sola Fide (Somente a Fé)",
      descricao:
        "A justificação diante de Deus acontece unicamente pela fé em Cristo, não por obras ou méritos humanos.",
    },
    {
      titulo: "Sola Gratia (Somente a Graça)",
      descricao:
        "A salvação é um dom gratuito de Deus, não algo que pode ser conquistado ou merecido.",
    },
    {
      titulo: "Solus Christus (Somente Cristo)",
      descricao:
        "Jesus Cristo é o único mediador entre Deus e os homens, não sendo necessários outros intercessores.",
    },
    {
      titulo: "Soli Deo Gloria (Somente a Deus a Glória)",
      descricao:
        "Todo o louvor e glória pertencem somente a Deus, não a santos, instituições ou tradições humanas.",
    },
  ];

  curiosidades: Curiosidade[] = [
    {
      title: "Lutero e o Tinteiro",
      description:
        "Conta-se que certa vez, quando Lutero estava estudando na Torre do Castelo de Wartburg, ele teria visto o diabo e atirado um tinteiro nele. Embora a veracidade dessa história seja questionável, até hoje guias turísticos mostram a suposta mancha de tinta na parede.",
    },
    {
      title: "Compositor de Hinos",
      description:
        'Além de reformador, Lutero era músico talentoso. Tocava alaúde e compôs cerca de 36 hinos, entre eles "Ein feste Burg ist unser Gott" (Um Castelo Forte é o Nosso Deus), considerado o hino da Reforma.',
    },
    {
      title: "Pai da Língua Alemã Moderna",
      description:
        "Sua tradução da Bíblia foi tão influente que é considerada a obra fundadora do alemão moderno padronizado, unificando diversos dialetos regionais.",
    },
    {
      title: "Casado com uma Ex-Freira",
      description:
        "Katharina von Bora, esposa de Lutero, era uma ex-freira que fugiu de seu convento em um barril de arenques junto com outras 11 freiras. Inicialmente, Lutero tentou encontrar maridos para todas elas antes de se casar com Katharina.",
    },
    {
      title: "Cervejeiro Caseiro",
      description:
        "Lutero apreciava cerveja (como era comum na época) e sua esposa Katharina administrava uma cervejaria caseira em sua residência, o que ajudava a sustentar a família e os muitos estudantes e visitantes que frequentavam sua casa.",
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
