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
];
