import { CdkMonitorFocus, FocusOrigin } from "@angular/cdk/a11y";
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgZone,
  Output,
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
  @Output() private bookRemoved = new EventEmitter<void>();

  elementOrigin = this.formatOrigin(null);
  constructor(private _ngZone: NgZone, private _cdr: ChangeDetectorRef) {}
  formatOrigin(origin: FocusOrigin): string {
    return origin ? origin + " focused" : "blurred";
  }
  // Workaround for the fact that (cdkFocusChange) emits outside NgZone.
  markForCheck() {
    this._ngZone.run(() => this._cdr.markForCheck());
  }

  removeBook() {
    this.bookRemoved.emit();
  }
}
