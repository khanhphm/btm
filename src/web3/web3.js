var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider||"wss://ropsten.infura.io/ws/v3/ba2581bd74f6421999536ac9a7a6e53b");

export {web3}