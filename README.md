# jsvcn

#### CodeNotary JavaScript Client 

> Global, de-centralized signing of code and other digital assets.

This package provides an easy to use universal javascript client for the [CodeNotary](https://www.codenotary.io)
platform. 

## Features: 

- verify digital assets via the Codenotary Blockchain
- query asset metadata from Codenotary Platform 

Asset verification happens on 100% client-side in memory (in the browser or when you use it in node.js on the client server).
The library uses superfast chunk-based file hashing to keep memory usage low. 
Please note: The asset you verify never leaves your environment, this library sends only the hash of it to CodeNotary. 

## Install: 

Use npm or yarn to add it to your ES6 project: 

``` 
npm install jsvcn

or

yarn add jsvcn

import Jsvcn from "jsvcn"
```

OR use the bundled version: 

```
<script src="/jsvcn/dist/jsvcn.min.js"></script>
```


## Example

```javascript
const FILE = new File(...);

const jsvcn = new Jsvcn();
jsvcn.verify(FILE).then({valid, meta}){
 ...
})

```

Verify command always returns with a Promise. If you prefer you can use async-await syntax as well: 

``` javascript

async function myMethod(){
 const {valid, meta} = await jsvcn.verify(FILE);
 ...
}

```

It is also possible to verify the sha256 hash of an asset directly: 

``` javascript
const HASH = "32c6a50aba0b30f63f124f4b2bb47dc027b9e48f838f71d1debe69d8680ecf70";
const {valid, meta} = await jsvcn.verify(HASH);

``` 

When you verify large files (>50 MB) we provide a progress callback as a second parameter which periodically returns with the percent of the hashing progress: 

``` javascript
const {valid, meta} = await jsvcn.verify(FILE, progress => {
 ...
});

``` 


## License

// TODO