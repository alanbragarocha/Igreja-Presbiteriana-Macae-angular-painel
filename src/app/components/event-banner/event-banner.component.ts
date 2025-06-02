import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-event-banner",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./event-banner.component.html",
  styleUrl: "./event-banner.component.scss",
})
export class EventBannerComponent {
  // CMS - Sistema de gerenciamento de conteúdo
  cms: { [key: string]: string } = {
    "event-banner-0": "Banner de Eventos",
  };
}
