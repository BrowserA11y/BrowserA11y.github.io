import { ComponentFixture, TestBed } from "@angular/core/testing";
import { within } from "@testing-library/dom";
import { MockProvider } from "ng-mocks";
import { of } from "rxjs";
import { BooksService } from "../books.service";
import { BookDetailComponent } from "./book-details.component";

const sampleBook = {
  isbn: "9780000000001",
  cover: "http://localhost:3000/covers/9780000000001.png",
  title: "The Great Gatsby",
  abstract: "A classic novel.",
  author: "F. Scott Fitzgerald",
  publisher: "Scribner",
  numPages: 180,
  price: "$10",
};

describe("BookDetailComponent", () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let view: ReturnType<typeof within>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetailComponent],
      providers: [
        MockProvider(BooksService, {
          getByIsbn: () => of(sampleBook),
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("isbn", sampleBook.isbn);
    fixture.detectChanges();
    view = within(fixture.nativeElement);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("gives the cover an accessible name from the book title", () => {
    const cover = view.getByRole("img", {
      name: /cover of the great gatsby/i,
    });
    expect(cover).toHaveAccessibleName(/cover of the great gatsby/i);
  });

  it("exposes labeled star ratings in a fieldset group", () => {
    expect(
      view.getByRole("group", { name: /rate this book/i })
    ).toBeInTheDocument();

    const threeStars = view.getByRole("radio", { name: /3 stars/i });
    expect(threeStars).toHaveAccessibleName(/3 stars/i);
    expect(threeStars).not.toBeChecked();

    threeStars.click();
    fixture.detectChanges();

    expect(view.getByRole("radio", { name: /3 stars/i })).toBeChecked();
  });
});
