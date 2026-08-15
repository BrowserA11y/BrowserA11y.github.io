import { Component, computed, input } from "@angular/core";
import {
  RESOURCE_LINKS,
  ResourceLinkGroup,
} from "../../resource-links";

@Component({
  selector: "app-info-box",
  templateUrl: "./info-box.component.html",
  styleUrls: ["./info-box.component.scss"],
})
export class InfoBoxComponent {
  readonly group = input.required<ResourceLinkGroup>();

  readonly links = computed(() => RESOURCE_LINKS[this.group()]);
}
