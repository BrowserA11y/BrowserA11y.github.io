import { A11yModule } from "@angular/cdk/a11y";
import {
  provideHttpClient,
  withInterceptorsFromDi,
  withXhr
} from "@angular/common/http";
import { importProvidersFrom, provideZoneChangeDetection } from "@angular/core";
import { bootstrapApplication, BrowserModule } from "@angular/platform-browser";
import {
  provideRouter,
  TitleStrategy,
  withComponentInputBinding,
} from "@angular/router";
import { CustomTitleStrategy } from "./app/a11y-title-strategy";
import { AppComponent } from "./app/app.component";
import { routes } from "./routes";

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    { provide: TitleStrategy, useClass: CustomTitleStrategy },
    importProvidersFrom(BrowserModule, A11yModule),
    provideRouter(routes, withComponentInputBinding()),
    { provide: TitleStrategy, useClass: CustomTitleStrategy },
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch((err) => console.error(err));
