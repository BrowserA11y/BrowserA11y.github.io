# AngularA11y

Accessibility is back in, thanks to the Barrierefreiheitsstärkungsgesetz (BFSG)! By 2025 at the latest, we should be able to make our apps accessible.

This repository contains a demo project for a book store, along with a series of exercises that aim to teach web developers how to make their websites more accessible to people with disabilities. The exercises are designed for developers with basic knowledge of Git, Angular, HTML, Typescript and SCSS. Cypress and Vitest knowledge is also helpful but not required. If you are interested in a plain JS, HTML and CSS showcase, check out [my other repository](https://github.com/BrowserA11y/a11y-workshop).
The demo project consists of a simple Angular app that allows users to browse and store books. The application utilizes the [bookmonkey-api package](https://www.npmjs.com/package/bookmonkey-api) to make requests to the backend server and retrieve book information. The website includes various accessibility features, such as alternative text for images and a keyboard-accessible navigation menu. The topics cover accessibility aspects in general web development and in Angular projects.

## Exercises

The exercises in this repository are divided into several sections, each covering a different aspect of web accessibility. Some of the topics covered include:

- Semantic HTML
- Screenreader handling
- Alternative text for non-textual elements
- Keyboard accessibility
- Focus management
- ARIA attributes

Angular specifics include:

- Router capabilities
- Accessibility CDK
- Form handling
- Fix for skip links and autofocus
- Angular ESLint

The exercises are designed to be completed in order, as they build upon each other. The solutions are tagged.

## Prerequisites

- [Node version compatible with Angular 18](https://angular.dev/reference/versions)
- Nice-to-have: Chrome installed

## Getting started

- Run `npm i` to install dependencies.
- Run `npx bookmonkey-api` to start fake backend.
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

To start unit tests, run the following command: `npm run test`. Vitest will execute all unit tests in the project. Accessibility checks use [vitest-axe](https://github.com/chaance/vitest-axe).

## Running end-to-end tests

To start end-to-end tests, run the following command: `npm run e2e`. This will open an interactive UI where you can start the test. More info in the [documentation](https://docs.cypress.io/guides/getting-started/opening-the-app).
Alternativelly, you can run the tests via CLI with `npx cypress run`.

## A11y resources (with Angular specifics)

- [Barrierefreiheit 2.0 - was kommt ab 2025 und was kann ich jetzt schon tun
  ](https://drive.google.com/file/d/1t6OSc0L8RwlY9d9htfVZQb_efMoDqUPh/view?usp=sharing)
- [Accessibility in Angular](https://angular.io/guide/accessibility)
- [Build more accessible Angular apps](https://blog.angular.io/build-more-accessible-angular-apps-1aca4fc39aff)
- [Angular CDK A11yModule](https://material.angular.io/cdk/a11y/overview)
- [:focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)
- [aria-live](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live)
- [Angular EsLint rules](https://github.com/angular-eslint/angular-eslint/tree/main/packages/eslint-plugin-template/docs/rules)
- [Doing A11y easily with Angular CDK. Keyboard-Navigable Lists](https://indepth.dev/posts/1147/doing-a11y-easily-with-angular-cdk-keyboard-navigable-lists)
- [Build Accessible Forms with Angular](https://coryrylan.com/blog/build-accessible-forms-with-angular)
- [Creating accessible forms with Angular](https://medium.com/@svinkle/creating-accessible-forms-with-angular-simply-accessible-c1bc362cf89e)
- [Make it Accessible: Dealing with Form Errors in Angular](https://www.thisdot.co/blog/make-it-accessible-dealing-with-form-errors-in-angular)

## License

This repository is licensed under the MIT License. See the LICENSE file for more information.

## How to updates the exercises in this masterclass

1. `git rebase -i a7bfef2d02ab39024567e281ea9b0096344494ea`
2. Change `pick` to `edit` at the tasks you want to change
3. Do your changes
4. `git commit --all --amend`
5. `git rebase --continue`
6. Fix possible merge error if needed
7. Repeat on step 3 if you edit more than one commits
8. run `./recreate-tags.sh`
9. `git push -f`
10. `git push --tags -f`

## Interested in a workshop on accessibility?

Contact me via [email](mailto:contact@browser-person.com).
