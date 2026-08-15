import { provideHttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { ApplicationRef } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { within } from "@testing-library/dom";
import { axe } from "vitest-axe";
import { BOOKS_API_BASE } from "../books.service";
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
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetailComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("isbn", sampleBook.isbn);
    fixture.detectChanges();

    httpMock
      .expectOne(`${BOOKS_API_BASE}/books/${sampleBook.isbn}`)
      .flush(sampleBook);
    await TestBed.inject(ApplicationRef).whenStable();
    fixture.detectChanges();
    view = within(fixture.nativeElement);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should create", async () => {
    expect(component).toBeTruthy();
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });

  it("gives the cover an accessible name from the book title", () => {
    expect(view.getByAltText(/cover of the great gatsby/i)).toBeVisible();
    expect(
      view.getByRole("heading", { level: 1, name: /the great gatsby/i })
    ).toBeVisible();
    expect(view.getByText("A classic novel.")).toBeVisible();
  });

  it("exposes labeled star ratings in a fieldset group", () => {
    expect(
      view.getByRole("group", { name: /rate this book/i })
    ).toBeInTheDocument();

    const threeStars = view.getByLabelText(/3 stars/i);
    expect(threeStars).not.toBeChecked();

    threeStars.click();
    fixture.detectChanges();

    expect(view.getByLabelText(/3 stars/i)).toBeChecked();
  });
});
