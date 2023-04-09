import type { createApp } from "vue";
import { VPrivacyDirective } from "./VPrivacy";
import type { VPrivacyOptions } from "./interfaces";

export const VPrivacy = {
  install: (
    app: ReturnType<typeof createApp>,
    options?: VPrivacyOptions
  ): void => {
    const defaultOptions: VPrivacyOptions = {
      blur: options?.blur ?? 5,
      isPrivate: false,
      isSelectable: false,
      disabledAction: true,
      disabledScreenReader: true,
      isTabbable: false,
      transitionDelay: 0,
      transitionDuration: 0.2,
      transitionTimingFunction: "linear",
    };

    // Manage option between default options and options given
    const finalOptions = { ...defaultOptions, ...options };
    app.directive("privacy", VPrivacyDirective(finalOptions));
  },
};
