export type Case = "camel" | "snake" | "pascal" | "keep";

export type Option =
  | {
      prefix: string;
      casing?: Case;
      pick?: string[];
      omit?: undefined;
      throwOnError?: boolean;
      keepPrefixKeysCasing?: boolean;
    }
  | {
      prefix: string;
      casing?: Case;
      pick?: undefined;
      omit?: string[];
      throwOnError?: boolean;
      keepPrefixKeysCasing?: boolean;
    };

export type FlatRecord = Record<string, unknown>;
