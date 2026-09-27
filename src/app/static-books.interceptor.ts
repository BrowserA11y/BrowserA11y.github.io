import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpResponse,
} from "@angular/common/http";
import { isDevMode } from "@angular/core";
import { from, of, switchMap, throwError } from "rxjs";
import { Book, BOOKS_API_BASE } from "./books.service";

type BookRecord = Book & { id?: string };

interface BooksDatabase {
  books: BookRecord[];
}

let catalog: BookRecord[] | undefined;

function withPublicCover(book: BookRecord): BookRecord {
  const isbn = book.isbn;
  return {
    ...book,
    cover: isbn
      ? `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
      : book.cover,
  };
}

function loadCatalog() {
  if (catalog) {
    return of(catalog);
  }

  const url = new URL("assets/api/books.json", document.baseURI).href;
  return from(fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to load books catalog (${response.status})`);
    }
    return response.json() as Promise<BooksDatabase>;
  })).pipe(
    switchMap((database) => {
      catalog = database.books.map(withPublicCover);
      return of(catalog);
    })
  );
}

function bookId(path: string): string | undefined {
  const match = path.match(/^\/books\/([^/]+)$/);
  return match?.[1];
}

function findBook(books: BookRecord[], id: string) {
  return books.find((book) => book.id === id || book.isbn === id);
}

export const staticBooksInterceptor: HttpInterceptorFn = (req, next) => {
  if (isDevMode() || !req.url.startsWith(BOOKS_API_BASE)) {
    return next(req);
  }

  const path = new URL(req.url).pathname.replace(/\/$/, "") || "/";

  return loadCatalog().pipe(
    switchMap((books) => {
      if (req.method === "GET" && path === "/books") {
        return of(new HttpResponse({ status: 200, body: books }));
      }

      const id = bookId(path);

      if (req.method === "GET" && id) {
        const book = findBook(books, id);
        if (!book) {
          return throwError(
            () => new HttpErrorResponse({ status: 404, url: req.url })
          );
        }
        return of(new HttpResponse({ status: 200, body: book }));
      }

      if (req.method === "POST" && path === "/books") {
        const payload = req.body as BookRecord;
        const created = withPublicCover({
          ...payload,
          id: payload.isbn ?? payload.id,
        });
        books.unshift(created);
        return of(new HttpResponse({ status: 201, body: created }));
      }

      if (req.method === "DELETE" && id) {
        const index = books.findIndex(
          (book) => book.id === id || book.isbn === id
        );
        if (index === -1) {
          return throwError(
            () => new HttpErrorResponse({ status: 404, url: req.url })
          );
        }
        const [removed] = books.splice(index, 1);
        return of(new HttpResponse({ status: 200, body: removed }));
      }

      return throwError(
        () => new HttpErrorResponse({ status: 404, url: req.url })
      );
    })
  );
};
