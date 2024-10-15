import { InteractivityChecker } from "@angular/cdk/a11y";
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { BooksService } from "../books.service";

@Component({
    selector: "app-new-book",
    templateUrl: "./new-book.component.html",
    styleUrls: ["./new-book.component.scss"],
    imports: [ReactiveFormsModule]
})
export class NewBookComponent implements OnDestroy, AfterViewInit {
  newForm = this.buildForm();
  bookApiSubscription = new Subscription();
  @ViewChild("divButton") inputElementRef!: ElementRef;
  isDisabled = true;

  constructor(
    private form: FormBuilder,
    private bookService: BooksService,
    private interactivityChecker: InteractivityChecker
  ) {}

  ngAfterViewInit(): void {
    /*     console.log(
      this.interactivityChecker.isFocusable(this.inputElementRef.nativeElement)
    ); */
  }

  ngOnDestroy(): void {
    this.bookApiSubscription.unsubscribe();
    this.newForm.controls;
  }

  create(): void {
    if (this.newForm.invalid) return;

    this.bookApiSubscription.add(
      this.bookService.create(this.newForm.getRawValue()).subscribe()
    );
  }

  private buildForm() {
    return this.form.nonNullable.group({
      isbn: ["", [Validators.required]],
      title: ["", [Validators.required]],
      cover: [""],
      author: [""],
      abstract: [""],
    });
  }

  public doSomething() {
    console.log("click");
  }
}
