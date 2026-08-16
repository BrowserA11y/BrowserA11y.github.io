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
    {
      title: "ARIA",
      description:
        "Roles, overrides, nesting, aria-hidden, and live regions — and when they help or hurt.",
      link: "/showcases/aria",
      // Accessibility tree / layered nodes
      iconPath:
        "M3 5h18v2H3V5zm2 4h14v2H5V9zm2 4h10v2H7v-2zm2 4h6v2H9v-2z",
    },
    {
      title: "Hiding elements",
      description:
        "Visible vs invisible, and whether assistive technologies still get the content.",
      link: "/showcases/hiding-elements",
      // Eye with slash / hide metaphor
      iconPath:
        "M12 5c-5 0-9.3 3.1-11 7 1.7 3.9 6 7 11 7s9.3-3.1 11-7c-1.7-3.9-6-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM2.1 3.5l18.4 18.4 1.4-1.4L3.5 2.1 2.1 3.5z",
    },
    {
      title: "Live regions",
      description:
        "Announce dynamic updates to assistive technologies without moving focus.",
      link: "/showcases/live-regions",
      // Broadcast / signal waves
      iconPath:
        "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4.9-2a4.9 4.9 0 0 1 9.8 0h2a6.9 6.9 0 0 0-13.8 0h2zm-3.5 0a8.4 8.4 0 0 1 16.8 0h2a10.4 10.4 0 0 0-20.8 0h2z",
    },
    {
      title: "Reflow, Resize and Spacing",
      description:
        "Watch fixed boxes, clipping, and stacked UI break when text grows or spacing changes.",
      link: "/showcases/reflow-resize-and-spacing",
      // Expanding columns / reflow
      iconPath:
        "M3 5h8v4H3V5zm10 0h8v4h-8V5zM3 11h18v2H3v-2zm0 4h12v4H3v-4zm14 0h4v4h-4v-4z",
    },
    {
      title: "Color contrast and use of color",
      description:
        "Compare text and non-text contrast thresholds, and patterns that rely on color alone.",
      link: "/showcases/color-contrast-and-use-of-color",
      // Half-filled circle / contrast metaphor
      iconPath:
        "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2v16a8 8 0 0 0 0-16z",
    },
    {
      title: "High contrast mode",
      description:
        "See how forced colors remaps UI, and which SVG fill values survive Windows High Contrast.",
      link: "/showcases/high-contrast-mode",
      // Sun / high-contrast brightness
      iconPath:
        "M11 1h2v3h-2V1zm0 19h2v3h-2v-3zM1 11h3v2H1v-2zm19 0h3v2h-3v-2zM3.5 4.9l2.1-2.1 2.1 2.1-2.1 2.1-2.1-2.1zm12.8 12.8l2.1-2.1 2.1 2.1-2.1 2.1-2.1-2.1zM3.5 19.1l2.1-2.1 2.1 2.1-2.1 2.1-2.1-2.1zm12.8-12.8l2.1-2.1 2.1 2.1-2.1 2.1-2.1-2.1zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z",
    },
  ] as const;
}
