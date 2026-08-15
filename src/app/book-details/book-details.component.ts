import { Component, inject, input } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { BooksService } from "../books.service";

@Component({
  selector: "app-book-detail",
  templateUrl: "./book-details.component.html",
  styleUrl: "./book-details.component.scss",
})
export class BookDetailComponent {
  private readonly bookApi = inject(BooksService);

  readonly isbn = input.required<string>();
  readonly bookResource = rxResource({
    params: () => this.isbn(),
    stream: ({ params: isbn }) => this.bookApi.getByIsbn(isbn),
  });

  ratings = ["rating1", "rating2", "rating3", "rating4", "rating5"];
  selectedRating = 0;

  handleRating(rating: number) {
    this.selectedRating = rating;
  }
}
