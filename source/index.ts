import type { createApp } from "vue";
import { VPrivacyDirective } from "./VPrivacy";
import type { VPrivacyOptions } from "./interfaces";

export const VPrivacy = {
  install: (
    app: ReturnType<typeof createApp>,
    options: VPrivacyOptions | undefined
  ): void => {
    const defaultOptions: VPrivacyOptions = {
      blur: options?.blur ?? 5,
      isPrivate: false,
      isSelectable: false,
      disabledAction: true,
      disabledScreenReader: true,
      isTabbable: false,
      transition: "all 0.1s linear",
    };

    app.directive("privacy", VPrivacyDirective(defaultOptions));
  },
};
