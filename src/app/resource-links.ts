export interface ResourceLink {
  label: string;
  href: string;
}

export const RESOURCE_LINKS = {
  accessibleNameAndDescription: [
    {
      label: "Accessible Name and Description Computation",
      href: "https://www.w3.org/TR/accname-1.2/",
    },
  ],
  semanticHtml: [
    {
      label: "Screen reader HTML support tables (TetraLogical)",
      href: "https://tetralogical.com/blog/2025/07/10/html-support/",
    },
    {
      label: "How many HTML elements can you think of?",
      href: "https://gweax.github.io/howmany/#html-elements",
    },
    {
      label: "HTML: The Bad Parts (HTMHell)",
      href: "https://www.htmhell.dev/adventcalendar/2023/13/",
    },
    {
      label: "s vs del in HTML (Stack Overflow)",
      href: "https://stackoverflow.com/questions/52113995/s-vs-del-in-html",
    },
    {
      label: "How Chrome Accessibility Works, Part 2 (Chromium Docs)",
      href: "https://chromium.googlesource.com/chromium/src/+/main/docs/accessibility/browser/how_a11y_works_2.md",
    },
    {
      label: "The caption element (HTML Standard)",
      href: "https://html.spec.whatwg.org/multipage/tables.html#the-caption-element",
    },
    {
      label: "Blink AddTableChildren (ax_node_object.cc)",
      href: "https://github.com/chromium/chromium/blob/main/third_party/blink/renderer/modules/accessibility/ax_node_object.cc#L5855",
    },
  ],
} as const satisfies Record<string, readonly ResourceLink[]>;

export type ResourceLinkGroup = keyof typeof RESOURCE_LINKS;
