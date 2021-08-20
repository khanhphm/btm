<template>
  <v-card class="" elevation="3" width="632">
    <v-tabs fixed-tabs height="70" color="gray">
      <v-tab>
        Vay Tiền
      </v-tab>
    </v-tabs>
    <v-container fill-height fluid>
      <v-row rows="6" class="mt-10" justify="center">
        <h3 class="text-h2 font-weight-black">{{ $store.state.vay }}</h3>
      </v-row>
      <v-row rows="6" class="mt-10 d-flex align-center px-15">
        <v-text-field
          v-model="amo"
          label="Tiền Vay"
          class="pr-3"
        ></v-text-field>

        <v-btn dark @click="vay(amo)">Vay</v-btn>
      </v-row>
      <v-snackbar light v-model="snack" :timeout="3000">
        {{ notis }}

        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="this.snack = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </v-card>
</template>

<script>
import { contract } from "../web3/contract";
//import {web3} from '../web3/web3'
export default {
  data: () => {
    return {
      amo: "",
      snack: false,
      notis: "",
      time: "",
    };
  },
  methods: {
    async vay(amount) {
      contract.methods
        .makeVay(parseInt(amount))
        .send({ from: this.$store.state.address });
    },
  },
  computed: {
    count() {
      return this.$store.state.vay;
    },
  },
  watch: {
    count(newCount, oldCount) {
      if(newCount>oldCount){
          this.$data.notis = "Vay Thành Công"
          this.$data.snack = true;
      }
      if(newCount<oldCount){
          this.$data.notis = "Trả Thành Công"
          this.$data.snack = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
