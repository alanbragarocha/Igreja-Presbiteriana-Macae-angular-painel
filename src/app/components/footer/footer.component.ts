import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DataService } from "../../services/data.service";

interface Contato {
  endereco: string;
  telefone: string;
  email: string;
}

interface RedesSociais {
  facebook: string;
  instagram: string;
  youtube: string;
  whatsapp: string;
}

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();

  // CMS - Sistema de gerenciamento de conteúdo
  cms: { [key: string]: string } = {
    "footer-0": "",
    "footer-1": "Quarta Igreja",
    "footer-2": "Presbiteriana de Macaé",
    "footer-3":
      "Nossa igreja é um espaço de adoração, comunhão e crescimento espiritual para toda a família.",
    "footer-4": '"Adorando a Deus, edificando vidas e servindo com amor"',
    "footer-5": "",
    "footer-6": "Horários de Culto",
    "footer-7": "Domingo: ",
    "footer-8": "9h - Escola Dominical / 18h - Culto Noturno",
    "footer-9": "Terça-feira: ",
    "footer-10": "19h30 - Estudo Bíblico",
    "footer-11": "Quarta-feira: ",
    "footer-12": "19h30 - Reunião de Oração",
    "footer-13": "Quinta-feira: ",
    "footer-14": "19h30 - Culto de Doutrina",
    "footer-15": "Sábado: ",
    "footer-16": "19h - Encontro de Jovens",
    "footer-17": "",
    "footer-18": "Contato",
    "footer-19": "Endereço: ",
    "footer-20": "Telefone: ",
    "footer-21": "E-mail: ",
    "footer-22": "Redes Sociais",
    "footer-23": "",
  };

  contato: Contato = {
    endereco: "Rua XXXX, nº XXX - Bairro, Macaé - RJ",
    telefone: "(22) XXXX-XXXX",
    email: "contato@ipmacae.org.br",
  };

  redesSociais: RedesSociais = {
    facebook: "https://www.facebook.com/igrejapresbmacae",
    instagram: "https://www.instagram.com/igrejapresbmacae",
    youtube: "https://www.youtube.com/channel/igrejapresbmacae",
    whatsapp: "https://wa.me/5522999999999",
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Poderia carregar dados do serviço se necessário
  }
}
