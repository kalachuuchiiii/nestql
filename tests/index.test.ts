import { describe } from "node:test";
import nestql, { isPureObject } from "../src/index.ts";
import {
  capitalize,
  toSnakeCase,
  toCamelCase,
  toPascalCase,
  toCasedKey,
} from "../src/utils/case.utils.ts";

describe("toCasedKey", () => {
  it("should return same word when single word input", () => {
    expect(toCasedKey("username")).toBe("username");
  });

  it("should return empty string when input is empty", () => {
    expect(toCasedKey("")).toBe("");
  });

  it("should convert snake_case to camelCase", () => {
    expect(toCasedKey("user_profile_picture")).toBe("userProfilePicture");
  });
});

describe("capitalize", () => {
  it("should capitalize first letter", () => {
    expect(capitalize("")).toBe("");
  });

  it("should not change already capitalized word", () => {
    expect(capitalize("Profile")).toBe("Profile");
  });
});

describe("isPureObject", () => {
  it("should return false for function", () => {
    expect(isPureObject(() => {})).toBe(false);
  });

  it("should return false for number", () => {
    expect(isPureObject(1)).toBe(false);
  });

  it("should return false for string", () => {
    expect(isPureObject("test")).toBe(false);
  });
});

describe("nestql", () => {
  const record = {
    user_username: "parisliam",
    user_nickname: "paris",
    user_id: 2,
  };

  it("should return empty object when prefix does not match", () => {
    expect(
      nestql(record, {
        prefix: "account",
      })
    ).toStrictEqual({});
  });

  it("should return empty object when input is empty", () => {
    expect(
      nestql(
        {},
        {
          prefix: "user",
        }
      )
    ).toStrictEqual({});
  });

  it("should ignore keys without matching prefix", () => {
    const weird = {
      userusername: "wrong",
      user_username: "correct",
    };

    expect(
      nestql(weird, {
        prefix: "user",
      })
    ).toStrictEqual({
      username: "correct",
    });
  });

  it("should return correct mapped values when no pick or omit", () => {
    expect(
      nestql(record, {
        prefix: "user",
      })
    ).toStrictEqual({
      username: "parisliam",
      nickname: "paris",
      id: 2,
    });
  });

  it("should convert keys using camel casing", () => {
    expect(
      nestql(record, {
        prefix: "user",
        casing: "camel",
      })
    ).toStrictEqual({
      username: "parisliam",
      nickname: "paris",
      id: 2,
    });
  });

  it("should convert keys using pascal casing", () => {
    expect(
      nestql(record, {
        prefix: "user",
        casing: "pascal",
      })
    ).toStrictEqual({
      Username: "parisliam",
      Nickname: "paris",
      Id: 2,
    });
  });

  it("should convert keys using snake casing", () => {
    expect(
      nestql(record, {
        prefix: "user",
        casing: "snake",
      })
    ).toStrictEqual({
      username: "parisliam",
      nickname: "paris",
      id: 2,
    });
  });

  it("should return empty object when all keys are omitted", () => {
    expect(
      nestql(record, {
        prefix: "user",
        omit: ["username", "nickname", "id"],
      })
    ).toStrictEqual({});
  });
});

describe("toSnakeCase", () => {
  it("should convert camelCase to snake_case", () => {
    expect(toSnakeCase("userName")).toBe("user_name");
  });

  it("should convert PascalCase to snake_case", () => {
    expect(toSnakeCase("UserName")).toBe("user_name");
  });

  it("should keep snake_case unchanged", () => {
    expect(toSnakeCase("user_name")).toBe("user_name");
  });
});

describe("toCamelCase", () => {
  it("should convert snake_case to camelCase", () => {
    expect(toCamelCase("user_name")).toBe("userName");
  });

  it("should convert PascalCase to camelCase", () => {
    expect(toCamelCase("UserName")).toBe("userName");
  });

  it("should keep camelCase unchanged", () => {
    expect(toCamelCase("userName")).toBe("userName");
  });
});

describe("toPascalCase", () => {
  it("should convert snake_case to PascalCase", () => {
    expect(toPascalCase("user_name")).toBe("UserName");
  });

  it("should convert camelCase to PascalCase", () => {
    expect(toPascalCase("userName")).toBe("UserName");
  });

  it("should keep PascalCase unchanged", () => {
    expect(toPascalCase("UserName")).toBe("UserName");
  });
});
