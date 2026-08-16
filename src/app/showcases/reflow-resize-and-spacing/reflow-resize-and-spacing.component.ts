import { Component, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { InfoBoxComponent } from "../../shared/info-box/info-box.component";

@Component({
  selector: "app-reflow-resize-and-spacing",
  templateUrl: "./reflow-resize-and-spacing.component.html",
  styleUrls: ["./reflow-resize-and-spacing.component.scss"],
  imports: [InfoBoxComponent, RouterLink],
})
export class ReflowResizeAndSpacingComponent {
  readonly fontScale = signal(1);
  readonly spacingOn = signal(false);
  readonly bannerVisible = signal(true);

  increaseFont(): void {
    this.fontScale.update((n) =>
      Math.min(2, Math.round((n + 0.25) * 100) / 100)
    );
  }

  decreaseFont(): void {
    this.fontScale.update((n) =>
      Math.max(1, Math.round((n - 0.25) * 100) / 100)
    );
  }

  resetFont(): void {
    this.fontScale.set(1);
  }

  toggleSpacing(): void {
    this.spacingOn.update((on) => !on);
  }

  dismissBanner(): void {
    this.bannerVisible.set(false);
  }

  showBanner(): void {
    this.bannerVisible.set(true);
  }
}
