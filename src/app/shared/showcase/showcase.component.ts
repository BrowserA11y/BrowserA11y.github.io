import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";

/**
 * Showcase tile pattern: the whole card is clickable without wrapping
 * heading + description in an anchor. The title link uses a stretched
 * ::after hit area so nested interactive content can still be added later.
 */
@Component({
  selector: "app-showcase",
  templateUrl: "./showcase.component.html",
  styleUrls: ["./showcase.component.scss"],
  imports: [RouterLink],
})
export class ShowcaseComponent {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly link = input.required<string>();
}
