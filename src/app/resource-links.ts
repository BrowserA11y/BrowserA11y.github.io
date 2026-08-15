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
} as const satisfies Record<string, readonly ResourceLink[]>;

export type ResourceLinkGroup = keyof typeof RESOURCE_LINKS;
