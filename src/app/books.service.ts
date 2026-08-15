import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Book {
  isbn: string;
  cover: string;
  title: string;
  abstract: string;
  author: string;
  publisher: string;
  numPages: number;
  price: string;
  available?: boolean;
  genres?: string[];
}

export const BOOKS_API_BASE = "http://localhost:3000";

@Injectable({
  providedIn: "root",
})
export class BooksService {
  private readonly http = inject(HttpClient);
  readonly booksUrl = `${BOOKS_API_BASE}/books`;

  bookUrl(isbn: string): string {
    return `${this.booksUrl}/${isbn}`;
  }

  create(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(`${this.booksUrl}/`, book);
  }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl);
  }

  removeBook(book: Book) {
    return this.http.delete(this.bookUrl(book.isbn));
  }

  getByIsbn(isbn: string): Observable<Book> {
    return this.http.get<Book>(this.bookUrl(isbn));
  }
}
