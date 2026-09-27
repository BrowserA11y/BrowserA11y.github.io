import { inject, Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ResolveFn, RouterStateSnapshot, TitleStrategy } from "@angular/router";
import { catchError, map, of } from "rxjs";
import { BooksService } from "./books.service";

/** Resolves the document title from the book for `details/:isbn`. */
export const bookTitleResolver: ResolveFn<string> = (route) => {
  const isbn = route.paramMap.get("isbn");
  if (!isbn) {
    return "Book Details";
  }

  return inject(BooksService)
    .getByIsbn(isbn)
    .pipe(
      map((book) => book.title),
      catchError(() => of("Book Details"))
    );
};

@Injectable()
export class CustomTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);

  override updateTitle(routerState: RouterStateSnapshot): void {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(title);
    } else {
      this.title.setTitle(
        `Accessible Reads - a website about accessible books`
      );
    }
  }
}
