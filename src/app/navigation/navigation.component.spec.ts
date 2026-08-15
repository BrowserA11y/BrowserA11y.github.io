import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { within } from "@testing-library/dom";
import { NavigationComponent } from "./navigation.component";

describe("NavigationComponent", () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let view: ReturnType<typeof within>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    view = within(fixture.nativeElement);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("exposes a navigation landmark and labeled menu button", () => {
    expect(
      view.getByRole("navigation", { name: /accessible reads/i })
    ).toHaveRole("navigation");

    const menuButton = view.getByRole("button", {
      name: /accessible reads quick links/i,
    });
    expect(menuButton).toHaveAccessibleName(/accessible reads quick links/i);
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("toggles aria-expanded and mobile menu visibility", () => {
    const menuButton = view.getByRole("button", {
      name: /accessible reads quick links/i,
    });
    const menu = fixture.nativeElement.querySelector(
      "#menuContent"
    ) as HTMLElement;

    expect(menu).toBeTruthy();
    expect(menu).not.toHaveClass("nav__list--open");
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    menuButton.click();
    fixture.detectChanges();

    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(menu).toHaveClass("nav__list--open");
    expect(within(menu).getByRole("link", { name: /^books$/i })).toBeVisible();

    menuButton.click();
    fixture.detectChanges();

    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(menu).not.toHaveClass("nav__list--open");
  });
});
