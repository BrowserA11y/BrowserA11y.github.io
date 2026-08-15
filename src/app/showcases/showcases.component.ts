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
      // Document / text lines
      iconPath:
        "M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm1 2v12h14V6H5zm2 2h10v2H7V8zm0 4h7v2H7v-2z",
    },
    {
      title: "Semantic HTML",
      description:
        "Use the right elements and required child order so assistive tech gets real meaning.",
      link: "/showcases/semantic-html",
      // Nested markup / tag shape
      iconPath:
        "M4 6l4 6-4 6h2.5L10.5 12 6.5 6H4zm16 0h-2.5L13.5 12l4 6H20l-4-6 4-6zM11 17h2l1-10h-2l-1 10z",
    },
  ] as const;
}
