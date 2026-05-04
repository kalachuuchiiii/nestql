// {
//  user: { //prefix
//   username: //prefix key
//  }
// }

import type { FlatRecord, Option } from "./types/index.d.ts";
import { getCasedKey } from "./utils/getCasedKey.ts";
import { isPureObject } from "./utils/isPureObject.ts";

const nestql = (flat: FlatRecord, option: Option) => {
  const { casing, prefix, whitelist, blacklist = [], throwOnError } = option;
  let object: Record<string, unknown> = {};

  try {
    for (const [key, value] of Object.entries(flat)) {
      if (!key.startsWith(prefix)) continue;
      const unprefixedSubPrefix = key.replace(`${prefix}_`, "");
      const casedPrefixKey = getCasedKey(unprefixedSubPrefix, casing);

      if (
        (whitelist && !whitelist.includes(unprefixedSubPrefix)) ||
        blacklist.includes(unprefixedSubPrefix)
      ) {
        continue;
      }

      object = {
        ...object,
        [casedPrefixKey]: value,
      };
    }
    return object;
  } catch (e: any) {
    const message = !isPureObject(flat)
      ? "nestql: Flat object must be a pure object"
      : e?.message ?? "nestql: nestql error";

    if (throwOnError) {
      throw new Error(message);
    }
    console.error(message);
  }
};

export default nestql;
export * from "./utils/capitalize.ts";
export * from "./utils/getCasedKey.ts";
export * from "./utils/isPureObject.ts";
export type * from "./types/index.js";
