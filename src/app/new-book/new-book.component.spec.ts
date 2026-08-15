import { ComponentFixture, TestBed } from "@angular/core/testing";
import { within } from "@testing-library/dom";
import { MockProvider } from "ng-mocks";
import { axe } from "vitest-axe";

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

  it("should create", async () => {
    expect(component).toBeTruthy();
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });

  it("exposes labeled fields, descriptions, and required state", () => {
    const isbn = view.getByLabelText(/isbn/i);
    const title = view.getByLabelText(/title/i);
    const author = view.getByLabelText(/author/i);

    expect(
      view.getByRole("heading", { level: 1, name: /new book/i })
    ).toBeVisible();
    expect(view.getByText(/maximum length 13 characters, digits only/i)).toBeVisible();
    expect(isbn).toHaveAccessibleDescription(/maximum length 13/i);
    expect(isbn).toBeRequired();
    expect(title).toBeRequired();
    expect(author).toBeInTheDocument();
  });

  it("disables submit while invalid and enables when valid", () => {
    const submit = view.getByRole("button", { name: /add a new book/i });
    expect(submit).toBeDisabled();

    component.newForm().value.set({
      isbn: "9780000000000",
      title: "Accessible Angular",
      author: "Ada",
      cover: "",
      abstract: "",
    });
    fixture.detectChanges();

    expect(submit).toBeEnabled();
    expect(view.getByLabelText(/isbn/i)).toHaveDisplayValue("9780000000000");
    expect(view.getByLabelText(/title/i)).toHaveDisplayValue(
      "Accessible Angular"
    );
    expect(view.getByLabelText(/author/i)).toHaveDisplayValue("Ada");
  });

  it("showcases aria-errormessage and aria-describedby error patterns", () => {
    const isbn = view.getByLabelText(/isbn/i);
    const title = view.getByLabelText(/title/i);

    isbn.focus();
    isbn.blur();
    title.focus();
    title.blur();
    fixture.detectChanges();

    // ISBN: aria-errormessage
    expect(isbn).toBeInvalid();
    expect(isbn).toHaveAccessibleErrorMessage(/please insert an isbn/i);
    expect(view.getByText(/please insert an isbn/i)).toBeVisible();
    expect(isbn).toHaveAccessibleDescription(/maximum length 13/i);

    // Title: aria-describedby pointing at the error
    expect(title).toBeInvalid();
    expect(title).toHaveAccessibleDescription(/please insert a title/i);
    expect(view.getByText(/please insert a title/i)).toBeVisible();
    expect(title).not.toHaveAccessibleErrorMessage();

    component.newForm.isbn().value.set("9780000000000");
    component.newForm.title().value.set("Accessible Angular");
    fixture.detectChanges();

    expect(isbn).toBeValid();
    expect(title).toBeValid();
    expect(isbn).not.toHaveAccessibleErrorMessage();
    expect(title).not.toHaveAccessibleDescription();
  });

  it("shows an ISBN format error for non-digits", () => {
    const isbn = view.getByLabelText(/isbn/i);
    const submit = view.getByRole("button", { name: /add a new book/i });

    component.newForm.isbn().value.set("978-abc");
    component.newForm.isbn().markAsTouched();
    component.newForm.title().value.set("Accessible Angular");
    fixture.detectChanges();

    expect(isbn).toBeInvalid();
    expect(isbn).toHaveAccessibleErrorMessage(/digits only/i);
    expect(view.getByText(/isbn must contain digits only/i)).toBeVisible();
    expect(submit).toBeDisabled();

    component.newForm.isbn().value.set("9780000000000");
    fixture.detectChanges();

    expect(isbn).toBeValid();
    expect(isbn).not.toHaveAccessibleErrorMessage();
    expect(submit).toBeEnabled();
  });
});
