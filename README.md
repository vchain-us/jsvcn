# jsvcn

#### CodeNotary JavaScript Client 

> Global, de-centralized signing of code and other digital assets.

This package provides an easy to use javascript client for the [CodeNotary](https://www.codenotary.io)
platform. 

## Features: 

- authenticate digital assets via Codenotary API or Codenotary Blockchain
- notarize, untrust and unsupport digital assets via Codenotary API 

## Demo

- [Demo App in Vue](https://vchain-us.github.io/jsvcn/) ([source](https://github.com/vchain-us/jsvcn/tree/master/example))

## Apps which are using this library:

- [CodeNotary Verify App](https://authenticate.codenotary.io/)
- [CodeNotary Chrome Extension](https://chrome.google.com/webstore/detail/vchain-codenotary-downloa/mnloemedehacppeggbipipjlphdjpjcb)

## Install: 

``` 
npm install jsvcn

```

## Init

ES6: 

```javascript

import Jsvcn from "jsvcn"

```

ES5 (bundled): 

```
<script src="https://unpkg.com/jsvcn@2.0.1/dist/jsvcn.min.js" type="text/javascript"></script>

```


```javascript

const jsvcn = new Jsvcn(config);

```


### Authenticate (verify)

```javascript
jsvcn.verify(FILE).then(({ status }) => {
 ...
})
```

### Notarize (sign)

```javascript
jsvcn.verify(FILE).then(({ status }) => {
 ...
})
```



## Notes:


### Authentication directly via the CodeNotary Blockchain with Ethers.js

If you want to directly authenticate assets with CodeNotary Blockchain add this to your html page:

```
<script src="https://cdn.ethers.io/scripts/ethers-v4.min.js" type="text/javascript"></script>

```
and set ``` mode: 'blockchain',``` in your config. 

### Async - await

Verify and sign methods are always returns with a Promise. 
If you prefer async-await syntax you can use that as well: 

``` javascript

async function myAuthenticate(){
 const {status} = await jsvcn.verify(FILE);
 ...
}

```

### Authenticate / notarize sha256 hashes 

Verify and sign are able to authenticate / notarize directly the SHA256 hash of an asset: 

``` javascript

jsvcn.verify("32c6a50aba0b30f63f124f4b2bb47dc027b9e48f838f71d1debe69d8680ecf70");

``` 

### Progress callback (for large files)

Verify and sign commands are providing a progress callback as second parameter which periodically returns with the percent value of the file hashing progress. This is really handy when you verify large files and want to display the progress.

``` javascript
jsvcn.verify(FILE, (progress) => console.log(progress + '%'));

``` 

### Calculate Checksums

CodeNotary.io uses SHA256 algorithm to calculate and compare file hashes, but this package can also provide SHA1, SHA512, MD5 checksums of the verified file. You can add "checksums" attribute to the config object with an array of checksums you want to get back from the verify method.

``` javascript
const jsvcn = new Jsvcn({checksums: ["sha1", "md5"]});

``` 

## License

This software is released under GPL3.