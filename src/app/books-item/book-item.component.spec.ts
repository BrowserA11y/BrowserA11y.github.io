import { ComponentFixture, TestBed } from "@angular/core/testing";
import { outputToObservable } from "@angular/core/rxjs-interop";
import { provideRouter } from "@angular/router";
import { within } from "@testing-library/dom";
import { axe } from "vitest-axe";
import { BookItemComponent } from "./book-item.component";

const sampleBook = {
  isbn: "9780000000001",
  cover: "",
  title: "The Great Gatsby",
  abstract: "A classic novel.",
  author: "F. Scott Fitzgerald",
  publisher: "Scribner",
  numPages: 180,
  price: "$10",
  available: true,
  genres: ["Fiction"],
};

describe("BookItemComponent", () => {
  let component: BookItemComponent;
  let fixture: ComponentFixture<BookItemComponent>;
  let view: ReturnType<typeof within>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookItemComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BookItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("book", sampleBook);
    fixture.detectChanges();
    view = within(fixture.nativeElement);
  });

  it("should create", async () => {
    expect(component).toBeTruthy();
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });

  it("renders book text and labeled icon controls", () => {
    expect(
      view.getByRole("heading", { level: 2, name: /the great gatsby/i })
    ).toBeVisible();
    expect(view.getByText(/author: f\. scott fitzgerald/i)).toBeVisible();
    expect(view.getByText("A classic novel.")).toBeVisible();

    // aria-label is exposed via getByLabelText
    const wishlist = view.getByLabelText(/add the great gatsby to wishlist/i);
    expect(view.getByLabelText(/remove the great gatsby/i)).toBeEnabled();
    expect(wishlist).not.toBePressed();
    expect(wishlist.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(
      view.getByRole("link", { name: /read more about the great gatsby/i })
    ).toBeVisible();

  });

  it("toggles wishlist pressed state", () => {
    const wishlist = view.getByLabelText(/add the great gatsby to wishlist/i);
    const onWishlist = vi.fn();
    outputToObservable(component.wishlistChange).subscribe(onWishlist);

    wishlist.click();
    fixture.componentRef.setInput("onWishlist", true);
    fixture.detectChanges();

    expect(onWishlist).toHaveBeenCalledWith(true);
    expect(
      view.getByLabelText(/remove the great gatsby from wishlist/i)
    ).toBePressed();
  });

  it("opens a native confirm dialog and restores focus on cancel", () => {
    const remove = view.getByLabelText(/remove the great gatsby/i);
    const dialog = fixture.nativeElement.querySelector(
      "dialog"
    ) as HTMLDialogElement;

    remove.focus();
    remove.click();
    fixture.detectChanges();

    expect(dialog.open).toBe(true);
    expect(view.getByRole("dialog", { name: /remove book/i })).toBeVisible();
    expect(view.getByText(/remove “the great gatsby” from the catalog/i)).toBeVisible();

    view.getByRole("button", { name: /cancel/i }).click();
    fixture.detectChanges();

    expect(dialog.open).toBe(false);
    expect(remove).toHaveFocus();
  });

  it("emits bookRemoved when confirm is chosen", () => {
    const removed = vi.fn();
    outputToObservable(component.bookRemoved).subscribe(removed);

    view.getByLabelText(/remove the great gatsby/i).click();
    fixture.detectChanges();

    view.getByRole("button", { name: /confirm remove/i }).click();
    fixture.detectChanges();

    expect(removed).toHaveBeenCalled();
  });
});
