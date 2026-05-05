// {
//  user: { //prefix
//   [keys]: //prefix keys
//  }
// }

import type { FlatRecord, Option } from "./types/index.d.ts";
import { toCasedKey } from "./utils/case.utils.ts";
import { isPureObject } from "./utils/isPureObject.ts";

const nestql = <T extends Record<string, unknown>>(
  flat: FlatRecord,
  option: Option
) => {
  let object = {} as T;
  const {
    casing = "camel",
    pick,
    omit,
    throwOnError = false,
    keepPrefixKeysCasing = false,
  } = option;
  const prefix = option.prefix.trim();

  try {
    for (const [key, value] of Object.entries(flat)) {
      if (!key.startsWith(prefix) || key[prefix.length] !== "_") {
        continue;
      }

      const uncasedPrefixKey = key.replace(`${prefix}_`, "");
      const prefixKey = toCasedKey(uncasedPrefixKey, casing);

      if (omit && omit.includes(uncasedPrefixKey)) {
        //if ommited, skip
        continue;
      }
      if (!omit && pick && !pick.includes(uncasedPrefixKey)) {
        // omit overrides whitelist
        continue;
      }

      (object[prefixKey] as any) = value;
    }
    return object as T;
  } catch (e: any) {
    const message = !isPureObject(flat)
      ? "nestql: flat object must be a pure object"
      : e?.message ?? "nestql: nestql error";

    if (throwOnError) {
      throw new Error(message);
    } else {
      console.error(message);
    }
    return {} as T;
  }
};

export default nestql;
export * from "./utils/case.utils.ts";
export * from "./utils/isPureObject.ts";
export type * from "./types/index.js";
