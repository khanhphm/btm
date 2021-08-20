<template>
  <div></div>
</template>

<script>

import {contract} from '../web3/contract'
//import {web3} from '../web3/web3'
export default {
  async mounted() {
      
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];
    this.$store.state.address = account;
    this.address = this.$store.state.address;
    this.$store.state.vay =await contract.methods.getVay().call({from:this.$store.state.address})
    this.$store.state.amount =await contract.methods.getBalance().call({from:this.$store.state.address})
  },
};
</script>

<style lang="scss" scoped></style>
