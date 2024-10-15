import { FocusMonitor } from "@angular/cdk/a11y";

import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { take } from "rxjs";
import { BookItemComponent } from "../books-item/book-item.component";
import { Book, BooksService } from "../books.service";

@Component({
    selector: "app-books",
    templateUrl: "./books.component.html",
    styleUrls: ["./books.component.scss"],
    imports: [BookItemComponent, RouterLink],
    providers: []
})
export class BooksComponent implements OnInit {
  public books!: Book[];

  constructor(
    private bookService: BooksService,
    private focusMonitor: FocusMonitor
  ) {}

  ngOnInit(): void {
    this.bookService
      .getAll()
      .subscribe((books: Book[]) => (this.books = books));
  }

  removeBook(bookToRemove: Book, i: number) {
    this.bookService
      .removeBook(bookToRemove)
      .pipe(take(1))
      .subscribe(() => {
        this.books.splice(i, 1);
        this.focusOnNextBook(i);
      });
  }

  private focusOnNextBook(i: number) {
    // Nur in browser
    let nextBook = document.getElementById((i + 1).toString());
    if (!nextBook) {
      // If there is no next element (last element deleted) take the previous one)
      nextBook = document.getElementById((i - 1).toString());
    }
    if (!nextBook) {
      // Fallback: focus on main
      nextBook = document.getElementById("main");
    }
    console.log(nextBook);
    // Was kann man denn hier focussieren?
    // https://allyjs.io/data-tables/focusable.html
    // Or use InteractivityChecker
    // if (nextBook) nextBook.getElementsByTagName('button')[0].focus();
    if (nextBook && nextBook.getElementsByTagName("button")[0])
      this.focusMonitor.focusVia(
        nextBook.getElementsByTagName("button")[0] as HTMLElement,
        "keyboard"
      );
  }
}
