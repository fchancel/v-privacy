import type { Directive } from "vue";
import type { VPrivacyOptions } from "./interfaces";
import CryptoJS from "crypto-js";

export function updateStyle(el: HTMLElement, options: VPrivacyOptions) {
  // Blur color effect
  el.style.backgroundColor =
    options.isPrivate && options.blurColor ? options.blurColor : "";

  // Blur effect
  el.style.filter = `blur(${options.isPrivate ? options.blur : 0}px)`;

  // Deactivate mouse interaction
  el.style.pointerEvents =
    options.isPrivate && options.disabledAction ? "none" : "auto";

  // Transition effect
  el.style.transitionDuration = `${options.transitionDuration}s`;
  el.style.transitionDelay = `${options.transitionDelay}s`;
  el.style.transitionTimingFunction = `${options.transitionTimingFunction}`;
  el.style.transitionProperty = "all";

  // Deactivate user interaction
  if (!options.isSelectable) {
    el.style.userSelect = options.isPrivate ? "none" : "auto";
  }

  // Deactivate screen reader
  if (options.isPrivate) {
    if (options.disabledScreenReader) {
      el.setAttribute("aria-hidden", "true");
    }
  } else {
    el.removeAttribute("aria-hidden");
  }

  // Deactivate tabulation on element
  if (options.isPrivate) {
    if (!options.isTabbable || options.disabledAction) {
      el.setAttribute("tabindex", "-1");
    }
  } else {
    el.removeAttribute("tabindex");
  }
}

function encryptText(text: string, secretKey: string) {
  const ciphertext = CryptoJS.AES.encrypt(text, secretKey).toString();
  return ciphertext;
}

function decryptText(ciphertext: string, secretKey: string) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const plaintext = bytes.toString(CryptoJS.enc.Utf8);
  if (!plaintext) {
    return ciphertext;
  }
  return plaintext;
}

function isTextElement(el: HTMLElement) {
  const textTags = [
    "A",
    "ABBR",
    "ACRONYM",
    "B",
    "BDO",
    "BIG",
    "BUTTON",
    "CITE",
    "CODE",
    "DFN",
    "EM",
    "I",
    "KBD",
    "LABEL",
    "P",
    "Q",
    "SAMP",
    "SMALL",
    "SPAN",
    "STRONG",
    "SUB",
    "SUP",
    "TIME",
    "TT",
    "U",
    "VAR",
  ];
  return textTags.includes(el.tagName);
}

function manageTextEncrypt(el: HTMLElement, options: VPrivacyOptions) {
  // Check if element is a text node
  if (options.encryptText && isTextElement(el)) {

    if (options.isPrivate) {
      // Encrypt phase
      const textLength = el.innerText.length;
      const encryptedContent = encryptText(el.innerText, options.secretKey!);
      el.setAttribute("data-encrypted-content", encryptedContent);
      el.innerText = encryptedContent.slice(0, textLength - 3);
    } else {
      // Decrypt phase
      const encryptedContent = el.getAttribute("data-encrypted-content");
      if (encryptedContent) {
        el.innerText = decryptText(encryptedContent, options.secretKey!);
        el.removeAttribute("data-encrypted-content");
      }
    }
  }
}

export function VPrivacyDirective(options: VPrivacyOptions): Directive {
  return {
    mounted(el, binding) {
      // Manage options
      const finalOptions: VPrivacyOptions =
        typeof binding.value === "boolean"
          ? { ...options, isPrivate: binding.value }
          : { ...options, ...binding.value };

      updateStyle(el, finalOptions);
      manageTextEncrypt(el, finalOptions);
    },

    updated(el, binding) {
      // Manage options
      const finalOptions: VPrivacyOptions =
        typeof binding.value === "boolean"
          ? { ...options, isPrivate: binding.value }
          : { ...options, ...binding.value };

      updateStyle(el, finalOptions);
      manageTextEncrypt(el, finalOptions);
    },
  };
}
