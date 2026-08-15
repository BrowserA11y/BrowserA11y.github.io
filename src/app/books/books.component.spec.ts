import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { within } from "@testing-library/dom";
import { MockProvider } from "ng-mocks";
import { of } from "rxjs";
import { axe } from "vitest-axe";
import { BooksService } from "../books.service";
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
];

describe("BooksComponent", () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let view: ReturnType<typeof within>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksComponent],
      providers: [
        provideRouter([]),
        MockProvider(BooksService, {
          getAll: () => of(sampleBooks),
          removeBook: () => of({}),
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    view = within(fixture.nativeElement);
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

    component.filterForm.controls.search.setValue("gatsby");
    fixture.detectChanges();

    expect(search).toHaveDisplayValue("gatsby");
    expect(
      view.getByRole("heading", { name: /the great gatsby/i })
    ).toBeInTheDocument();
    expect(
      view.queryByRole("heading", { name: /you don't know js/i })
    ).not.toBeInTheDocument();
    expect(view.getByRole("form", { name: /filter books/i })).toBeVisible();

    component.filterForm.controls.search.setValue("");
    component.filterForm.controls.availableOnly.setValue(true);
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

  it("filters to starred books only", () => {
    component.onWishlistChange("1", true);
    component.filterForm.controls.starredOnly.setValue(true);
    fixture.detectChanges();

    expect(view.getByRole("checkbox", { name: /starred only/i })).toBeChecked();
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
});
