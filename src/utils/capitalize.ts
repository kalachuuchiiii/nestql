export const capitalize = (val: string) => {
  return `${(val[0] ?? "").toUpperCase()}${val.substring(1, val.length)}`;
};
