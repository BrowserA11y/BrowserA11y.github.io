import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideZoneChangeDetection } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import {
  provideRouter,
  TitleStrategy,
  withComponentInputBinding,
} from "@angular/router";
import { CustomTitleStrategy } from "./app/a11y-title-strategy";
import { AppComponent } from "./app/app.component";
import { staticBooksInterceptor } from "./app/static-books.interceptor";
import { routes } from "./routes";

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    { provide: TitleStrategy, useClass: CustomTitleStrategy },
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([staticBooksInterceptor])),
  ],
}).catch((err) => console.error(err));
