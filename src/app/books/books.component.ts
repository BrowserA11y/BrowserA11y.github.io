import { FocusMonitor } from "@angular/cdk/a11y";
import { AsyncPipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { BehaviorSubject, Observable, take } from "rxjs";
import { BookItemComponent } from "../books-item/book-item.component";
import { Book, BooksService } from "../books.service";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.scss"],
  imports: [BookItemComponent, RouterLink, AsyncPipe],
  providers: [],
})
export class BooksComponent implements OnInit {
  private readonly booksSubject = new BehaviorSubject<Book[]>([]);
  readonly books$: Observable<Book[]> = this.booksSubject.asObservable();

  constructor(
    private bookService: BooksService,
    private focusMonitor: FocusMonitor
  ) {}

  ngOnInit(): void {
    this.bookService
      .getAll()
      .pipe(take(1))
      .subscribe((books) => this.booksSubject.next(books));
  }

  removeBook(bookToRemove: Book, i: number) {
    this.bookService
      .removeBook(bookToRemove)
      .pipe(take(1))
      .subscribe(() => {
        const books = [...this.booksSubject.value];
        books.splice(i, 1);
        this.booksSubject.next(books);
        this.focusOnNextBook(i);
      });
  }

  private focusOnNextBook(i: number) {
    let nextBook = document.getElementById((i + 1).toString());
    if (!nextBook) {
      // If there is no next element (last element deleted) take the previous one
      nextBook = document.getElementById((i - 1).toString());
    }
    const nextButton = nextBook?.getElementsByTagName("button")[0] as
      | HTMLElement
      | undefined;
    if (nextButton) {
      this.focusMonitor.focusVia(nextButton, "keyboard");
      return;
    }
    // Fallback: focus main content landmark
    const main = document.getElementById("content");
    if (main) {
      this.focusMonitor.focusVia(main, "keyboard");
    }
  }
}
