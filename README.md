# nestql

A lightweight utility library for extracting and transforming prefixed keys from flat objects into organized nested structures with customizable casing.

## Features

- **Prefix-based extraction** - Isolate keys with a specific prefix
- **Flexible casing** - Convert keys to camelCase, snake_case, or PascalCase
- **Key filtering** - pick or omit specific keys
- **Error handling** - Graceful error handling with optional error throwing
- **Type-safe** - Full TypeScript support with type definitions

## Installation

```bash
npm install nestql
```

## Usage

### Basic Example

```javascript
import nestql from "nestql";

const flatObject = {
  user_username: "john_doe",
  user_email: "john@example.com",
  user_profile_picture: "profile.jpg",
  app_name: "MyApp",
};

const result = nestql(flatObject, {
  prefix: "user",
  casing: "camel",
});

// Result:
// {
//   username: 'john_doe',
//   email: 'john@example.com',
//   profilePicture: 'profile.jpg'
// }
```

### Options

| Option         | Type                           | Required | Description                                      |
| -------------- | ------------------------------ | -------- | ------------------------------------------------ |
| `prefix`       | string                         | Yes      | The prefix to filter keys by                     |
| `casing`       | "camel" \| "snake" \| "pascal" | No       | Case conversion for keys (default: "camel")      |
| `whitelist`    | string[]                       | No       | Only include these keys (unprefixed)             |
| `blacklist`    | string[]                       | No       | Exclude these keys (unprefixed)                  |
| `throwOnError` | boolean                        | No       | Throw errors instead of logging (default: false) |

### Casing Examples

```javascript
// camelCase
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
```

### Filtering Keys

```javascript
// Whitelist
nestql(obj, {
  prefix: "user",
  whitelist: ["username", "email"], // Only these keys
});

// Blacklist
nestql(obj, {
  prefix: "user",
  blacklist: ["password"], // Exclude these keys
});
```

## Utilities

The library also exports helpful utility functions:

- **`capitalize(str)`** - Capitalize the first letter of a string
- **`getCasedKey(key, casing)`** - Convert a key to the specified case
- **`isPureObject(value)`** - Check if a value is a pure object (not array, null, etc.)

## Error Handling

```javascript
// Log errors (default behavior)
nestql(invalidInput, { prefix: "user" });
// Console: "nestql: Flat object must be a pure object"

// Throw errors
try {
  nestql(invalidInput, { prefix: "user", throwOnError: true });
} catch (error) {
  console.error(error.message);
}
```

## License

ISC
