export type Case = "camel" | "snake" | "pascal";

export type Option = {
  prefix: string;
  whitelist?: string[];
  blacklist?: string[];
  casing?: Case;
  throwOnError?: boolean;
};

export type FlatRecord = Record<string, unknown>;
