import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-sobre",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./sobre.component.html",
  styleUrls: ["./sobre.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SobreComponent implements OnInit {
  // CMS - Sistema de gerenciamento de conteúdo
  cms: { [key: string]: string } = {
    "sobre-0": "",
    "sobre-1": "Sobre Nossa Igreja",
    "sobre-2":
      "Conheça mais sobre a Quarta Igreja Presbiteriana de Macaé, sua história, visão e compromissos",
    "sobre-3": "",
    "sobre-4": "Nossa História",
    "sobre-5":
      "A Quarta Igreja Presbiteriana de Macaé foi fundada em 1985, fruto da visão missionária da Primeira Igreja Presbiteriana de Macaé. Inicialmente, começou como um pequeno grupo de estudos bíblicos em residências, reunindo famílias presbiterianas da região Norte da cidade.",
    "sobre-6":
      "Com o crescimento da comunidade e a benção de Deus sobre o trabalho, em 1992 foi adquirido o terreno onde hoje se encontra o templo. A construção do primeiro salão foi concluída em 1994, marcando o início de uma nova fase para a congregação.",
    "sobre-7":
      "Em 1999, a congregação foi oficialmente organizada como igreja pelo Presbitério Norte Fluminense, consolidando sua autonomia eclesiástica e administrativa. Desde então, a igreja tem crescido em número de membros e em projetos missionários, sempre focada na expansão do Reino de Deus na cidade de Macaé.",
    "sobre-8": "",
    "sobre-9": "Nossa Trajetória de Crescimento",
    "sobre-10":
      "Acompanhe os principais marcos da história da nossa igreja ao longo dos anos",
    "sobre-11": "Primeiros Estudos Bíblicos",
    "sobre-12": "1985",
    "sobre-13":
      "Início dos estudos bíblicos em residências, sob orientação da Primeira Igreja Presbiteriana de Macaé.",
    "sobre-14": "Congregação Oficial",
    "sobre-15": "1988",
    "sobre-16":
      "Estabelecimento oficial como congregação presbiteriana, com cultos regulares aos domingos.",
    "sobre-17": "Aquisição do Terreno",
    "sobre-18": "1992",
    "sobre-19":
      "Compra do terreno onde hoje está construído o templo da igreja.",
    "sobre-20": "Primeiro Salão",
    "sobre-21": "1994",
    "sobre-22":
      "Construção e inauguração do primeiro salão de cultos da congregação.",
    "sobre-23": "Departamentos",
    "sobre-24": "1997",
    "sobre-25":
      "Criação dos principais departamentos internos: Escola Dominical, UPH, SAF, UMP e UPA.",
    "sobre-26": "Organização da Igreja",
    "sobre-27": "1999",
    "sobre-28":
      "Elevação à categoria de Igreja pelo Presbitério Norte Fluminense, com autonomia eclesiástica.",
    "sobre-29": "Ampliação do Ministério",
    "sobre-30": "2005-Presente",
    "sobre-31":
      "Expansão dos trabalhos missionários, projetos sociais e evangelísticos na cidade de Macaé.",
    "sobre-32": "",
    "sobre-33": "Nossos Princípios",
    "sobre-34": "As cinco colunas que guiam nossa fé e prática",
    "sobre-35": "Sola Scriptura",
    "sobre-36":
      "Somente as Escrituras são nossa autoridade final em matéria de fé e prática. Cremos na Bíblia como Palavra inspirada e inerrante de Deus.",
    "sobre-37": "Sola Gratia",
    "sobre-38":
      "A salvação vem somente pela graça de Deus, como um dom imerecido, e não por obras ou méritos humanos.",
    "sobre-39": "Sola Fide",
    "sobre-40":
      "A justificação diante de Deus é somente pela fé em Jesus Cristo, não por obras ou sacramentos.",
    "sobre-41": "Solus Christus",
    "sobre-42":
      "Somente Cristo é o mediador entre Deus e os homens, e somente através dele temos acesso ao Pai.",
    "sobre-43": "Soli Deo Gloria",
    "sobre-44":
      "Todo o nosso viver deve ser para a glória de Deus apenas, e não para a glória ou exaltação humana.",
    "sobre-45": "",
    "sobre-46": "Nossa Visão e Propósito",
    "sobre-47": "O que buscamos como igreja e comunidade de fé",
    "sobre-48": "Nossa Missão",
    "sobre-49": "Propósito: ",
    "sobre-50":
      "Glorificar a Deus através da adoração, do discipulado e do serviço ao próximo.",
    "sobre-51": "Visão: ",
    "sobre-52":
      "Ser uma comunidade que reflete o caráter de Cristo, transformando vidas através do Evangelho.",
    "sobre-53": "Valores: ",
    "sobre-54":
      "Fidelidade bíblica, compromisso com a oração, excelência no serviço a Deus e amor ao próximo.",
    "sobre-55": "Compartilhar o Evangelho de Jesus Cristo com todos.",
    "sobre-56":
      "Discipular crentes para uma vida cristã autêntica e frutífera.",
    "sobre-57":
      "Servir à comunidade local através de ações sociais e projetos educativos.",
    "sobre-58": "Nossos Campos de Atuação",
    "sobre-59":
      "Cultos de adoração que glorificam a Deus e edificam os crentes.",
    "sobre-60":
      "Escola Dominical para todas as idades, com ensino bíblico sólido.",
    "sobre-61": "Grupos familiares para comunhão e crescimento espiritual.",
    "sobre-62": "Projetos missionários locais, nacionais e internacionais.",
    "sobre-63": "Programas de assistência social para a comunidade.",
    "sobre-64": "Eventos evangelísticos e de edificação para toda a igreja.",
    "sobre-65": "",
    "sobre-66": "Nossa Liderança",
    "sobre-67": "Conheça aqueles que servem e guiam nossa comunidade",
    "sobre-68": "Pastor",
    "sobre-69":
      "Nossa igreja é pastoreada pelo Rev. Marcelo Carnaval, graduado em Teologia pelo Seminário Presbiteriano do Sul, com mestrado em Teologia Sistemática. Ele serve como pastor desde 2010, com um ministério focado no ensino bíblico e no cuidado pastoral.",
    "sobre-70": "Presbíteros",
    "sobre-71":
      "O Conselho da Igreja é formado por presbíteros eleitos pela assembleia, homens comprometidos com a visão da igreja e que auxiliam no governo eclesiástico e no cuidado espiritual dos membros.",
    "sobre-72": "Diáconos",
    "sobre-73":
      "Nossa Junta Diaconal é composta por diáconos dedicados ao serviço prático, administração dos recursos e assistência às necessidades da congregação e da comunidade.",
    "sobre-74": "",
    "sobre-75": "Palavras Finais",
    "sobre-76":
      "Somos uma igreja que busca honrar a Deus em todas as coisas, seguindo fielmente os ensinamentos das Escrituras e servindo ao próximo com amor. Convidamos você a conhecer nossa comunidade, participar de nossos cultos e experimentar o amor de Cristo em um ambiente acolhedor e comprometido com a verdade.",
    "sobre-77":
      '"A graça do Senhor Jesus Cristo, e o amor de Deus, e a comunhão do Espírito Santo sejam com todos vós" - 2 Coríntios 13:13',
  };

  constructor() {}

  ngOnInit(): void {
    // Poderia ser usado para carregar dados dinâmicos se necessário
  }
}
