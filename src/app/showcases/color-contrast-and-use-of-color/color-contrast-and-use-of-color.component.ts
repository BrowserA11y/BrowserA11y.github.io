import { Component, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { InfoBoxComponent } from "../../shared/info-box/info-box.component";

@Component({
  selector: "app-color-contrast-and-use-of-color",
  templateUrl: "./color-contrast-and-use-of-color.component.html",
  styleUrls: ["./color-contrast-and-use-of-color.component.scss"],
  imports: [InfoBoxComponent, RouterLink],
})
export class ColorContrastAndUseOfColorComponent {
  readonly selectedOk = signal<"standard" | "express">("standard");
  readonly selectedFail = signal<"standard" | "express">("standard");
  readonly themeOk = signal<"sand" | "sea" | "ink" | null>(null);
  readonly themeFail = signal<"sand" | "sea" | "ink" | null>(null);
}
