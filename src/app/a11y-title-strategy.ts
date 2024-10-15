import { LiveAnnouncer } from "@angular/cdk/a11y";
import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";
@Injectable({ providedIn: "root" })
export class DashboardTitleResolver {
  resolve() {
    return Promise.resolve("My dashboard");
  }
}
@Injectable()
export class CustomTitleStrategy extends TitleStrategy {
  constructor(
    private readonly title: Title,
    private liveAnnouncer: LiveAnnouncer
  ) {
    super();
  }
  override updateTitle(routerState: RouterStateSnapshot): void {
    const title = this.buildTitle(routerState);
    this.liveAnnouncer.announce(title || "");
    console.log(title);
    //Angular focus 5: Workaround: https://github.com/angular/angular/issues/46179
    // cdk-live-announcer-element cdk-visually-hidden
    if (title !== undefined) {
      this.title.setTitle(title);
    } else {
      this.title.setTitle(
        `Accessible Reads - a website about accessible books`
      );
    }
  }
}
