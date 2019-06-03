# jsvcn

#### CodeNotary JavaScript Client 

> Global, de-centralized signing of code and other digital assets.

This package provides an easy to use javascript client for the [CodeNotary](https://www.codenotary.io)
platform. 

## Features: 

- verify digital assets via the Codenotary Blockchain
- query asset metadata from Codenotary  


## Install: 

``` 
npm install jsvcn

import Jsvcn from "jsvcn"

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
 const {status} = await jsvcn.verify(FILE);
 ...
}

```

It is also possible to verify the sha256 hash of an asset directly: 

``` javascript

const {status} = await jsvcn.verify("32c6a50aba0b30f63f124f4b2bb47dc027b9e48f838f71d1debe69d8680ecf70");

``` 

When you verify large files (>50 MB) we provide a progress callback as a second parameter which periodically returns with the percent value of the hashing progress: 

``` javascript
const {status} = await jsvcn.verify(FILE, (progress) => {
 ...
});

``` 