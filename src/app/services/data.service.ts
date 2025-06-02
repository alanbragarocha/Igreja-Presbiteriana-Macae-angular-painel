import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { StorageService } from "./storage.service";

export interface Evento {
  id: number;
  titulo: string;
  data: string; // Formato: 'YYYY-MM-DD'
  hora: string;
  descricao: string;
  tipo: "culto" | "estudo" | "especial" | "outro";
  dia?: string; // Dia extraído da data (para exibição)
  mes?: string; // Mês extraído da data (para exibição)
  horario?: string; // Formatação de hora para exibição
  local?: string; // Local do evento
}

export interface DadosBancarios {
  banco: string;
  agencia: string;
  conta: string;
  titular: string;
  cnpj: string;
}

export interface DadosPix {
  chave: string;
  tipo: string;
}

export interface Contato {
  endereco: string;
  telefone: string;
  email: string;
  redesSociais: {
    facebook: string;
    instagram: string;
    youtube: string;
    whatsapp: string;
  };
}

@Injectable({
  providedIn: "root",
})
export class DataService {
  // BehaviorSubjects para manter o estado e permitir a observação de alterações
  private _eventos = new BehaviorSubject<Evento[]>([]);
  private _contato = new BehaviorSubject<Contato>({
    endereco: "Rua XXXX, nº XXX - Bairro, Macaé - RJ",
    telefone: "(22) XXXX-XXXX",
    email: "contato@ipmacae.org.br",
    redesSociais: {
      facebook: "https://www.facebook.com/igrejapresbmacae",
      instagram: "https://www.instagram.com/igrejapresbmacae",
      youtube: "https://www.youtube.com/channel/igrejapresbmacae",
      whatsapp: "https://wa.me/5522999999999",
    },
  });

  private _dadosBancarios = new BehaviorSubject<DadosBancarios>({
    banco: "Banco do Brasil",
    agencia: "0000-0",
    conta: "00000-0",
    titular: "Igreja Presbiteriana de Macaé",
    cnpj: "00.000.000/0001-00",
  });

  private _dadosPix = new BehaviorSubject<DadosPix>({
    chave: "00.000.000/0001-00",
    tipo: "CNPJ",
  });

  // Observables públicos para os componentes assinarem
  public eventos$: Observable<Evento[]> = this._eventos.asObservable();
  public contato$: Observable<Contato> = this._contato.asObservable();
  public dadosBancarios$: Observable<DadosBancarios> =
    this._dadosBancarios.asObservable();
  public dadosPix$: Observable<DadosPix> = this._dadosPix.asObservable();

  // Propriedades para acesso direto aos valores atuais
  public get dadosBancarios(): DadosBancarios {
    return this._dadosBancarios.getValue();
  }

  public get dadosPix(): DadosPix {
    return this._dadosPix.getValue();
  }

  public get eventos(): Evento[] {
    return this._eventos.getValue();
  }

  constructor(private storageService: StorageService) {
    this.inicializarDados();

    // Inscrição para mudanças no Storage
    this.storageService.conteudoSite$.subscribe((conteudo) => {
      if (conteudo) {
        // Atualizar eventos
        if (conteudo.eventos && conteudo.eventos.length > 0) {
          this._eventos.next(conteudo.eventos);
        } else {
          this.carregarEventosIniciais();
        }

        // Atualizar contato
        if (conteudo.contato) {
          this._contato.next(conteudo.contato);
        }

        // Atualizar dados bancários
        if (conteudo.dadosBancarios) {
          this._dadosBancarios.next(conteudo.dadosBancarios);
        }

        // Atualizar dados PIX
        if (conteudo.dadosPix) {
          this._dadosPix.next(conteudo.dadosPix);
        }
      }
    });
  }

  private inicializarDados(): void {
    const conteudo = this.storageService.conteudoAtual;

    if (conteudo) {
      if (conteudo.eventos && conteudo.eventos.length > 0) {
        this._eventos.next(conteudo.eventos);
      } else {
        this.carregarEventosIniciais();
      }

      if (conteudo.contato) {
        this._contato.next(conteudo.contato);
      }

      if (conteudo.dadosBancarios) {
        this._dadosBancarios.next(conteudo.dadosBancarios);
      }

      if (conteudo.dadosPix) {
        this._dadosPix.next(conteudo.dadosPix);
      }
    } else {
      this.carregarEventosIniciais();
    }
  }

  private carregarEventosIniciais(): void {
    const eventosIniciais: Evento[] = [
      {
        id: 1,
        titulo: "Culto Dominical",
        data: "2025-05-11",
        hora: "18:00",
        descricao: "Culto de adoração e pregação da Palavra de Deus.",
        tipo: "culto",
        dia: "11",
        mes: "Mai",
        horario: "18:00",
        local: "Igreja Presbiteriana de Macaé",
      },
      {
        id: 2,
        titulo: "Escola Dominical",
        data: "2025-05-11",
        hora: "09:00",
        descricao: "Estudo bíblico sistemático para todas as idades.",
        tipo: "estudo",
        dia: "11",
        mes: "Mai",
        horario: "09:00",
        local: "Igreja Presbiteriana de Macaé",
      },
      {
        id: 3,
        titulo: "Estudo Bíblico",
        data: "2025-05-14",
        hora: "19:30",
        descricao: "Estudo da Palavra de Deus com o pastor.",
        tipo: "estudo",
        dia: "14",
        mes: "Mai",
        horario: "19:30",
        local: "Igreja Presbiteriana de Macaé",
      },
      {
        id: 4,
        titulo: "Reunião de Oração",
        data: "2025-05-16",
        hora: "19:00",
        descricao: "Momento de intercessão e oração comunitária.",
        tipo: "outro",
        dia: "16",
        mes: "Mai",
        horario: "19:00",
        local: "Igreja Presbiteriana de Macaé",
      },
      {
        id: 5,
        titulo: "Encontro de Jovens",
        data: "2025-05-17",
        hora: "19:00",
        descricao: "Encontro com louvor, estudo da Palavra e comunhão.",
        tipo: "outro",
        dia: "17",
        mes: "Mai",
        horario: "19:00",
        local: "Igreja Presbiteriana de Macaé",
      },
    ];

    this._eventos.next(eventosIniciais);

    // Salvar no storage
    this.storageService.atualizarEventos(eventosIniciais);
  }

  // Métodos para gerenciar eventos
  public getEventos(): Evento[] {
    return this._eventos.getValue();
  }

  public getContato(): Contato {
    return this._contato.getValue();
  }

  public getProximosEventos(quantidade: number): Evento[] {
    const hoje = new Date();
    const eventos = this._eventos.getValue();

    return eventos
      .filter((evento) => new Date(evento.data) >= hoje)
      .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
      .slice(0, quantidade);
  }

  public getEventosPorTipo(
    tipo: "culto" | "estudo" | "especial" | "outro"
  ): Evento[] {
    return this._eventos.getValue().filter((evento) => evento.tipo === tipo);
  }

  public adicionarEvento(evento: Omit<Evento, "id">): void {
    // Usar o StorageService para adicionar o evento
    this.storageService.adicionarEvento(evento);

    // O BehaviorSubject será atualizado automaticamente pela inscrição ao storageService
  }

  public atualizarEvento(id: number, eventoAtualizado: Partial<Evento>): void {
    // Usar o StorageService para atualizar o evento
    this.storageService.atualizarEvento(id, eventoAtualizado);

    // O BehaviorSubject será atualizado automaticamente pela inscrição ao storageService
  }

  public removerEvento(id: number): void {
    // Usar o StorageService para remover o evento
    this.storageService.removerEvento(id);

    // O BehaviorSubject será atualizado automaticamente pela inscrição ao storageService
  }

  // Métodos para gerenciar informações de contato
  public atualizarContato(contatoAtualizado: Partial<Contato>): void {
    const contato = this._contato.getValue();
    const contatoCompleto = { ...contato, ...contatoAtualizado };

    // Atualizar o BehaviorSubject
    this._contato.next(contatoCompleto);

    // Salvar no storage
    this.storageService.atualizarContato(contatoCompleto);
  }

  // Métodos para gerenciar dados bancários
  public atualizarDadosBancarios(
    dadosAtualizados: Partial<DadosBancarios>
  ): void {
    const dados = this._dadosBancarios.getValue();
    const dadosCompletos = { ...dados, ...dadosAtualizados };

    // Atualizar o BehaviorSubject
    this._dadosBancarios.next(dadosCompletos);

    // Salvar no storage
    this.storageService.atualizarDadosBancarios(dadosCompletos);
  }

  // Métodos para gerenciar dados do PIX
  public atualizarDadosPix(dadosAtualizados: Partial<DadosPix>): void {
    const dados = this._dadosPix.getValue();
    const dadosCompletos = { ...dados, ...dadosAtualizados };

    // Atualizar o BehaviorSubject
    this._dadosPix.next(dadosCompletos);

    // Salvar no storage
    this.storageService.atualizarDadosPix(dadosCompletos);
  }

  // Observable para monitorar alterações nas páginas
  private _paginasAtualizadas = new BehaviorSubject<{
    pagina: string;
    conteudo: Record<string, any>;
  }>({
    pagina: "",
    conteudo: {},
  });
  public paginasAtualizadas$ = this._paginasAtualizadas.asObservable();

  // Métodos para gerenciar conteúdos de páginas
  public atualizarConteudoPagina(
    pagina: string,
    conteudo: Record<string, any>
  ): void {
    this.storageService.atualizarConteudoPagina(pagina, conteudo);
    // Emitir evento de atualização
    this._paginasAtualizadas.next({ pagina, conteudo });
  }

  public obterConteudoPagina(pagina: string): Record<string, any> | null {
    return this.storageService.obterConteudoPagina(pagina);
  }
}
