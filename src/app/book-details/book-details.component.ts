import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, BooksService } from '../books.service';

@Component({
    selector: 'app-book-detail',
    imports: [AsyncPipe],
    templateUrl: './book-details.component.html',
    styleUrl: './book-details.component.scss'
})
export class BookDetailComponent {
  book$!: Observable<Book>;
  ratings = ['rating1', 'rating2', 'rating3', 'rating4', 'rating5'];

  constructor(private readonly bookApi: BooksService) {}

  @Input({ required: true })
  set isbn(isbn: string) {
    console.log(isbn);
    this.book$ = this.bookApi.getByIsbn(isbn);
  }

  handleRating(rating: number) {
    console.log(rating);
  }
}
