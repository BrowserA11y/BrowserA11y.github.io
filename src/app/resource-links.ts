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
  hidingElements: [
    {
      label: "How is CSS pseudo-content treated by screen readers?",
      href: "https://accessibleweb.com/question-answer/how-is-css-pseudo-content-treated-by-screen-readers/",
    },
    {
      label: "Invisible Content (WebAIM)",
      href: "https://webaim.org/techniques/css/invisiblecontent/",
    },
    {
      label: "CSS content & accessibility (CodePen)",
      href: "https://codepen.io/vincent-valentin/full/JjGmxzV",
    },
    {
      label: "Angular CDK a11y visually-hidden",
      href: "https://github.com/angular/components/blob/main/src/cdk/a11y/_index.scss",
    },
  ],
  liveRegions: [
    {
      label: "ARIA live regions (MDN)",
      href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions",
    },
    {
      label: "Accessible notifications with ARIA live regions (Sara Soueidan)",
      href: "https://www.sarasoueidan.com/blog/accessible-notifications-with-aria-live-regions-part-1/",
    },
    {
      label: "ARIA Live-Regionen (tollwerk)",
      href: "https://tollwerk.de/projekte/tipps-techniken-inklusiv-barrierefrei/aria-live-regionen",
    },
    {
      label: "aria-busy (MDN)",
      href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-busy",
    },
    {
      label: "Live-Regionen Attribute (barrierefreies-webdesign)",
      href: "https://www.barrierefreies-webdesign.de/knowhow/live-regions/attribute.html",
    },
    {
      label: "More Accessible Skeletons (Adrian Roselli)",
      href: "https://adrianroselli.com/2020/11/more-accessible-skeletons.html",
    },
    {
      label: "Angular CDK LiveAnnouncer",
      href: "https://material.angular.io/cdk/a11y/overview#liveannouncer",
    },
    {
      label: "Creating a more accessible web with Aria Notify (Edge Blog)",
      href: "https://blogs.windows.com/msedgedev/2025/05/05/creating-a-more-accessible-web-with-aria-notify/",
    },
  ],
  reflowResizeAndSpacing: [
    {
      label: "Designing for User Font-size and Zoom (OddBird)",
      href: "https://www.oddbird.net/2025/07/22/size-preferences/",
    },
    {
      label: "Stylus user styles (GitHub README)",
      href: "https://github.com/openstyles/stylus/blob/master/README.md",
    },
    {
      label: "How browsers zoom text (matuzo.at)",
      href: "https://www.matuzo.at/blog/2023/how-browsers-zoom-text",
    },
    {
      label: "Zooming & Scaling Disabled or Not? (WebAIM list)",
      href: "https://webaim.org/discussion/mail_thread?thread=11234",
    },
    {
      label: "The Surprising Truth About Pixels and Accessibility",
      href: "https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/",
    },
    {
      label: "Font size dimensions (Donnie D’Amato)",
      href: "https://blog.damato.design/posts/font-size-dimensions/",
    },
    {
      label: "Customizing the display (Web Accessibility Guidelines)",
      href: "https://stevenmouret.github.io/web-accessibility-guidelines/accessibility/presentation-of-information/customizing-the-display.html",
    },
  ],
} as const satisfies Record<string, readonly ResourceLink[]>;

export type ResourceLinkGroup = keyof typeof RESOURCE_LINKS;
