# jsvcn

#### CodeNotary JavaScript Client 

> Global, de-centralized signing of code and other digital assets.

This package provides an easy to use universal javascript client for the [Code Notary](https://www.codenotary.io)
platform. 

## Features: 

- verify digital assets or the hash of assets via the Codenotary Blockchain
- query asset metadata from Codenotary Platform 

Asset verification happens on 100% client-side (in the browser or in node.js on the client's server) in memory. 
The library uses chunk-based file hashing to keep memory usage low. 

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

``` 
const jsvcn = new Jsvcn();

const FILE = new File(...);

jsvcn.verify(FILE).then({valid, meta}){
	console.log(valid, meta);
})

```

Verify command always returns with a Promise. If you prefer you can use async-await syntax as well: 

``` 
const jsvcn = new Jsvcn();

async function myMethod(){
	const {valid, meta} = await jsvcn.verify(FILE);
	console.log(valid, meta);
}

```

It is also possible to verify the sha256 hash of an asset directly: 

``` 
const HASH = "32c6a50aba0b30f63f124f4b2bb47dc027b9e48f838f71d1debe69d8680ecf70";
const {valid, meta} = await jsvcn.verify(HASH);
console.log(valid, meta);

``` 

When you verify large files (>50 MB) we provide a progress callback as a second parameter: 

``` 
const {valid, meta} = await jsvcn.verify(FILE,(progress)=>{
	console.log(progess) // progress in percent
});

``` 


## License

// TODO