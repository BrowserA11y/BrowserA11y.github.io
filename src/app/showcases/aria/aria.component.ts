import { Component, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { InfoBoxComponent } from "../../shared/info-box/info-box.component";

@Component({
  selector: "app-aria",
  templateUrl: "./aria.component.html",
  styleUrls: ["./aria.component.scss"],
  imports: [InfoBoxComponent, RouterLink],
})
export class AriaComponent {
  readonly selectedTab = signal<"overview" | "editions">("overview");
  readonly liveMessage = signal("Waiting for an update…");
  readonly liveCount = signal(0);
  readonly assertiveMessage = signal("");
  readonly showHiddenPanel = signal(true);

  activateFakeButton(): void {}

  selectTab(tab: "overview" | "editions"): void {
    this.selectedTab.set(tab);
  }

  onFakeButtonKeydown(event: KeyboardEvent): void {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.activateFakeButton();
    }
  }

  postLiveUpdate(): void {
    const next = this.liveCount() + 1;
    this.liveCount.set(next);
    this.liveMessage.set(
      next === 1
        ? "1 book reserved."
        : `${next} books reserved.`
    );
  }

  clearLiveUpdate(): void {
    this.liveCount.set(0);
    this.liveMessage.set("Waiting for an update…");
  }

  emitError(): void {
    this.assertiveMessage.set("Connection lost — changes may not be saved.");
  }

  clearAssertiveMessage(): void {
    this.assertiveMessage.set("");
  }

  toggleHiddenPanel(): void {
    this.showHiddenPanel.update((v) => !v);
  }
}
