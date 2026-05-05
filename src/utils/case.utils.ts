import type { Case } from "../types/index";

export const capitalize = (str: string) => {
  return str.replace(/^./, (c) => c.toUpperCase());
};

export const toSnakeCase = (str: string): string => {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1_$2")
    .toLowerCase();
};

export const toCamelCase = (str: string): string => {
  return str
    .replace(/[-_]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
    .replace(/^[A-Z]/, (c) => c.toLowerCase());
};

export const toPascalCase = (str: string): string => {
  return str.replace(/(^|_)(.)/g, (_, __, c) => c.toUpperCase());
};

export const toCasedKey = (
  uncasedPrefixKey: string,
  casing: Case = "camel"
) => {
  if (casing === "keep") {
    return uncasedPrefixKey;
  }

  if (casing === "snake") {
    return toSnakeCase(uncasedPrefixKey);
  }

  if (casing === "camel") {
    return toCamelCase(uncasedPrefixKey);
  }

  return toPascalCase(uncasedPrefixKey);
};
