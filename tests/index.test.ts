import { capitalize, getCasedKey, isPureObject } from "../src/index.ts";

describe("get-cased-key util", () => {
  it("should return the correct camel cased key", () => {
    expect(getCasedKey("profile_picture", "camel")).toBe("profilePicture");
  });

  it("should return the correct snake cased key", () => {
    expect(getCasedKey("profile_picture", "snake")).toBe("profile_picture");
  });

  it("should return the correct pascal cased key", () => {
    expect(getCasedKey("profile_picture", "pascal")).toBe("ProfilePicture");
  });
});

describe("capitalize util", () => {
  it("should capitalize first letter", () => {
    expect(capitalize("profile_picture")).toBe("Profile_picture");
  });
});

describe("is-pure-object util", () => {
  it("should return false for array", () => {
    expect(isPureObject([])).toBe(false);
  });
  it("should return false for nulls", () => {
    expect(isPureObject(null)).toBe(false);
  });
  it("should return true for pure object", () => {
    expect(isPureObject({})).toBe(true);
  });
});
