---
tags: [javascript]
---

# typed array [^1]

javascript standard array is a general-purpose data structure, that means that is not optimized for large quantities of data of the same type. to address this issues, the typed array has been introduced.

|  Typed Array   | Number of Bytes per Element  | Description (C Types) |
|  ----  | ----  | ----  |
| Int8Array  | 1 |8-bit signed integer (signed char) |
| Uint8Array  | 1 | 8-bit unsigned integer (unsigned char)  |
| Int16Array  | 2 | 16-bit signed integer (signed short)  |
| Uint16Array  | 2 | 16-bit unsigned integer (unsigned short)  |
| Int32Array  | 4 | 32-bit signed integer (signed int) |
| Uint32Array  | 4 | 32-bit unsigned integer (unsigned int)  |
| Float32Array  | 4 | 32-bit floating point number (float)  |
| Float64Array  | 8 | 64-bit floating point number (double) |

### signed vs unsigned (+, -)
signed char ： `[-2^7, 2^7) = [-128, 128]`
unsigned char：`[0, 2^8] = [0, 256]`
signed n int：`[-2^(n-1, 2^(n-1]`
unsigned n int：`[0, 2^n]`

### method
- get(index)
- set(index, value)
- set(array, offset)
- length
- BYTES_PER_ELEMENT

____

[^1]: [MDN - Typed_arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays)
