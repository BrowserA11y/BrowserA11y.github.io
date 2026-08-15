import { Component, computed, inject, signal } from "@angular/core";
import {
  form,
  FormField,
  FormRoot,
  maxLength,
  pattern,
  required,
} from "@angular/forms/signals";
import { firstValueFrom } from "rxjs";
import { BooksService } from "../books.service";

@Component({
  selector: "app-new-book",
  templateUrl: "./new-book.component.html",
  styleUrls: ["./new-book.component.scss"],
  imports: [FormField, FormRoot],
})
export class NewBookComponent {
  private readonly bookService = inject(BooksService);

  readonly bookModel = signal({
    isbn: "",
    title: "",
    cover: "",
    author: "",
    abstract: "",
  });

  readonly newForm = form(
    this.bookModel,
    (s) => {
      required(s.isbn, { message: "Please insert an ISBN." });
      maxLength(s.isbn, 13);
      pattern(s.isbn, /^\d+$/, {
        message: "ISBN must contain digits only.",
      });
      required(s.title, { message: "Please insert a title." });
    },
    {
      submission: {
        action: async () => {
          await firstValueFrom(
            this.bookService.create({
              ...this.bookModel(),
              price: "$0.00",
            })
          );
        },
      },
    }
  );

  readonly isbnInvalid = computed(() => {
    const isbn = this.newForm.isbn();
    return isbn.touched() && isbn.invalid();
  });

  readonly isbnRequiredError = computed(() => {
    const isbn = this.newForm.isbn();
    return isbn.touched() && !!isbn.getError("required");
  });

  readonly isbnPatternError = computed(() => {
    const isbn = this.newForm.isbn();
    return isbn.touched() && !!isbn.getError("pattern");
  });

  readonly titleInvalid = computed(() => {
    const title = this.newForm.title();
    return title.touched() && title.invalid();
  });

  readonly titleShowsError = computed(() => {
    const title = this.newForm.title();
    return title.touched() && !!title.getError("required");
  });
}
