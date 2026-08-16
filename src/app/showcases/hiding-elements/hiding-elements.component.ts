import { Component, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { InfoBoxComponent } from "../../shared/info-box/info-box.component";

@Component({
  selector: "app-hiding-elements",
  templateUrl: "./hiding-elements.component.html",
  styleUrls: ["./hiding-elements.component.scss"],
  imports: [InfoBoxComponent, RouterLink],
})
export class HidingElementsComponent {
  readonly showPanel = signal(true);

  togglePanel(): void {
    this.showPanel.update((v) => !v);
  }
}
