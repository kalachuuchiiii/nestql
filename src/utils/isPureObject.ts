export const isPureObject = (value: unknown) => {
  return Object.prototype.toString.call(value) === "[object Object]";
};
