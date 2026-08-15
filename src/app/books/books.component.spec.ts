import { provideHttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { ApplicationRef } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { within } from "@testing-library/dom";
import { axe } from "vitest-axe";
import { BOOKS_API_BASE } from "../books.service";
import { BooksComponent } from "./books.component";

const sampleBooks = [
  {
    isbn: "1",
    cover: "",
    title: "The Great Gatsby",
    abstract: "A classic novel.",
    author: "F. Scott Fitzgerald",
    publisher: "Scribner",
    numPages: 180,
    price: "$10",
    available: true,
    genres: ["Fiction"],
  },
  {
    isbn: "2",
    cover: "",
    title: "You Don't Know JS",
    abstract: "Deep JS.",
    author: "Kyle Simpson",
    publisher: "O'Reilly",
    numPages: 278,
    price: "$20",
    available: false,
    genres: ["Technical"],
  },
  {
    isbn: "3",
    cover: "",
    title: "Designing Interfaces",
    abstract: "UI patterns.",
    author: "Jenifer Tidwell",
    publisher: "O'Reilly",
    numPages: 300,
    price: "$25",
    available: true,
    genres: ["Reference", "Technical"],
  },
  {
    isbn: "4",
    cover: "",
    title: "Untitled Draft",
    abstract: "No genres assigned.",
    author: "Anonymous",
    publisher: "",
    numPages: 10,
    price: "$1",
    available: true,
  },
];

describe("BooksComponent", () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let view: ReturnType<typeof within>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpMock.expectOne(`${BOOKS_API_BASE}/books`).flush(sampleBooks);
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

  it("labels search and describes live filtering", () => {
    const search = view.getByRole("searchbox", { name: /search books/i });
    expect(search).toHaveAccessibleName(/search books/i);
    expect(search).toHaveAccessibleDescription(/results update as you type/i);
  });

  it("filters by search, availability, and form values", () => {
    const search = view.getByRole("searchbox", { name: /search books/i });

    component.filterForm.search().value.set("gatsby");
    fixture.detectChanges();

    expect(search).toHaveDisplayValue("gatsby");
    expect(
      view.getByRole("heading", { name: /the great gatsby/i })
    ).toBeInTheDocument();
    expect(
      view.queryByRole("heading", { name: /you don't know js/i })
    ).not.toBeInTheDocument();
    expect(view.getByRole("form", { name: /filter books/i })).toBeVisible();

    component.filterForm.search().value.set("");
    component.filterForm.availableOnly().value.set(true);
    fixture.detectChanges();

    expect(view.getByRole("checkbox", { name: /available only/i })).toBeChecked();
    expect(
      view.queryByRole("heading", { name: /you don't know js/i })
    ).not.toBeInTheDocument();
    expect(
      view.getByRole("heading", { name: /the great gatsby/i })
    ).toBeInTheDocument();
  });

  it("supports partially checked all-genres control", () => {
    const allGenres = view.getByRole("checkbox", { name: /all genres/i });
    expect(allGenres).toBeChecked();
    expect(allGenres).not.toBePartiallyChecked();

    view.getByRole("checkbox", { name: /^fiction$/i }).click();
    fixture.detectChanges();

    expect(allGenres).toBePartiallyChecked();

    allGenres.click();
    fixture.detectChanges();
    expect(allGenres).toBeChecked();
  });

  it("includes books without genres when all genres are selected", () => {
    expect(
      view.getByRole("heading", { name: /untitled draft/i })
    ).toBeInTheDocument();

    view.getByRole("checkbox", { name: /^fiction$/i }).click();
    fixture.detectChanges();

    expect(
      view.queryByRole("heading", { name: /untitled draft/i })
    ).not.toBeInTheDocument();

    view.getByRole("checkbox", { name: /all genres/i }).click();
    fixture.detectChanges();

    expect(
      view.getByRole("heading", { name: /untitled draft/i })
    ).toBeInTheDocument();
  });

  it("filters to wishlist books only", () => {
    component.onWishlistChange("1", true);
    component.filterForm.wishlistOnly().value.set(true);
    fixture.detectChanges();

    expect(view.getByRole("checkbox", { name: /on my wishlist/i })).toBeChecked();
    expect(
      view.getByRole("heading", { name: /the great gatsby/i })
    ).toBeInTheDocument();
    expect(
      view.queryByRole("heading", { name: /you don't know js/i })
    ).not.toBeInTheDocument();
    expect(
      view.getByRole("button", {
        name: /remove the great gatsby from wishlist/i,
      })
    ).toBePressed();
  });

  it("shows an empty state when filters return no results", () => {
    component.filterForm.search().value.set("zzzz-no-match");
    fixture.detectChanges();

    const liveRegion = fixture.nativeElement.querySelector(".books-empty");
    expect(liveRegion).toHaveAttribute("aria-live", "assertive");
    expect(liveRegion).toHaveTextContent(/no books match your filters/i);
    expect(liveRegion).not.toHaveClass("visually-hidden");
    expect(liveRegion).toHaveClass("books-empty--visible");
    expect(view.queryByRole("list")).toBeEmptyDOMElement();
    expect(
      view.queryByRole("heading", { name: /the great gatsby/i })
    ).not.toBeInTheDocument();
  });

  it("announces matching book counts politely", () => {
    const liveRegion = fixture.nativeElement.querySelector(".books-empty");

    expect(liveRegion).toHaveAttribute("aria-live", "polite");
    expect(liveRegion).toHaveTextContent(/4 books match your filters/i);
    expect(liveRegion).toHaveClass("visually-hidden");

    component.filterForm.search().value.set("gatsby");
    fixture.detectChanges();

    expect(liveRegion).toHaveAttribute("aria-live", "polite");
    expect(liveRegion).toHaveTextContent(/1 book matches your filters/i);
    expect(liveRegion).toHaveClass("visually-hidden");
  });
});
