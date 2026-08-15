import { FocusMonitor } from "@angular/cdk/a11y";
import { AsyncPipe } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  startWith,
  take,
} from "rxjs";
import { BookItemComponent } from "../books-item/book-item.component";
import { Book, BooksService } from "../books.service";

export const CATALOG_GENRES = ["Technical", "Reference", "Fiction"] as const;

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.scss"],
  imports: [BookItemComponent, RouterLink, AsyncPipe, ReactiveFormsModule],
  providers: [],
})
export class BooksComponent implements OnInit {
  private readonly bookService = inject(BooksService);
  private readonly focusMonitor = inject(FocusMonitor);
  private readonly formBuilder = inject(FormBuilder);

  private readonly booksSubject = new BehaviorSubject<Book[]>([]);
  private readonly wishlistIsbnsSubject = new BehaviorSubject<ReadonlySet<string>>(
    new Set()
  );

  readonly allBooks$: Observable<Book[]> = this.booksSubject.asObservable();

  readonly filterForm = this.formBuilder.nonNullable.group({
    search: [""],
    availableOnly: [false],
    wishlistOnly: [false],
    Technical: [true],
    Reference: [true],
    Fiction: [true],
  });

  readonly books$: Observable<Book[]> = combineLatest([
    this.allBooks$,
    this.filterForm.valueChanges.pipe(startWith(this.filterForm.getRawValue())),
    this.wishlistIsbnsSubject,
  ]).pipe(
    map(([books, filters, wishlistIsbns]) =>
      this.applyFilters(books, filters, wishlistIsbns)
    )
  );

  readonly genres = CATALOG_GENRES;

  get allGenresChecked(): boolean {
    return this.genres.every((genre) => this.filterForm.controls[genre].value);
  }

  get allGenresUnchecked(): boolean {
    return this.genres.every((genre) => !this.filterForm.controls[genre].value);
  }

  get allGenresPartial(): boolean {
    return !this.allGenresChecked && !this.allGenresUnchecked;
  }

  ngOnInit(): void {
    this.bookService
      .getAll()
      .pipe(take(1))
      .subscribe((books) => this.booksSubject.next(books));
  }

  isOnWishlist(isbn: string): boolean {
    return this.wishlistIsbnsSubject.value.has(isbn);
  }

  onWishlistChange(isbn: string, onWishlist: boolean) {
    const next = new Set(this.wishlistIsbnsSubject.value);
    if (onWishlist) {
      next.add(isbn);
    } else {
      next.delete(isbn);
    }
    this.wishlistIsbnsSubject.next(next);
  }

  onAllGenresChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    for (const genre of this.genres) {
      this.filterForm.controls[genre].setValue(checked);
    }
  }

  removeBook(bookToRemove: Book, i: number) {
    this.bookService
      .removeBook(bookToRemove)
      .pipe(take(1))
      .subscribe(() => {
        const books = [...this.booksSubject.value];
        const index = books.findIndex((book) => book.isbn === bookToRemove.isbn);
        if (index >= 0) {
          books.splice(index, 1);
          this.booksSubject.next(books);
        }
        this.onWishlistChange(bookToRemove.isbn, false);
        this.focusOnNextBook(i);
      });
  }

  private applyFilters(
    books: Book[],
    filters: Partial<{
      search: string;
      availableOnly: boolean;
      wishlistOnly: boolean;
      Technical: boolean;
      Reference: boolean;
      Fiction: boolean;
    }>,
    wishlistIsbns: ReadonlySet<string>
  ): Book[] {
    const query = (filters.search ?? "").trim().toLowerCase();
    const selectedGenres = this.genres.filter((genre) => filters[genre]);

    return books.filter((book) => {
      const matchesQuery =
        !query ||
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query);
      const matchesAvailability =
        !filters.availableOnly || book.available !== false;
      const matchesWishlist =
        !filters.wishlistOnly || wishlistIsbns.has(book.isbn);
      const bookGenres = book.genres ?? [];
      const matchesGenre =
        selectedGenres.length === 0 ||
        bookGenres.some((genre) =>
          selectedGenres.includes(genre as (typeof CATALOG_GENRES)[number])
        );
      return (
        matchesQuery && matchesAvailability && matchesWishlist && matchesGenre
      );
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
