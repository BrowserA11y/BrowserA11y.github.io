import { Component } from "@angular/core";
import { ShowcaseComponent } from "../shared/showcase/showcase.component";

@Component({
  selector: "app-showcases",
  templateUrl: "./showcases.component.html",
  styleUrls: ["./showcases.component.scss"],
  imports: [ShowcaseComponent],
})
export class ShowcasesComponent {
  readonly showcases = [
    {
      title: "Accessible name and description",
      description:
        "Explore how browsers compute accessible names and descriptions for UI controls.",
      link: "/showcases/accessible-name-and-description",
    },
  ] as const;
}
