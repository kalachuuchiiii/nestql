import type { Case } from "../types/index.d.ts";
import { capitalize } from "./capitalize.ts";

export const getCasedKey = (unprefixedKey: string, casing: Case = "camel") => {
  if (casing === "snake") {
    return unprefixedKey;
  }

  if (casing === "camel") {
    return unprefixedKey
      .split("_")
      .map((v, i) => (i === 0 ? v : capitalize(v)))
      .join("");
  }

  return unprefixedKey.split("_").map(capitalize).join("");
};
