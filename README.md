# nestql

A lightweight utility library for extracting and transforming prefixed keys from flat objects into organized nested structures with customizable casing.

## Features

- **Prefix-based extraction**: Isolate keys with a specific prefix followed by an underscore.
- **Flexible casing**: Convert keys to camelCase, snake_case, PascalCase, or keep original casing.
- **Key filtering**: Include (pick) or exclude (omit) specific keys; omit takes precedence if both are provided.
- **Error handling**: Graceful error handling with optional error throwing.
- **Type-safe**: Full TypeScript support with type definitions.

## Installation

```bash
npm install nestql
```

## Usage

### Basic Example

```javascript
import nestql from "nestql";

const flatUserObject = {
  user_username: "john_doe",
  user_email: "john@example.com",
  user_password: "secretpassword120",
  user_profile_picture: "profile.jpg",
  user_id: 1,
  user_created_at: "2026-05-05T10:30:00.000Z",
  user_updated_at: "2026-05-06T12:00:00.000Z",
  user_is_verified: true,
  user_role: "admin",
  user_last_login_at: "2026-05-07T08:15:45.000Z",
  app_name: "MyApp",
};

const user = nestql(flatUserObject, {
  prefix: "user",
  omit: ["password", "email", "role"], // Exclude sensitive fields
});

// user = {
//   username: 'john_doe',
//   profilePicture: 'profile.jpg',
//   id: 1,
//   createdAt: '2026-05-05T10:30:00.000Z',
//   updatedAt: '2026-05-06T12:00:00.000Z',
//   isVerified: true,
//   lastLoginAt: '2026-05-07T08:15:45.000Z'
// }
```

### Options

| Option         | Type                                     | Required | Description                                                                           |
| -------------- | ---------------------------------------- | -------- | ------------------------------------------------------------------------------------- |
| `prefix`       | string                                   | Yes      | The prefix to filter keys by prefixes (e.g. user, user_info)                          |
| `casing`       | "camel" \| "snake" \| "pascal" \| "keep" | No       | Case conversion for keys (default: "camel")                                           |
| `pick`         | string[]                                 | No       | Only include these keys (flat version & unprefixed). Cannot be used with `omit`       |
| `omit`         | string[]                                 | No       | Exclude these keys (flat version & unprefixed). Overrides `pick` if both are provided |
| `throwOnError` | boolean                                  | No       | Throw errors instead of logging (default: false)                                      |

### Casing Examples

```javascript
// camelCase (default)
nestql(
  { user_profile_picture: "pic.jpg" },
  { prefix: "user", casing: "camel" }
);
// { profilePicture: 'pic.jpg' }

// snake_case
nestql(
  { user_profile_picture: "pic.jpg" },
  { prefix: "user", casing: "snake" }
);
// { profile_picture: 'pic.jpg' }

// PascalCase
nestql(
  { user_profile_picture: "pic.jpg" },
  { prefix: "user", casing: "pascal" }
);
// { ProfilePicture: 'pic.jpg' }

// Keep original
nestql({ user_profile_picture: "pic.jpg" }, { prefix: "user", casing: "keep" });
// { profile_picture: 'pic.jpg' }
```

### Filtering Keys

```javascript
// Include only specific keys
nestql(obj, {
  prefix: "user",
  pick: ["username", "email"], // Only these keys
});

// Exclude specific keys
nestql(obj, {
  prefix: "user",
  omit: ["password"], // Exclude these keys
});
```

## Utilities

The library also exports helpful utility functions:

- **`capitalize(str: string)`** - Capitalize the first letter of a string.
- **`toSnakeCase(str: string)`** - Convert a string to snake_case.
- **`toCamelCase(str: string)`** - Convert a string to camelCase.
- **`toPascalCase(str: string)`** - Convert a string to PascalCase.
- **`toCasedKey(key: string, casing?: Case)`** - Convert a key to the specified case.
- **`isPureObject(value: unknown)`** - Check if a value is a pure object (not array, null, etc.).

## Error Handling

```javascript
// Log errors (default behavior)
nestql(invalidInput, { prefix: "user" });
// Console: "nestql: flat object must be a pure object"

// Throw errors
try {
  nestql(invalidInput, { prefix: "user", throwOnError: true });
} catch (error) {
  console.error(error.message);
}
```

## License

ISC
