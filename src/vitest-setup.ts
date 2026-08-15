import "@testing-library/jest-dom/vitest";
import * as axeMatchers from "vitest-axe/matchers";
import { expect } from "vitest";
import type { AxeMatchers } from "vitest-axe/matchers";

expect.extend(axeMatchers);

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any> extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}

/**
 * jsdom does not implement HTMLDialogElement.showModal()/close() focus behavior.
 * Polyfill enough of the native modal API for unit tests.
 */
(() => {
  if (typeof HTMLDialogElement === "undefined") {
    return;
  }

  type DialogWithTrigger = HTMLDialogElement & {
    _a11yTrigger?: HTMLElement | null;
  };

  const proto = HTMLDialogElement.prototype;

  if (typeof proto.showModal !== "function") {
    proto.showModal = function showModal(this: HTMLDialogElement) {
      (this as DialogWithTrigger)._a11yTrigger =
        document.activeElement as HTMLElement | null;
      this.setAttribute("open", "");
    };
  }

  if (typeof proto.close !== "function") {
    proto.close = function close(this: HTMLDialogElement, returnValue?: string) {
      this.removeAttribute("open");
      if (returnValue !== undefined) {
        this.returnValue = returnValue;
      }
      const trigger = (this as DialogWithTrigger)._a11yTrigger;
      trigger?.focus?.();
      (this as DialogWithTrigger)._a11yTrigger = null;
    };
  }
})();
