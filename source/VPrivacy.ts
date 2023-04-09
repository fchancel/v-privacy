import type { Directive, DirectiveBinding } from "vue";
import type { VPrivacyOptions } from "./interfaces";

export function updateStyle(
  el: HTMLElement,
  options: VPrivacyOptions,
  binding: DirectiveBinding
) {
  // Manage options
  const finalOption: VPrivacyOptions =
    typeof binding.value === "boolean"
      ? { ...options, isPrivate: binding.value }
      : { ...options, ...binding.value };

  // Blur color effect
  el.style.backgroundColor =
    finalOption.isPrivate && finalOption.blurColor ? finalOption.blurColor : "";

  // Blur effect
  el.style.filter = `blur(${finalOption.isPrivate ? finalOption.blur : 0}px)`;

  // Deactivate mouse interaction
  el.style.pointerEvents =
    finalOption.isPrivate && finalOption.disabledAction ? "none" : "auto";

  // Transition effect
  el.style.transitionDuration = `${finalOption.transitionDuration}s`;
  el.style.transitionDelay = `${finalOption.transitionDelay}s`;
  el.style.transitionTimingFunction = `${finalOption.transitionTimingFunction}`;
  el.style.transitionProperty = "all";

  // Deactivate user interaction
  if (!finalOption.isSelectable) {
    el.style.userSelect = finalOption.isPrivate ? "none" : "auto";
  }

  // Deactivate screen reader
  if (finalOption.isPrivate) {
    if (finalOption.disabledScreenReader) {
      el.setAttribute("aria-hidden", "true");
    }
  } else {
    el.removeAttribute("aria-hidden");
  }

  // Deactivate tabulation on element
  if (finalOption.isPrivate) {
    if (!finalOption.isTabbable || finalOption.disabledAction) {
      el.setAttribute("tabindex", "-1");
    }
  } else {
    el.removeAttribute("tabindex");
  }
}

export function VPrivacyDirective(options: VPrivacyOptions): Directive {
  return {
    mounted(el, binding) {
      updateStyle(el, options, binding);
    },

    updated(el, binding) {
      updateStyle(el, options, binding);
    },
  };
}
