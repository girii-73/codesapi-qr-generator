/**
 * Short code generation + validation utilities
 */

const ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * Generate a cryptographically random URL-safe code.
 * Falls back to Math.random if crypto is unavailable (e.g. older Node).
 */
export function generateCode(length = 6): string {
  const chars: string[] = [];
  // Use Web Crypto API (available in Node 19+ and all modern browsers)
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const values = new Uint32Array(length);
    crypto.getRandomValues(values);
    for (let i = 0; i < length; i++) {
      chars.push(ALPHABET[values[i] % ALPHABET.length]);
    }
  } else {
    for (let i = 0; i < length; i++) {
      chars.push(ALPHABET[Math.floor(Math.random() * ALPHABET.length)]);
    }
  }
  return chars.join("");
}

/** Validate a custom code: 3-20 chars, URL-safe */
const CUSTOM_CODE_RE = /^[a-zA-Z0-9_-]{3,20}$/;

export function validateCustomCode(code: string): boolean {
  return CUSTOM_CODE_RE.test(code);
}

/** Validate that a string is a well-formed absolute URL */
export function validateUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}
