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
    const search = view.getByLabelText(/search books/i);

    expect(search).toHaveAccessibleDescription(/results update as you type/i);
    expect(view.getByText(/results update as you type/i)).toBeVisible();
    expect(view.getByRole("search", { name: /filter books/i })).toBeVisible();
    expect(view.getByText(/4 books match your filters/i)).toHaveAttribute(
      "aria-atomic",
      "true"
    );
  });

  it("filters by search, availability, and form values", () => {
    const search = view.getByLabelText(/search books/i);

    component.filterForm.search().value.set("gatsby");
    fixture.detectChanges();

    expect(search).toHaveDisplayValue("gatsby");
    expect(
      view.getByRole("heading", { level: 2, name: /the great gatsby/i })
    ).toBeVisible();
    expect(
      view.queryByRole("heading", { level: 2, name: /you don't know js/i })
    ).not.toBeInTheDocument();

    component.filterForm.search().value.set("");
    component.filterForm.availableOnly().value.set(true);
    fixture.detectChanges();

    expect(view.getByLabelText(/available only/i)).toBeChecked();
    expect(
      view.queryByRole("heading", { level: 2, name: /you don't know js/i })
    ).not.toBeInTheDocument();
    expect(
      view.getByRole("heading", { level: 2, name: /the great gatsby/i })
    ).toBeVisible();
  });

  it("supports partially checked all-genres control", () => {
    const allGenres = view.getByLabelText(/all genres/i);
    expect(allGenres).toBeChecked();
    expect(allGenres).not.toBePartiallyChecked();

    view.getByLabelText(/^fiction$/i).click();
    fixture.detectChanges();

    expect(allGenres).toBePartiallyChecked();

    allGenres.click();
    fixture.detectChanges();
    expect(allGenres).toBeChecked();
  });

  it("includes books without genres when all genres are selected", () => {
    expect(
      view.getByRole("heading", { level: 2, name: /untitled draft/i })
    ).toBeVisible();

    view.getByLabelText(/^fiction$/i).click();
    fixture.detectChanges();

    expect(
      view.queryByRole("heading", { level: 2, name: /untitled draft/i })
    ).not.toBeInTheDocument();

    view.getByLabelText(/all genres/i).click();
    fixture.detectChanges();

    expect(
      view.getByRole("heading", { level: 2, name: /untitled draft/i })
    ).toBeVisible();
  });

  it("filters to wishlist books only", () => {
    component.onWishlistChange("1", true);
    component.filterForm.wishlistOnly().value.set(true);
    fixture.detectChanges();

    expect(view.getByLabelText(/on my wishlist/i)).toBeChecked();
    expect(
      view.getByRole("heading", { level: 2, name: /the great gatsby/i })
    ).toBeVisible();
    expect(
      view.queryByRole("heading", { level: 2, name: /you don't know js/i })
    ).not.toBeInTheDocument();
    expect(
      view.getByLabelText(/remove the great gatsby from wishlist/i)
    ).toBePressed();
  });

  it("shows an empty state when filters return no results", () => {
    component.filterForm.search().value.set("zzzz-no-match");
    fixture.detectChanges();

    const liveRegion = view.getByText(/no books match your filters/i);
    expect(liveRegion).toHaveAttribute("aria-live", "assertive");
    expect(liveRegion).not.toHaveClass("visually-hidden");
    expect(liveRegion).toHaveClass("books-empty--visible");
    expect(view.queryByRole("list")).toBeEmptyDOMElement();
    expect(
      view.queryByRole("heading", { level: 2, name: /the great gatsby/i })
    ).not.toBeInTheDocument();
  });

  it("announces matching book counts politely", () => {
    const liveRegion = view.getByText(/4 books match your filters/i);

    expect(liveRegion).toHaveAttribute("aria-live", "polite");
    expect(liveRegion).toHaveClass("visually-hidden");

    component.filterForm.search().value.set("gatsby");
    fixture.detectChanges();

    expect(view.getByText(/1 book matches your filters/i)).toHaveAttribute(
      "aria-live",
      "polite"
    );
    expect(view.getByText(/1 book matches your filters/i)).toHaveClass(
      "visually-hidden"
    );
  });
});
