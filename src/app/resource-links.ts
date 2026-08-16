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
    {
      label: "ARIA Authoring Practices: Naming",
      href: "https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/",
    },
    {
      label: "Using aria-labelledby (WAI-ARIA practices)",
      href: "https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/#naming_with_aria-labelledby",
    },
    {
      label: "Accessible name (MDN Glossary)",
      href: "https://developer.mozilla.org/en-US/docs/Glossary/Accessible_name",
    },
    {
      label: "accname unclarified (HTML Accessibility)",
      href: "https://html5accessibility.com/stuff/2025/06/12/accname-unclarified/",
    },
    {
      label: "Don’t use aria-label on static text elements (Ben Myers)",
      href: "https://benmyers.dev/blog/dont-use-aria-label-on-static-text-elements/",
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
  aria: [
    {
      label: "WAI-ARIA Authoring Practices Guide (APG)",
      href: "https://www.w3.org/WAI/ARIA/apg/",
    },
    {
      label: "ARIA in HTML (W3C)",
      href: "https://www.w3.org/TR/html-aria/",
    },
    {
      label: "Using ARIA (W3C Note)",
      href: "https://www.w3.org/TR/using-aria/",
    },
    {
      label: "ARIA roles (MDN)",
      href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles",
    },
  ],
} as const satisfies Record<string, readonly ResourceLink[]>;

export type ResourceLinkGroup = keyof typeof RESOURCE_LINKS;
