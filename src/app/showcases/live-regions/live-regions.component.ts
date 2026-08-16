import { LiveAnnouncer } from "@angular/cdk/a11y";
import {
  Component,
  DestroyRef,
  inject,
  signal,
  WritableSignal,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { InfoBoxComponent } from "../../shared/info-box/info-box.component";

@Component({
  selector: "app-live-regions",
  templateUrl: "./live-regions.component.html",
  styleUrls: ["./live-regions.component.scss"],
  imports: [InfoBoxComponent, RouterLink],
})
export class LiveRegionsComponent {
  private readonly liveAnnouncer = inject(LiveAnnouncer);
  private readonly destroyRef = inject(DestroyRef);

  private partialIntervalId: ReturnType<typeof setInterval> | null = null;
  private atomicIntervalId: ReturnType<typeof setInterval> | null = null;
  private busyTimeoutId: ReturnType<typeof setTimeout> | null = null;

  readonly score = signal(0);
  readonly partialSeconds = signal(10);
  readonly atomicSeconds = signal(10);
  readonly partialRunning = signal(false);
  readonly atomicRunning = signal(false);
  readonly defaultUsers = signal<readonly string[]>([
    "Alex Rivera",
    "Sam Chen",
  ]);
  readonly relevantUsers = signal<readonly string[]>([
    "Alex Rivera",
    "Sam Chen",
  ]);
  readonly contentBusy = signal(false);
  readonly showDeferredBooks = signal(false);
  readonly structuredLiveVisible = signal(false);
  readonly plainLiveMessage = signal("");
  readonly lateLiveOpen = signal(false);
  readonly earlyLiveOpen = signal(false);
  readonly earlyLiveMessage = signal("");

  private readonly namePool = [
    "Jordan Lee",
    "Casey Morgan",
    "Riley Patel",
    "Quinn Brooks",
    "Taylor Kim",
  ];

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.stopPartialTimer();
      this.stopAtomicTimer();
      this.clearBusyTimeout();
    });
  }

  increaseScore(): void {
    this.score.update((n) => n + 1);
  }

  resetScore(): void {
    this.score.set(0);
  }

  togglePartialTimer(): void {
    if (this.partialRunning()) {
      this.stopPartialTimer();
      return;
    }
    this.partialSeconds.set(10);
    this.partialRunning.set(true);
    this.partialIntervalId = setInterval(() => {
      const next = this.partialSeconds() - 1;
      if (next <= 0) {
        this.partialSeconds.set(0);
        this.stopPartialTimer();
        return;
      }
      this.partialSeconds.set(next);
    }, 1000);
  }

  toggleAtomicTimer(): void {
    if (this.atomicRunning()) {
      this.stopAtomicTimer();
      return;
    }
    this.atomicSeconds.set(10);
    this.atomicRunning.set(true);
    this.atomicIntervalId = setInterval(() => {
      const next = this.atomicSeconds() - 1;
      if (next <= 0) {
        this.atomicSeconds.set(0);
        this.stopAtomicTimer();
        return;
      }
      this.atomicSeconds.set(next);
    }, 1000);
  }

  addDefaultUser(): void {
    this.addUserTo(this.defaultUsers);
  }

  removeDefaultUser(): void {
    this.removeUserFrom(this.defaultUsers);
  }

  addRelevantUser(): void {
    this.addUserTo(this.relevantUsers);
  }

  removeRelevantUser(): void {
    this.removeUserFrom(this.relevantUsers);
  }

  showStructuredLive(): void {
    this.structuredLiveVisible.set(false);
    queueMicrotask(() => this.structuredLiveVisible.set(true));
  }

  showPlainLive(): void {
    this.plainLiveMessage.set("");
    queueMicrotask(() =>
      this.plainLiveMessage.set(
        "Reservation confirmed. Use View receipt on the page to continue."
      )
    );
  }

  toggleLateLive(): void {
    this.lateLiveOpen.update((open) => !open);
  }

  toggleEarlyLive(): void {
    if (this.earlyLiveOpen()) {
      this.earlyLiveOpen.set(false);
      this.earlyLiveMessage.set("");
      return;
    }
    // Mount the disclosed widget with an empty live region first…
    this.earlyLiveMessage.set("");
    this.earlyLiveOpen.set(true);
    // …then update after paint so assistive tech observes a text change.
    setTimeout(() => {
      this.earlyLiveMessage.set("Filter applied: 12 books match.");
    }, 0);
  }

  loadWithBusy(): void {
    this.clearBusyTimeout();
    this.contentBusy.set(true);
    this.busyTimeoutId = setTimeout(() => {
      this.contentBusy.set(false);
      this.busyTimeoutId = null;
    }, 2500);
  }

  announceFeedback(): void {
    void this.liveAnnouncer.announce("Successfully saved");
  }

  loadDeferredBooks(): void {
    this.showDeferredBooks.set(false);
    queueMicrotask(() => this.showDeferredBooks.set(true));
  }

  private addUserTo(users: WritableSignal<readonly string[]>): void {
    const current = users();
    const nextName = this.namePool.find((name) => !current.includes(name));
    if (!nextName) {
      return;
    }
    users.set([...current, nextName]);
  }

  private removeUserFrom(users: WritableSignal<readonly string[]>): void {
    const current = users();
    if (current.length === 0) {
      return;
    }
    users.set(current.slice(0, -1));
  }

  private stopPartialTimer(): void {
    if (this.partialIntervalId !== null) {
      clearInterval(this.partialIntervalId);
      this.partialIntervalId = null;
    }
    this.partialRunning.set(false);
  }

  private stopAtomicTimer(): void {
    if (this.atomicIntervalId !== null) {
      clearInterval(this.atomicIntervalId);
      this.atomicIntervalId = null;
    }
    this.atomicRunning.set(false);
  }

  private clearBusyTimeout(): void {
    if (this.busyTimeoutId !== null) {
      clearTimeout(this.busyTimeoutId);
      this.busyTimeoutId = null;
    }
  }
}
