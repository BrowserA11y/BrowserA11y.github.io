import { Component, EventEmitter, Input, Output } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Book } from "../books.service";

@Component({
    selector: "app-book-item",
    templateUrl: "./book-item.component.html",
    styleUrls: ["./book-item.component.scss"],
    imports: [RouterLink]
})
export class BookItemComponent {
  @Input() public book?: Book;
  @Output() private bookRemoved = new EventEmitter<void>();

  removeBook() {
    this.bookRemoved.emit();
  }
}
