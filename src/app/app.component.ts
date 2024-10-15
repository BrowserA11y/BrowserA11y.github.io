import { Component } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { filter } from "rxjs";
import { NavigationComponent } from "./navigation/navigation.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [RouterOutlet, NavigationComponent],
})
export class AppComponent {
  skipLinkPath = "";

  //Angular focus 4: Fix navigation - focus on the first header on the page + Alternative way to handle navigation
  constructor(private router: Router) {
    console.log(this.router.url);
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        // https://medium.com/@belwerks/a-quick-note-on-skip-links-in-angular-3641a0e32a7a
        this.skipLinkPath = `${this.router.url}#content`;
      });
  }
}
