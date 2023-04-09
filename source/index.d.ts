import { DirectiveBinding } from "vue";
import type { VPrivacyOptions } from "./interfaces";

export declare const VPrivacyDirective: (options: VPrivacyOptions) => {
  mounted(el: HTMLElement, binding: DirectiveBinding): void;
  updated(el: HTMLElement, binding: DirectiveBinding): void;
};

export declare const VPrivacy: {
  install(app: any, options?: VPrivacyOptions): void;
};
