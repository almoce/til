---
tags: [nodejs, javascript]
---

# create folder in nodejs

`fs.exists` have been deprecated

```javascript
var fs = require('fs');
var dir = './tmp/folder';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}
```


