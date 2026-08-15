import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { InfoBoxComponent } from "../../shared/info-box/info-box.component";

@Component({
  selector: "app-accessible-name-and-description",
  templateUrl: "./accessible-name-and-description.component.html",
  styleUrls: ["./accessible-name-and-description.component.scss"],
  imports: [InfoBoxComponent, RouterLink],
})
export class AccessibleNameAndDescriptionComponent {}
