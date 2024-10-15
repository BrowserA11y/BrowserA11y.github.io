import { Routes } from "@angular/router";
import { AboutComponent } from "./app/about/about.component";
import { BookDetailComponent } from "./app/book-details/book-details.component";
import { BooksComponent } from "./app/books/books.component";
import { NewBookComponent } from "./app/new-book/new-book.component";

export const routes: Routes = [
  { path: "", redirectTo: "books", pathMatch: "full" },
  { path: "books", component: BooksComponent, title: "Books" }, //Angular focus 1 1: router titles
  { path: "new-book", component: NewBookComponent, title: "New Book" },
  {
    path: "details/:isbn",
    component: BookDetailComponent,
    title: "Book Details",
  },
  { path: "about", component: AboutComponent, title: "About" },
];
