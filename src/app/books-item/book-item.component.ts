import { CdkMonitorFocus, FocusOrigin } from "@angular/cdk/a11y";
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
  ViewChild,
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
  @Input() public book?: Book;
  @Input() onWishlist = false;
  @Output() bookRemoved = new EventEmitter<void>();
  @Output() readonly wishlistChange = new EventEmitter<boolean>();

  @ViewChild("confirmDialog")
  private confirmDialog?: ElementRef<HTMLDialogElement>;

  elementOrigin = this.formatOrigin(null);

  constructor(private _ngZone: NgZone, private _cdr: ChangeDetectorRef) {}

  get wishlistLabel(): string {
    const title = this.book?.title ?? "book";
    return this.onWishlist
      ? `Remove ${title} from wishlist`
      : `Add ${title} to wishlist`;
  }

  formatOrigin(origin: FocusOrigin): string {
    return origin ? origin + " focused" : "blurred";
  }

  // Workaround for the fact that (cdkFocusChange) emits outside NgZone.
  markForCheck() {
    this._ngZone.run(() => this._cdr.markForCheck());
  }

  toggleWishlist() {
    this.wishlistChange.emit(!this.onWishlist);
  }

  /** Uses the native dialog API so the browser restores focus to the trigger. */
  openRemoveDialog() {
    this.confirmDialog?.nativeElement.showModal();
  }

  cancelRemove() {
    this.confirmDialog?.nativeElement.close();
  }

  confirmRemove() {
    this.confirmDialog?.nativeElement.close();
    this.bookRemoved.emit();
  }
}
