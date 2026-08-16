import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", redirectTo: "books", pathMatch: "full" },
  {
    path: "books",
    loadComponent: () =>
      import("./app/books/books.component").then((m) => m.BooksComponent),
    title: "Books", //Angular focus 1 1: router titles
  },
  {
    path: "new-book",
    loadComponent: () =>
      import("./app/new-book/new-book.component").then((m) => m.NewBookComponent),
    title: "New Book",
  },
  {
    path: "details/:isbn",
    loadComponent: () =>
      import("./app/book-details/book-details.component").then(
        (m) => m.BookDetailComponent
      ),
    title: "Book Details",
  },
  {
    path: "about",
    loadComponent: () =>
      import("./app/about/about.component").then((m) => m.AboutComponent),
    title: "About",
  },
  {
    path: "showcases",
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./app/showcases/showcases.component").then(
            (m) => m.ShowcasesComponent
          ),
        title: "Showcases",
      },
      {
        path: "accessible-name-and-description",
        loadComponent: () =>
          import(
            "./app/showcases/accessible-name-and-description/accessible-name-and-description.component"
          ).then((m) => m.AccessibleNameAndDescriptionComponent),
        title: "Accessible name and description",
      },
      {
        path: "semantic-html",
        loadComponent: () =>
          import("./app/showcases/semantic-html/semantic-html.component").then(
            (m) => m.SemanticHtmlComponent
          ),
        title: "Semantic HTML",
      },
      {
        path: "aria",
        loadComponent: () =>
          import("./app/showcases/aria/aria.component").then(
            (m) => m.AriaComponent
          ),
        title: "ARIA",
      },
      {
        path: "hiding-elements",
        loadComponent: () =>
          import(
            "./app/showcases/hiding-elements/hiding-elements.component"
          ).then((m) => m.HidingElementsComponent),
        title: "Hiding elements",
      },
      {
        path: "live-regions",
        loadComponent: () =>
          import("./app/showcases/live-regions/live-regions.component").then(
            (m) => m.LiveRegionsComponent
          ),
        title: "Live regions",
      },
      {
        path: "reflow-resize-and-spacing",
        loadComponent: () =>
          import(
            "./app/showcases/reflow-resize-and-spacing/reflow-resize-and-spacing.component"
          ).then((m) => m.ReflowResizeAndSpacingComponent),
        title: "Reflow, Resize and Spacing",
      },
    ],
  },
];

