---
tags: [nodejs, javascript]
---

# get file meta info with node

```javascript
const fs = require('fs')
const filePath = './file.txt'

fs.stat(filePath, (err, stat) => {
    console.log(stat)
})

```
 stat `<fs.Stats>`
```json
Stats {
  "dev": 2114,
  "ino": 48064969,
  "mode": 33188,
  "nlink": 1,
  "uid": 85,
  "gid": 100,
  "rdev": 0,
  "size": 527,
  "blksize": 4096,
  "blocks": 8,
  "atimeMs": 1318289051000.1,
  "mtimeMs": 1318289051000.1,
  "ctimeMs": 1318289051000.1,
  "birthtimeMs": 1318289051000.1,
  "atime": Mon, 10 Oct 2011 23:24:11 GMT,
  "mtime": Mon, 10 Oct 2011 23:24:11 GMT,
  "ctime": Mon, 10 Oct 2011 23:24:11 GMT,
  "birthtime": Mon, 10 Oct 2011 23:24:11 GMT 
}
```


- dev — The numeric identifier of the device storing the given file. It can be a number or a bigInt.
- ino — The “inode” number of the file. It’s a number that contains basic information about a file, directory, or other file system object. It can be a number or a bigInt.
- mode — Bit-field description of the file type and mode. It can be a number or a bigInt.
- nlink — Number of hard links that exist for the file. It can be a number or a bigInt.
- uid — The numeric user identifier of the user that owns the file. Applicable to POSIX systems only. It can be a number or a bigInt.
- gid — The numeric group identifier of the user that owns the file. Applicable to POSIX systems only. It can be a number or a bigInt.
- rdev — Numeric device identifier of the file if it’s a special file. A file is special if it’s used for I/O. For example, page files and hibernation files are considered special files. It can be a number or a bigInt.
- size — The size of the file in bytes. It can be a number or a bigInt.
- blksize — The block size for a file system I/O. It can be a number or a bigInt.
- blocks — The number of blocks allocated to the file. It can be a number or a bigInt.
- atimeNs — The timestamp indicating when the file was last accessed in nanoseconds since the POSIX Epoch, which is the time relative to January 1, 1970 midnight. It can be a number or a bigInt.
- mtimeNs — The timestamp indicating when the file was last modified in nanoseconds since the POSIX Epoch, which is the time relative to January 1, 1970 midnight. It can be a number or a bigInt.
- ctimeNs — The timestamp indicating when the file was last changed in nanoseconds since the POSIX Epoch, which is the time relative to January 1, 1970 midnight. It can be a number or a bigInt.
- birthtimeNs — The timestamp indicating when the file was created in nanoseconds since the POSIX Epoch, which is the time relative to January 1, 1970 midnight. It can be a number or a bigInt.
- atime — The timestamp indicating when the file was last accessed in milliseconds since the POSIX Epoch, which is the time relative to January 1, 1970 midnight. It can be a number or a bigInt.
- mtime — The timestamp indicating when the file was last modified in milliseconds since the POSIX Epoch, which is the time relative to January 1, 1970 midnight. It can be a number or a bigInt.
- ctime — The timestamp indicating when the file was last changed in milliseconds since the POSIX Epoch, which is the time relative to January 1, 1970 midnight. It can be a number or a bigInt.
- birthtime — The timestamp indicating when the file was created in milliseconds since the POSIX Epoch, which is the time relative to January 1, 1970 midnight. It can be a number or a bigInt.

