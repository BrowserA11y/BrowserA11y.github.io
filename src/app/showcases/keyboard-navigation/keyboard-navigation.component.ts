import { Component, ElementRef, viewChild } from "@angular/core";
import { RouterLink } from "@angular/router";
import { InfoBoxComponent } from "../../shared/info-box/info-box.component";

@Component({
  selector: "app-keyboard-navigation",
  templateUrl: "./keyboard-navigation.component.html",
  styleUrls: ["./keyboard-navigation.component.scss"],
  imports: [InfoBoxComponent, RouterLink],
})
export class KeyboardNavigationComponent {
  private readonly onlyFocusableTarget =
    viewChild<ElementRef<HTMLParagraphElement>>("onlyFocusable");

  focusOnlyFocusable(): void {
    this.onlyFocusableTarget()?.nativeElement.focus();
  }

  onClick(): void {
    alert("Clicked!");
  }
}
