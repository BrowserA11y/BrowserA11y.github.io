import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { InfoBoxComponent } from "../../shared/info-box/info-box.component";

@Component({
  selector: "app-high-contrast-mode",
  templateUrl: "./high-contrast-mode.component.html",
  styleUrls: ["./high-contrast-mode.component.scss"],
  imports: [InfoBoxComponent, RouterLink],
})
export class HighContrastModeComponent {}
