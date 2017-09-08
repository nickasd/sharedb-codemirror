# ShareDB-CodeMirror
CodeMirror bindings for ShareDB. Adapted from [@ejones](https://github.com/ejones)'s [sharedb-codemirror](https://github.com/ejones/sharedb-codemirror).

## Usage

```javascript
var ShareDB = require('sharedb/lib/client');
var CodeMirror = require('codemirror');
var ShareDBCodeMirror = require('sharedb-codemirror');

// ...

var shareDBCodeMirror = new ShareDBCodeMirror(codeMirror, {key: 'content'));
shareDBCodeMirror.attachDoc(shareDBDoc, (error) => {
	if (error) {
		console.error(error);
	}
});
```

That's it. You now have two-way sync between ShareDB and CodeMirror. A full
example is available at [example](https://github.com/nickasd/sharedb-codemirror/tree/master/example).

## Install with NPM

```
npm install https://github.com/nickasd/sharedb-codemirror
```

## Try it out

```
npm install
npm start
// in a couple of browsers...
open http://localhost:8080
```

Try editing both documents: the changes will appear in real time in the other browser windows.
