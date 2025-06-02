import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Contato, DadosBancarios, DadosPix, Evento } from "./data.service";

export interface ConteudoPagina {
  pagina: string;
  conteudo: Record<string, any>;
}

export interface ConteudoSite {
  eventos: Evento[];
  contato: Contato;
  dadosBancarios: DadosBancarios;
  dadosPix: DadosPix;
  paginas: ConteudoPagina[];
}

const STORAGE_KEY = "igreja_site_conteudo";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private _conteudoSite = new BehaviorSubject<ConteudoSite | null>(null);
  public conteudoSite$ = this._conteudoSite.asObservable();

  constructor() {
    this.carregarDadosStorage();
  }

  // Carrega dados do localStorage ou inicializa com valores padrão
  private carregarDadosStorage(): void {
    try {
      const dadosArmazenados = localStorage.getItem(STORAGE_KEY);

      if (dadosArmazenados) {
        const conteudo = JSON.parse(dadosArmazenados);
        this._conteudoSite.next(conteudo);
      } else {
        // Inicializa com valores padrão se não encontrar dados salvos
        this._conteudoSite.next({
          eventos: [],
          contato: {
            endereco: "Rua XXXX, nº XXX - Bairro, Macaé - RJ",
            telefone: "(22) XXXX-XXXX",
            email: "contato@ipmacae.org.br",
            redesSociais: {
              facebook: "https://www.facebook.com/igrejapresbmacae",
              instagram: "https://www.instagram.com/igrejapresbmacae",
              youtube: "https://www.youtube.com/channel/igrejapresbmacae",
              whatsapp: "https://wa.me/5522999999999",
            },
          },
          dadosBancarios: {
            banco: "Banco do Brasil",
            agencia: "0000-0",
            conta: "00000-0",
            titular: "Igreja Presbiteriana de Macaé",
            cnpj: "00.000.000/0001-00",
          },
          dadosPix: {
            chave: "00.000.000/0001-00",
            tipo: "CNPJ",
          },
          paginas: [
            {
              pagina: "lutero",
              conteudo: {
                "lutero-0": "Lutero placeholder for lutero-0",
                "lutero-1": "Lutero placeholder for lutero-1",
                "lutero-10": "Lutero placeholder for lutero-10",
                "lutero-11": "Lutero placeholder for lutero-11",
                "lutero-12": "Lutero placeholder for lutero-12",
                "lutero-13": "Lutero placeholder for lutero-13",
                "lutero-14": "Lutero placeholder for lutero-14",
                "lutero-15": "Lutero placeholder for lutero-15",
                "lutero-16": "Lutero placeholder for lutero-16",
                "lutero-17": "Lutero placeholder for lutero-17",
                "lutero-18": "Lutero placeholder for lutero-18",
                "lutero-19": "Lutero placeholder for lutero-19",
                "lutero-2": "Lutero placeholder for lutero-2",
                "lutero-20": "Lutero placeholder for lutero-20",
                "lutero-21": "Lutero placeholder for lutero-21",
                "lutero-22": "Lutero placeholder for lutero-22",
                "lutero-23": "Lutero placeholder for lutero-23",
                "lutero-24": "Lutero placeholder for lutero-24",
                "lutero-25": "Lutero placeholder for lutero-25",
                "lutero-26": "Lutero placeholder for lutero-26",
                "lutero-27": "Lutero placeholder for lutero-27",
                "lutero-28": "Lutero placeholder for lutero-28",
                "lutero-29": "Lutero placeholder for lutero-29",
                "lutero-3": "Lutero placeholder for lutero-3",
                "lutero-30": "Lutero placeholder for lutero-30",
                "lutero-31": "Lutero placeholder for lutero-31",
                "lutero-32": "Lutero placeholder for lutero-32",
                "lutero-4": "Lutero placeholder for lutero-4",
                "lutero-5": "Lutero placeholder for lutero-5",
                "lutero-6": "Lutero placeholder for lutero-6",
                "lutero-7": "Lutero placeholder for lutero-7",
                "lutero-8": "Lutero placeholder for lutero-8",
                "lutero-9": "Lutero placeholder for lutero-9",
              },
            },

            {
              pagina: "calvino",
              conteudo: {
                "calvino-0": "Calvino placeholder for calvino-0",
                "calvino-1": "Calvino placeholder for calvino-1",
                "calvino-10": "Calvino placeholder for calvino-10",
                "calvino-11": "Calvino placeholder for calvino-11",
                "calvino-12": "Calvino placeholder for calvino-12",
                "calvino-13": "Calvino placeholder for calvino-13",
                "calvino-14": "Calvino placeholder for calvino-14",
                "calvino-15": "Calvino placeholder for calvino-15",
                "calvino-16": "Calvino placeholder for calvino-16",
                "calvino-17": "Calvino placeholder for calvino-17",
                "calvino-18": "Calvino placeholder for calvino-18",
                "calvino-19": "Calvino placeholder for calvino-19",
                "calvino-2": "Calvino placeholder for calvino-2",
                "calvino-20": "Calvino placeholder for calvino-20",
                "calvino-21": "Calvino placeholder for calvino-21",
                "calvino-22": "Calvino placeholder for calvino-22",
                "calvino-23": "Calvino placeholder for calvino-23",
                "calvino-24": "Calvino placeholder for calvino-24",
                "calvino-25": "Calvino placeholder for calvino-25",
                "calvino-26": "Calvino placeholder for calvino-26",
                "calvino-27": "Calvino placeholder for calvino-27",
                "calvino-28": "Calvino placeholder for calvino-28",
                "calvino-29": "Calvino placeholder for calvino-29",
                "calvino-3": "Calvino placeholder for calvino-3",
                "calvino-30": "Calvino placeholder for calvino-30",
                "calvino-31": "Calvino placeholder for calvino-31",
                "calvino-32": "Calvino placeholder for calvino-32",
                "calvino-4": "Calvino placeholder for calvino-4",
                "calvino-5": "Calvino placeholder for calvino-5",
                "calvino-6": "Calvino placeholder for calvino-6",
                "calvino-7": "Calvino placeholder for calvino-7",
                "calvino-8": "Calvino placeholder for calvino-8",
                "calvino-9": "Calvino placeholder for calvino-9",
              },
            },

            {
              pagina: "escalas",
              conteudo: {
                "escalas-0": "Escalas placeholder for escalas-0",
                "escalas-1": "Escalas placeholder for escalas-1",
                "escalas-10": "Escalas placeholder for escalas-10",
                "escalas-11": "Escalas placeholder for escalas-11",
                "escalas-12": "Escalas placeholder for escalas-12",
                "escalas-13": "Escalas placeholder for escalas-13",
                "escalas-14": "Escalas placeholder for escalas-14",
                "escalas-15": "Escalas placeholder for escalas-15",
                "escalas-16": "Escalas placeholder for escalas-16",
                "escalas-17": "Escalas placeholder for escalas-17",
                "escalas-18": "Escalas placeholder for escalas-18",
                "escalas-19": "Escalas placeholder for escalas-19",
                "escalas-2": "Escalas placeholder for escalas-2",
                "escalas-20": "Escalas placeholder for escalas-20",
                "escalas-21": "Escalas placeholder for escalas-21",
                "escalas-22": "Escalas placeholder for escalas-22",
                "escalas-23": "Escalas placeholder for escalas-23",
                "escalas-24": "Escalas placeholder for escalas-24",
                "escalas-25": "Escalas placeholder for escalas-25",
                "escalas-26": "Escalas placeholder for escalas-26",
                "escalas-27": "Escalas placeholder for escalas-27",
                "escalas-28": "Escalas placeholder for escalas-28",
                "escalas-29": "Escalas placeholder for escalas-29",
                "escalas-3": "Escalas placeholder for escalas-3",
                "escalas-30": "Escalas placeholder for escalas-30",
                "escalas-31": "Escalas placeholder for escalas-31",
                "escalas-32": "Escalas placeholder for escalas-32",
                "escalas-33": "Escalas placeholder for escalas-33",
                "escalas-34": "Escalas placeholder for escalas-34",
                "escalas-35": "Escalas placeholder for escalas-35",
                "escalas-36": "Escalas placeholder for escalas-36",
                "escalas-37": "Escalas placeholder for escalas-37",
                "escalas-38": "Escalas placeholder for escalas-38",
                "escalas-39": "Escalas placeholder for escalas-39",
                "escalas-4": "Escalas placeholder for escalas-4",
                "escalas-40": "Escalas placeholder for escalas-40",
                "escalas-41": "Escalas placeholder for escalas-41",
                "escalas-42": "Escalas placeholder for escalas-42",
                "escalas-43": "Escalas placeholder for escalas-43",
                "escalas-44": "Escalas placeholder for escalas-44",
                "escalas-45": "Escalas placeholder for escalas-45",
                "escalas-46": "Escalas placeholder for escalas-46",
                "escalas-47": "Escalas placeholder for escalas-47",
                "escalas-48": "Escalas placeholder for escalas-48",
                "escalas-49": "Escalas placeholder for escalas-49",
                "escalas-5": "Escalas placeholder for escalas-5",
                "escalas-50": "Escalas placeholder for escalas-50",
                "escalas-51": "Escalas placeholder for escalas-51",
                "escalas-52": "Escalas placeholder for escalas-52",
                "escalas-53": "Escalas placeholder for escalas-53",
                "escalas-54": "Escalas placeholder for escalas-54",
                "escalas-55": "Escalas placeholder for escalas-55",
                "escalas-6": "Escalas placeholder for escalas-6",
                "escalas-7": "Escalas placeholder for escalas-7",
                "escalas-8": "Escalas placeholder for escalas-8",
                "escalas-9": "Escalas placeholder for escalas-9",
              },
            },

            {
              pagina: "sobre",
              conteudo: {
                "sobre-0": "Sobre placeholder for sobre-0",
                "sobre-1": "Sobre placeholder for sobre-1",
                "sobre-10": "Sobre placeholder for sobre-10",
                "sobre-11": "Sobre placeholder for sobre-11",
                "sobre-12": "Sobre placeholder for sobre-12",
                "sobre-13": "Sobre placeholder for sobre-13",
                "sobre-14": "Sobre placeholder for sobre-14",
                "sobre-15": "Sobre placeholder for sobre-15",
                "sobre-16": "Sobre placeholder for sobre-16",
                "sobre-17": "Sobre placeholder for sobre-17",
                "sobre-18": "Sobre placeholder for sobre-18",
                "sobre-19": "Sobre placeholder for sobre-19",
                "sobre-2": "Sobre placeholder for sobre-2",
                "sobre-20": "Sobre placeholder for sobre-20",
                "sobre-21": "Sobre placeholder for sobre-21",
                "sobre-22": "Sobre placeholder for sobre-22",
                "sobre-23": "Sobre placeholder for sobre-23",
                "sobre-24": "Sobre placeholder for sobre-24",
                "sobre-25": "Sobre placeholder for sobre-25",
                "sobre-26": "Sobre placeholder for sobre-26",
                "sobre-27": "Sobre placeholder for sobre-27",
                "sobre-28": "Sobre placeholder for sobre-28",
                "sobre-29": "Sobre placeholder for sobre-29",
                "sobre-3": "Sobre placeholder for sobre-3",
                "sobre-30": "Sobre placeholder for sobre-30",
                "sobre-31": "Sobre placeholder for sobre-31",
                "sobre-32": "Sobre placeholder for sobre-32",
                "sobre-33": "Sobre placeholder for sobre-33",
                "sobre-34": "Sobre placeholder for sobre-34",
                "sobre-35": "Sobre placeholder for sobre-35",
                "sobre-36": "Sobre placeholder for sobre-36",
                "sobre-37": "Sobre placeholder for sobre-37",
                "sobre-38": "Sobre placeholder for sobre-38",
                "sobre-39": "Sobre placeholder for sobre-39",
                "sobre-4": "Sobre placeholder for sobre-4",
                "sobre-40": "Sobre placeholder for sobre-40",
                "sobre-41": "Sobre placeholder for sobre-41",
                "sobre-42": "Sobre placeholder for sobre-42",
                "sobre-43": "Sobre placeholder for sobre-43",
                "sobre-44": "Sobre placeholder for sobre-44",
                "sobre-45": "Sobre placeholder for sobre-45",
                "sobre-46": "Sobre placeholder for sobre-46",
                "sobre-47": "Sobre placeholder for sobre-47",
                "sobre-48": "Sobre placeholder for sobre-48",
                "sobre-49": "Sobre placeholder for sobre-49",
                "sobre-5": "Sobre placeholder for sobre-5",
                "sobre-50": "Sobre placeholder for sobre-50",
                "sobre-51": "Sobre placeholder for sobre-51",
                "sobre-52": "Sobre placeholder for sobre-52",
                "sobre-53": "Sobre placeholder for sobre-53",
                "sobre-54": "Sobre placeholder for sobre-54",
                "sobre-55": "Sobre placeholder for sobre-55",
                "sobre-56": "Sobre placeholder for sobre-56",
                "sobre-57": "Sobre placeholder for sobre-57",
                "sobre-58": "Sobre placeholder for sobre-58",
                "sobre-59": "Sobre placeholder for sobre-59",
                "sobre-6": "Sobre placeholder for sobre-6",
                "sobre-60": "Sobre placeholder for sobre-60",
                "sobre-61": "Sobre placeholder for sobre-61",
                "sobre-62": "Sobre placeholder for sobre-62",
                "sobre-63": "Sobre placeholder for sobre-63",
                "sobre-64": "Sobre placeholder for sobre-64",
                "sobre-65": "Sobre placeholder for sobre-65",
                "sobre-66": "Sobre placeholder for sobre-66",
                "sobre-67": "Sobre placeholder for sobre-67",
                "sobre-68": "Sobre placeholder for sobre-68",
                "sobre-69": "Sobre placeholder for sobre-69",
                "sobre-7": "Sobre placeholder for sobre-7",
                "sobre-70": "Sobre placeholder for sobre-70",
                "sobre-71": "Sobre placeholder for sobre-71",
                "sobre-72": "Sobre placeholder for sobre-72",
                "sobre-73": "Sobre placeholder for sobre-73",
                "sobre-74": "Sobre placeholder for sobre-74",
                "sobre-75": "Sobre placeholder for sobre-75",
                "sobre-76": "Sobre placeholder for sobre-76",
                "sobre-77": "Sobre placeholder for sobre-77",
                "sobre-8": "Sobre placeholder for sobre-8",
                "sobre-9": "Sobre placeholder for sobre-9",
              },
            },

            {
              pagina: "home",
              conteudo: {
                "home-0": "Título principal da Home",
                "home-1": "Subtítulo da Home",
                "home-2": "Descrição da Home",
              },
            },

            {
              pagina: "pastor",
              conteudo: {
                "pastor-0": "Pastor placeholder for pastor-0",
                "pastor-1": "Pastor placeholder for pastor-1",
                "pastor-10": "Pastor placeholder for pastor-10",
                "pastor-11": "Pastor placeholder for pastor-11",
                "pastor-12": "Pastor placeholder for pastor-12",
                "pastor-13": "Pastor placeholder for pastor-13",
                "pastor-14": "Pastor placeholder for pastor-14",
                "pastor-15": "Pastor placeholder for pastor-15",
                "pastor-16": "Pastor placeholder for pastor-16",
                "pastor-17": "Pastor placeholder for pastor-17",
                "pastor-18": "Pastor placeholder for pastor-18",
                "pastor-19": "Pastor placeholder for pastor-19",
                "pastor-2": "Pastor placeholder for pastor-2",
                "pastor-20": "Pastor placeholder for pastor-20",
                "pastor-21": "Pastor placeholder for pastor-21",
                "pastor-22": "Pastor placeholder for pastor-22",
                "pastor-23": "Pastor placeholder for pastor-23",
                "pastor-24": "Pastor placeholder for pastor-24",
                "pastor-25": "Pastor placeholder for pastor-25",
                "pastor-26": "Pastor placeholder for pastor-26",
                "pastor-27": "Pastor placeholder for pastor-27",
                "pastor-28": "Pastor placeholder for pastor-28",
                "pastor-29": "Pastor placeholder for pastor-29",
                "pastor-3": "Pastor placeholder for pastor-3",
                "pastor-30": "Pastor placeholder for pastor-30",
                "pastor-31": "Pastor placeholder for pastor-31",
                "pastor-32": "Pastor placeholder for pastor-32",
                "pastor-33": "Pastor placeholder for pastor-33",
                "pastor-34": "Pastor placeholder for pastor-34",
                "pastor-35": "Pastor placeholder for pastor-35",
                "pastor-36": "Pastor placeholder for pastor-36",
                "pastor-37": "Pastor placeholder for pastor-37",
                "pastor-38": "Pastor placeholder for pastor-38",
                "pastor-39": "Pastor placeholder for pastor-39",
                "pastor-4": "Pastor placeholder for pastor-4",
                "pastor-40": "Pastor placeholder for pastor-40",
                "pastor-41": "Pastor placeholder for pastor-41",
                "pastor-42": "Pastor placeholder for pastor-42",
                "pastor-43": "Pastor placeholder for pastor-43",
                "pastor-44": "Pastor placeholder for pastor-44",
                "pastor-45": "Pastor placeholder for pastor-45",
                "pastor-46": "Pastor placeholder for pastor-46",
                "pastor-47": "Pastor placeholder for pastor-47",
                "pastor-48": "Pastor placeholder for pastor-48",
                "pastor-49": "Pastor placeholder for pastor-49",
                "pastor-5": "Pastor placeholder for pastor-5",
                "pastor-50": "Pastor placeholder for pastor-50",
                "pastor-51": "Pastor placeholder for pastor-51",
                "pastor-52": "Pastor placeholder for pastor-52",
                "pastor-53": "Pastor placeholder for pastor-53",
                "pastor-54": "Pastor placeholder for pastor-54",
                "pastor-55": "Pastor placeholder for pastor-55",
                "pastor-56": "Pastor placeholder for pastor-56",
                "pastor-57": "Pastor placeholder for pastor-57",
                "pastor-58": "Pastor placeholder for pastor-58",
                "pastor-59": "Pastor placeholder for pastor-59",
                "pastor-6": "Pastor placeholder for pastor-6",
                "pastor-60": "Pastor placeholder for pastor-60",
                "pastor-61": "Pastor placeholder for pastor-61",
                "pastor-62": "Pastor placeholder for pastor-62",
                "pastor-7": "Pastor placeholder for pastor-7",
                "pastor-8": "Pastor placeholder for pastor-8",
                "pastor-9": "Pastor placeholder for pastor-9",
              },
            },

            {
              pagina: "ashbel",
              conteudo: {
                "ashbel-0": "Ashbel placeholder for ashbel-0",
                "ashbel-1": "Ashbel placeholder for ashbel-1",
                "ashbel-10": "Ashbel placeholder for ashbel-10",
                "ashbel-11": "Ashbel placeholder for ashbel-11",
                "ashbel-12": "Ashbel placeholder for ashbel-12",
                "ashbel-13": "Ashbel placeholder for ashbel-13",
                "ashbel-14": "Ashbel placeholder for ashbel-14",
                "ashbel-15": "Ashbel placeholder for ashbel-15",
                "ashbel-16": "Ashbel placeholder for ashbel-16",
                "ashbel-17": "Ashbel placeholder for ashbel-17",
                "ashbel-18": "Ashbel placeholder for ashbel-18",
                "ashbel-19": "Ashbel placeholder for ashbel-19",
                "ashbel-2": "Ashbel placeholder for ashbel-2",
                "ashbel-20": "Ashbel placeholder for ashbel-20",
                "ashbel-21": "Ashbel placeholder for ashbel-21",
                "ashbel-22": "Ashbel placeholder for ashbel-22",
                "ashbel-23": "Ashbel placeholder for ashbel-23",
                "ashbel-24": "Ashbel placeholder for ashbel-24",
                "ashbel-25": "Ashbel placeholder for ashbel-25",
                "ashbel-26": "Ashbel placeholder for ashbel-26",
                "ashbel-27": "Ashbel placeholder for ashbel-27",
                "ashbel-28": "Ashbel placeholder for ashbel-28",
                "ashbel-29": "Ashbel placeholder for ashbel-29",
                "ashbel-3": "Ashbel placeholder for ashbel-3",
                "ashbel-30": "Ashbel placeholder for ashbel-30",
                "ashbel-31": "Ashbel placeholder for ashbel-31",
                "ashbel-32": "Ashbel placeholder for ashbel-32",
                "ashbel-33": "Ashbel placeholder for ashbel-33",
                "ashbel-4": "Ashbel placeholder for ashbel-4",
                "ashbel-5": "Ashbel placeholder for ashbel-5",
                "ashbel-6": "Ashbel placeholder for ashbel-6",
                "ashbel-7": "Ashbel placeholder for ashbel-7",
                "ashbel-8": "Ashbel placeholder for ashbel-8",
                "ashbel-9": "Ashbel placeholder for ashbel-9",
              },
            },
          ],
        });
      }
    } catch (error) {
      console.error("Erro ao carregar dados do storage:", error);
      // Em caso de erro, inicializa com valores vazios
      this._conteudoSite.next({
        eventos: [],
        contato: {
          endereco: "",
          telefone: "",
          email: "",
          redesSociais: {
            facebook: "",
            instagram: "",
            youtube: "",
            whatsapp: "",
          },
        },
        dadosBancarios: {
          banco: "",
          agencia: "",
          conta: "",
          titular: "",
          cnpj: "",
        },
        dadosPix: {
          chave: "",
          tipo: "",
        },
        paginas: [],
      });
    }
  }

  // Salva todos os dados no localStorage
  private salvarDados(): void {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(this._conteudoSite.getValue())
    );
  }

  // Obtém conteúdo atual
  get conteudoAtual(): ConteudoSite | null {
    return this._conteudoSite.getValue();
  }

  // Atualiza eventos
  atualizarEventos(eventos: Evento[]): void {
    const conteudoAtual = this._conteudoSite.getValue();
    if (conteudoAtual) {
      this._conteudoSite.next({
        ...conteudoAtual,
        eventos,
      });
      this.salvarDados();
    }
  }

  // Atualiza informações de contato
  atualizarContato(contato: Contato): void {
    const conteudoAtual = this._conteudoSite.getValue();
    if (conteudoAtual) {
      this._conteudoSite.next({
        ...conteudoAtual,
        contato,
      });
      this.salvarDados();
    }
  }

  // Atualiza dados bancários
  atualizarDadosBancarios(dados: DadosBancarios): void {
    const conteudoAtual = this._conteudoSite.getValue();
    if (conteudoAtual) {
      this._conteudoSite.next({
        ...conteudoAtual,
        dadosBancarios: dados,
      });
      this.salvarDados();
    }
  }

  // Atualiza dados do PIX
  atualizarDadosPix(dados: DadosPix): void {
    const conteudoAtual = this._conteudoSite.getValue();
    if (conteudoAtual) {
      this._conteudoSite.next({
        ...conteudoAtual,
        dadosPix: dados,
      });
      this.salvarDados();
    }
  }

  // Atualiza conteúdo de uma página específica
  atualizarConteudoPagina(pagina: string, conteudo: Record<string, any>): void {
    console.log(`Salvando conteúdo para página '${pagina}'...`, conteudo);

    const conteudoAtual = this._conteudoSite.getValue();
    if (conteudoAtual) {
      const paginasAtualizadas = [...conteudoAtual.paginas];
      const indicePagina = paginasAtualizadas.findIndex(
        (p) => p.pagina === pagina
      );

      console.log(`Índice encontrado para página '${pagina}': ${indicePagina}`);

      if (indicePagina !== -1) {
        // Atualiza página existente
        const paginaAntiga = paginasAtualizadas[indicePagina];
        console.log(`Conteúdo antigo para '${pagina}':`, paginaAntiga.conteudo);

        // Substitui completamente o conteúdo anterior pelo novo
        paginasAtualizadas[indicePagina] = {
          pagina,
          conteudo: {
            ...conteudo,
          },
        };

        console.log(
          `Conteúdo atualizado para '${pagina}':`,
          paginasAtualizadas[indicePagina].conteudo
        );
      } else {
        // Cria uma nova página se não existir
        paginasAtualizadas.push({
          pagina,
          conteudo,
        });
        console.log(`Página '${pagina}' não encontrada. Nova página criada.`);
      }

      const novoConteudoSite = {
        ...conteudoAtual,
        paginas: paginasAtualizadas,
      };

      this._conteudoSite.next(novoConteudoSite);
      this.salvarDados();

      // Verificar se os dados foram atualizados no BehaviorSubject
      setTimeout(() => {
        const paginaVerificada = this.obterConteudoPagina(pagina);
        console.log(`Verificação após salvar '${pagina}':`, paginaVerificada);
      }, 100);
    }
  }

  // Obtém conteúdo de uma página específica
  obterConteudoPagina(pagina: string): Record<string, any> | null {
    console.log(`Buscando conteúdo para página '${pagina}'...`);

    const conteudo = this._conteudoSite.getValue();
    if (conteudo) {
      const paginaEncontrada = conteudo.paginas.find(
        (p) => p.pagina === pagina
      );

      if (paginaEncontrada) {
        console.log(
          `Página '${pagina}' encontrada. Conteúdo:`,
          paginaEncontrada.conteudo
        );
        return paginaEncontrada.conteudo;
      } else {
        console.log(`Página '${pagina}' não encontrada.`);
        return null;
      }
    }
    console.log(
      `Conteúdo principal é nulo, não foi possível buscar página '${pagina}'.`
    );
    return null;
  }

  // Adiciona um evento
  adicionarEvento(evento: Omit<Evento, "id">): void {
    const conteudo = this._conteudoSite.getValue();
    if (conteudo) {
      const eventos = conteudo.eventos;
      const novoId =
        eventos.length > 0 ? Math.max(...eventos.map((e) => e.id)) + 1 : 1;

      // Extrair dia e mês da data para exibição
      const data = new Date(evento.data);
      const dia = data.getDate().toString();
      const meses = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ];
      const mes = meses[data.getMonth()];

      const novoEvento: Evento = {
        ...evento,
        id: novoId,
        dia,
        mes,
        horario: evento.hora,
        local: evento.local || "Igreja Presbiteriana de Macaé",
      };

      this._conteudoSite.next({
        ...conteudo,
        eventos: [...eventos, novoEvento],
      });

      this.salvarDados();
    }
  }

  // Remove um evento
  removerEvento(id: number): void {
    const conteudo = this._conteudoSite.getValue();
    if (conteudo) {
      this._conteudoSite.next({
        ...conteudo,
        eventos: conteudo.eventos.filter((e) => e.id !== id),
      });

      this.salvarDados();
    }
  }

  // Atualiza um evento
  atualizarEvento(id: number, eventoAtualizado: Partial<Evento>): void {
    const conteudo = this._conteudoSite.getValue();
    if (conteudo) {
      const eventos = [...conteudo.eventos];
      const indice = eventos.findIndex((e) => e.id === id);

      if (indice !== -1) {
        if (eventoAtualizado.data) {
          // Se atualizou a data, recalcula o dia e o mês
          const data = new Date(eventoAtualizado.data);
          const dia = data.getDate().toString();
          const meses = [
            "Jan",
            "Fev",
            "Mar",
            "Abr",
            "Mai",
            "Jun",
            "Jul",
            "Ago",
            "Set",
            "Out",
            "Nov",
            "Dez",
          ];
          const mes = meses[data.getMonth()];

          eventos[indice] = {
            ...eventos[indice],
            ...eventoAtualizado,
            dia,
            mes,
          };

          if (eventoAtualizado.hora) {
            eventos[indice].horario = eventoAtualizado.hora;
          }
        } else {
          eventos[indice] = { ...eventos[indice], ...eventoAtualizado };

          if (eventoAtualizado.hora) {
            eventos[indice].horario = eventoAtualizado.hora;
          }
        }

        this._conteudoSite.next({
          ...conteudo,
          eventos,
        });

        this.salvarDados();
      }
    }
  }

  // Reseta todos os dados para os valores padrão
  resetarDados(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.carregarDadosStorage();
  }
}
