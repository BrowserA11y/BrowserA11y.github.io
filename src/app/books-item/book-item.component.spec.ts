import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { within } from "@testing-library/dom";
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

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("gives icon controls and contextual links accessible names and roles", () => {
    const remove = view.getByRole("button", {
      name: /remove the great gatsby/i,
    });
    const details = view.getByRole("link", {
      name: /read more about the great gatsby/i,
    });
    const wishlist = view.getByRole("button", {
      name: /add the great gatsby to wishlist/i,
    });

    expect(remove).toHaveRole("button");
    expect(remove).toHaveAccessibleName(/remove the great gatsby/i);
    expect(details).toHaveRole("link");
    expect(details).toHaveAccessibleName(/read more about the great gatsby/i);
    expect(wishlist).not.toBePressed();
  });

  it("toggles wishlist pressed state", () => {
    const wishlist = view.getByRole("button", {
      name: /add the great gatsby to wishlist/i,
    });
    const starred = vi.fn();
    component.wishlistChange.subscribe(starred);

    wishlist.click();
    fixture.componentRef.setInput("onWishlist", true);
    fixture.detectChanges();

    expect(starred).toHaveBeenCalledWith(true);
    expect(
      view.getByRole("button", {
        name: /remove the great gatsby from wishlist/i,
      })
    ).toBePressed();
  });

  it("opens a native confirm dialog and restores focus on cancel", () => {
    const remove = view.getByRole("button", {
      name: /remove the great gatsby/i,
    });
    const dialog = fixture.nativeElement.querySelector(
      "dialog"
    ) as HTMLDialogElement;

    remove.focus();
    remove.click();
    fixture.detectChanges();

    expect(dialog.open).toBe(true);
    expect(view.getByRole("dialog", { name: /remove book/i })).toHaveAccessibleName(
      /remove book/i
    );

    view.getByRole("button", { name: /cancel/i }).click();
    fixture.detectChanges();

    expect(dialog.open).toBe(false);
    expect(remove).toHaveFocus();
  });

  it("emits bookRemoved when confirm is chosen", () => {
    const removed = vi.fn();
    component.bookRemoved.subscribe(removed);

    view.getByRole("button", { name: /remove the great gatsby/i }).click();
    fixture.detectChanges();

    view.getByRole("button", { name: /confirm remove/i }).click();
    fixture.detectChanges();

    expect(removed).toHaveBeenCalled();
  });
});
