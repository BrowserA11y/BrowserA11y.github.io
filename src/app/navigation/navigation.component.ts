import { Component, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NavigationEnd, Router, RouterLink } from "@angular/router";

/**https://inclusive-components.design/menus-menu-buttons/ */

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
  imports: [RouterLink],
})
export class NavigationComponent {
  private readonly router = inject(Router);

  isMenuOpen = false;
  menuItems = [
    { url: "new-book", title: "New book" },
    { url: "books", title: "Books" },
    { url: "about", title: "About Accessible Reads" },
  ];

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      // Close the menu upon navigation
      if (event instanceof NavigationEnd) this.isMenuOpen = false;
    });
  }

  onButtonClick() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
