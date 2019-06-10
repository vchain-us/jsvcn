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

```


## Example

```javascript

import Jsvcn from "jsvcn"

const FILE = new File(...);

const jsvcn = new Jsvcn();
jsvcn.verify(FILE).then(({ status }) => {
 ...
})

```

The verify method always returns with a Promise. 
If you prefer you can use async-await syntax as well: 

``` javascript

async function myMethod(){
 const {status} = await jsvcn.verify(FILE);
 ...
}

```

It is also possible to verify directly the SHA256 hash of an asset: 

``` javascript

jsvcn.verify("32c6a50aba0b30f63f124f4b2bb47dc027b9e48f838f71d1debe69d8680ecf70");

``` 

The verify command provides a progress callback as second parameter which periodically returns with the percent value of the hashing progress. This is really handy when you verify large files and want to display the progress..

``` javascript
jsvcn.verify(FILE, (progress) => console.log(progress + '%'));

``` 