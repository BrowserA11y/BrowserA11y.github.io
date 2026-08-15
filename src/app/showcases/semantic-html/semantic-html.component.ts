import { Component, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { InfoBoxComponent } from "../../shared/info-box/info-box.component";
import { SemanticHtmlItemComponent } from "./semantic-html-item.component";

@Component({
  selector: "app-semantic-html",
  templateUrl: "./semantic-html.component.html",
  styleUrls: ["./semantic-html.component.scss"],
  imports: [InfoBoxComponent, RouterLink, SemanticHtmlItemComponent],
})
export class SemanticHtmlComponent {
  private readonly catalog = [
    { id: "1", label: "Large-print novels" },
    { id: "2", label: "Braille editions" },
    { id: "3", label: "Audiobooks" },
  ] as const;

  readonly items = signal([...this.catalog]);

  clearItems(): void {
    this.items.set([]);
  }

  restoreItems(): void {
    this.items.set([...this.catalog]);
  }
}
