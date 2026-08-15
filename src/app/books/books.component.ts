import { FocusMonitor } from "@angular/cdk/a11y";
import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { form, FormField } from "@angular/forms/signals";
import { RouterLink } from "@angular/router";
import { take } from "rxjs";
import { BookItemComponent } from "../books-item/book-item.component";
import { Book, BooksService } from "../books.service";

export const CATALOG_GENRES = ["Technical", "Reference", "Fiction"] as const;

type CatalogGenre = (typeof CATALOG_GENRES)[number];

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.scss"],
  imports: [BookItemComponent, RouterLink, FormField],
})
export class BooksComponent implements OnInit {
  private readonly bookService = inject(BooksService);
  private readonly focusMonitor = inject(FocusMonitor);

  private readonly allBooks = signal<Book[]>([]);
  private readonly wishlistIsbns = signal<ReadonlySet<string>>(new Set());

  readonly filterModel = signal({
    search: "",
    availableOnly: false,
    wishlistOnly: false,
    Technical: true,
    Reference: true,
    Fiction: true,
  });

  readonly filterForm = form(this.filterModel);

  readonly books = computed(() =>
    this.applyFilters(
      this.allBooks(),
      this.filterModel(),
      this.wishlistIsbns()
    )
  );

  readonly genres = CATALOG_GENRES;

  readonly allGenresChecked = computed(() =>
    this.genres.every((genre) => this.filterModel()[genre])
  );

  readonly allGenresUnchecked = computed(() =>
    this.genres.every((genre) => !this.filterModel()[genre])
  );

  readonly allGenresPartial = computed(
    () => !this.allGenresChecked() && !this.allGenresUnchecked()
  );

  ngOnInit(): void {
    this.bookService
      .getAll()
      .pipe(take(1))
      .subscribe((books) => this.allBooks.set(books));
  }

  genreField(genre: CatalogGenre) {
    return this.filterForm[genre];
  }

  isOnWishlist(isbn: string): boolean {
    return this.wishlistIsbns().has(isbn);
  }

  onWishlistChange(isbn: string, onWishlist: boolean) {
    const next = new Set(this.wishlistIsbns());
    if (onWishlist) {
      next.add(isbn);
    } else {
      next.delete(isbn);
    }
    this.wishlistIsbns.set(next);
  }

  onAllGenresChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.filterModel.update((current) => ({
      ...current,
      Technical: checked,
      Reference: checked,
      Fiction: checked,
    }));
  }

  removeBook(bookToRemove: Book, i: number) {
    this.bookService
      .removeBook(bookToRemove)
      .pipe(take(1))
      .subscribe(() => {
        this.allBooks.update((books) =>
          books.filter((book) => book.isbn !== bookToRemove.isbn)
        );
        this.onWishlistChange(bookToRemove.isbn, false);
        this.focusOnNextBook(i);
      });
  }

  private applyFilters(
    books: Book[],
    filters: {
      search: string;
      availableOnly: boolean;
      wishlistOnly: boolean;
      Technical: boolean;
      Reference: boolean;
      Fiction: boolean;
    },
    wishlistIsbns: ReadonlySet<string>
  ): Book[] {
    const query = filters.search.trim().toLowerCase();
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
          selectedGenres.includes(genre as CatalogGenre)
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
