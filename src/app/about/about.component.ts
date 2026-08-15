import { AsyncPipe, DecimalPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Observable, map } from "rxjs";
import { Book, BooksService } from "../books.service";

interface BookStats {
  numberOfBooks: number;
  numberOfAuthors: number;
  numberOfPublishers: number;
  numberOfPages: number;
  value: number;
}

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
  imports: [RouterLink, AsyncPipe, DecimalPipe],
})
export class AboutComponent {
  private readonly bookService = inject(BooksService);
  readonly bookStats$: Observable<BookStats> = this.getBookStats();

  private getBookStats(): Observable<BookStats> {
    return this.bookService
      .getAll()
      .pipe(map((books) => mapBooksToStats(books)));
  }
}

const mapBooksToStats = (books: Book[]): BookStats => {
  const numberOfAuthors = new Set();
  const numberOfPublishers = new Set();
  let numberOfPages = 0;
  let value = 0;
  books.forEach((book) => {
    numberOfAuthors.add(book.author);
    numberOfPublishers.add(book.publisher);
    numberOfPages = numberOfPages + book.numPages;
    value = value + mapPriceStringToDigits(book.price);
  });
  return {
    numberOfBooks: books.length,
    numberOfAuthors: numberOfAuthors.size,
    numberOfPublishers: numberOfPublishers.size,
    numberOfPages: numberOfPages,
    value: value,
  };
};

const mapPriceStringToDigits = (priceString: string) => {
  const priceWithout$ = priceString.substring(1);
  return +priceWithout$;
};
