import Jsvcn from "./index"
const jsvcn = new Jsvcn();
jsvcn.verify("86df8371340859c115b43bd68d17336736cdc2ae8e687631adfa7d0b146e37d8").then((response) => {
	console.log(response)
})