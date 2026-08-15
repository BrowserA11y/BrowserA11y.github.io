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
import { AboutComponent } from "./about.component";

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
  },
];

/** YouTube iframes break axe under jsdom (cross-frame messaging). */
const runAxe = (element: HTMLElement) => axe(element, { iframes: false });

describe("AboutComponent", () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let view: ReturnType<typeof within>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(AboutComponent);
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
    expect(await runAxe(fixture.nativeElement)).toHaveNoViolations();
  });

  it("renders intro copy and a titled video embed", () => {
    expect(
      view.getByRole("heading", { level: 1, name: /about us/i })
    ).toBeVisible();
    expect(
      view.getByText(/everyone should have access to the joy of reading/i)
    ).toBeVisible();
    expect(
      view.getByTitle(
        /youtube video from centre for equitable library access/i
      )
    ).toBeInTheDocument();
    expect(view.getByRole("link", { name: /view our books/i })).toBeVisible();
  });

  it("shows collection statistics", () => {
    const stats = view.getByRole("table");
    expect(
      within(stats).getByRole("row", { name: /number of books:\s*2/i })
    ).toBeVisible();
    expect(
      within(stats).getByRole("row", { name: /number of authors:\s*2/i })
    ).toBeVisible();
    expect(
      within(stats).getByRole("row", { name: /number of publishers:\s*2/i })
    ).toBeVisible();
  });
});
