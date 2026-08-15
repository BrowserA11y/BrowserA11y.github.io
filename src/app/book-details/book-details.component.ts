import { AsyncPipe } from "@angular/common";
import { Component, inject, input } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { switchMap } from "rxjs";
import { BooksService } from "../books.service";

@Component({
  selector: "app-book-detail",
  imports: [AsyncPipe],
  templateUrl: "./book-details.component.html",
  styleUrl: "./book-details.component.scss",
})
export class BookDetailComponent {
  private readonly bookApi = inject(BooksService);

  readonly isbn = input.required<string>();
  readonly book$ = toObservable(this.isbn).pipe(
    switchMap((isbn) => this.bookApi.getByIsbn(isbn))
  );

  ratings = ["rating1", "rating2", "rating3", "rating4", "rating5"];
  selectedRating = 0;

  handleRating(rating: number) {
    this.selectedRating = rating;
  }
}
