import type { Directive, DirectiveBinding } from "vue";
import type { VPrivacyOptions } from "./interfaces";

export function updateStyle(
  el: HTMLElement,
  options: VPrivacyOptions,
  binding: DirectiveBinding
) {
  const finalOption: VPrivacyOptions =
    typeof binding.value === "boolean"
      ? { ...options, isPrivate: binding.value }
      : { ...options, ...binding.value };

  el.style.transition = finalOption.transition!;
  el.style.backgroundColor =
    finalOption.isPrivate && finalOption.blurColor ? finalOption.blurColor : "";
  el.style.filter = `blur(${finalOption.isPrivate ? finalOption.blur : 0}px)`;
  el.style.pointerEvents =
    finalOption.isPrivate && finalOption.disabledAction ? "none" : "auto";

  if (!finalOption.isSelectable) {
    el.style.userSelect = finalOption.isPrivate ? "none" : "auto";
  }

  if (finalOption.isPrivate) {
    if (finalOption.disabledScreenReader) {
      el.setAttribute("aria-hidden", "true");
    }
  } else {
    el.removeAttribute("aria-hidden");
  }

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
