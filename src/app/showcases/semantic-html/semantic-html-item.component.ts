import { Component, booleanAttribute, input } from "@angular/core";

/**
 * Demo list-item child.
 * - Element host: parent wraps with &lt;li&gt;, or set nestLi to put &lt;li&gt; in the view
 *   (ul → app-semantic-html-item → li — breaks list semantics).
 * - Attribute on li: selector matches native &lt;li app-semantic-html-item&gt;.
 */
@Component({
  selector: "app-semantic-html-item, li[app-semantic-html-item]",
  template: `
    @if (nestLi()) {
      <li class="item-label">{{ label() }}</li>
    } @else {
      <span class="item-label">{{ label() }}</span>
    }
  `,
  styles: `
    :host(app-semantic-html-item) {
      display: block;
    }
  `,
})
export class SemanticHtmlItemComponent {
  readonly label = input.required<string>();
  /** When true, renders &lt;li&gt; inside the host (invalid list structure). */
  readonly nestLi = input(false, { transform: booleanAttribute });
}
