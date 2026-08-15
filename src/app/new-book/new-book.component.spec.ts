import { ComponentFixture, TestBed } from "@angular/core/testing";
import { within } from "@testing-library/dom";
import { MockProvider } from "ng-mocks";

import { BooksService } from "../books.service";
import { NewBookComponent } from "./new-book.component";

describe("NewBookComponent", () => {
  let component: NewBookComponent;
  let fixture: ComponentFixture<NewBookComponent>;
  let view: ReturnType<typeof within>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewBookComponent],
      providers: [MockProvider(BooksService)],
    }).compileComponents();

    fixture = TestBed.createComponent(NewBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    view = within(fixture.nativeElement);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("exposes accessible names, descriptions, and required state", () => {
    const isbn = view.getByRole("textbox", { name: /isbn/i });
    const title = view.getByRole("textbox", { name: /title/i });
    const author = view.getByRole("textbox", { name: /author/i });

    expect(isbn).toHaveAccessibleName(/isbn/i);
    expect(isbn).toHaveAccessibleDescription(/maximum length 13/i);
    expect(isbn).toBeRequired();
    expect(title).toHaveAccessibleName(/title/i);
    expect(title).toBeRequired();
    expect(author).toHaveAccessibleName(/author/i);
  });

  it("disables submit while invalid and enables when valid", () => {
    const submit = view.getByRole("button", { name: /add a new book/i });
    expect(submit).toBeDisabled();

    component.newForm.setValue({
      isbn: "9780000000000",
      title: "Accessible Angular",
      author: "Ada",
      cover: "",
      abstract: "",
    });
    fixture.detectChanges();

    expect(submit).toBeEnabled();
    expect(view.getByRole("textbox", { name: /isbn/i })).toHaveDisplayValue(
      "9780000000000"
    );
    expect(view.getByRole("textbox", { name: /title/i })).toHaveDisplayValue(
      "Accessible Angular"
    );
    expect(view.getByRole("textbox", { name: /author/i })).toHaveDisplayValue(
      "Ada"
    );
  });

  it("showcases aria-errormessage and aria-describedby error patterns", () => {
    const isbn = view.getByRole("textbox", { name: /isbn/i });
    const title = view.getByRole("textbox", { name: /title/i });

    isbn.focus();
    isbn.blur();
    title.focus();
    title.blur();
    fixture.detectChanges();

    // ISBN: aria-errormessage
    expect(isbn).toBeInvalid();
    expect(isbn).toHaveAccessibleErrorMessage(/please insert an isbn/i);
    expect(isbn).toHaveAccessibleDescription(/maximum length 13/i);

    // Title: aria-describedby pointing at the error
    expect(title).toBeInvalid();
    expect(title).toHaveAccessibleDescription(/please insert a title/i);
    expect(title).not.toHaveAccessibleErrorMessage();

    component.newForm.controls.isbn.setValue("9780000000000");
    component.newForm.controls.title.setValue("Accessible Angular");
    fixture.detectChanges();

    expect(isbn).toBeValid();
    expect(title).toBeValid();
    expect(isbn).not.toHaveAccessibleErrorMessage();
    expect(title).not.toHaveAccessibleDescription();
  });

  it("shows an ISBN format error for non-digits", () => {
    const isbn = view.getByRole("textbox", { name: /isbn/i });
    const submit = view.getByRole("button", { name: /add a new book/i });

    component.newForm.controls.isbn.setValue("978-abc");
    component.newForm.controls.isbn.markAsTouched();
    component.newForm.controls.title.setValue("Accessible Angular");
    fixture.detectChanges();

    expect(isbn).toBeInvalid();
    expect(isbn).toHaveAccessibleErrorMessage(/digits only/i);
    expect(submit).toBeDisabled();

    component.newForm.controls.isbn.setValue("9780000000000");
    fixture.detectChanges();

    expect(isbn).toBeValid();
    expect(isbn).not.toHaveAccessibleErrorMessage();
    expect(submit).toBeEnabled();
  });
});
