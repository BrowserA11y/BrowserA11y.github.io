import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { MockProvider } from "ng-mocks";
import { of } from "rxjs";
import { axe } from "vitest-axe";
import { BooksService } from "../books.service";
import { BooksComponent } from "./books.component";

describe("BooksComponent", () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksComponent],
      providers: [
        provideRouter([]),
        MockProvider(BooksService, { getAll: () => of([]) }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", async () => {
    expect(component).toBeTruthy();
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
