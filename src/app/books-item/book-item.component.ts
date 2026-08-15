import { CdkMonitorFocus, FocusOrigin } from "@angular/cdk/a11y";
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  input,
  NgZone,
  output,
  viewChild,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { Book } from "../books.service";

@Component({
  selector: "app-book-item",
  templateUrl: "./book-item.component.html",
  styleUrls: ["./book-item.component.scss"],
  imports: [CdkMonitorFocus, RouterLink],
})
export class BookItemComponent {
  readonly book = input<Book>();
  readonly onWishlist = input(false);
  readonly bookRemoved = output<void>();
  readonly wishlistChange = output<boolean>();

  private readonly confirmDialog =
    viewChild<ElementRef<HTMLDialogElement>>("confirmDialog");

  private readonly ngZone = inject(NgZone);
  private readonly cdr = inject(ChangeDetectorRef);

  elementOrigin = this.formatOrigin(null);

  get wishlistLabel(): string {
    const title = this.book()?.title ?? "book";
    return this.onWishlist()
      ? `Remove ${title} from wishlist`
      : `Add ${title} to wishlist`;
  }

  formatOrigin(origin: FocusOrigin): string {
    return origin ? origin + " focused" : "blurred";
  }

  // Workaround for the fact that (cdkFocusChange) emits outside NgZone.
  markForCheck() {
    this.ngZone.run(() => this.cdr.markForCheck());
  }

  toggleWishlist() {
    this.wishlistChange.emit(!this.onWishlist());
  }

  /** Uses the native dialog API so the browser restores focus to the trigger. */
  openRemoveDialog() {
    this.confirmDialog()?.nativeElement.showModal();
  }

  cancelRemove() {
    this.confirmDialog()?.nativeElement.close();
  }

  confirmRemove() {
    this.confirmDialog()?.nativeElement.close();
    this.bookRemoved.emit();
  }
}
